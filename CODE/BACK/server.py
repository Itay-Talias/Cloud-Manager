from AUDIT.Audit_Manager import Audit_Manager
from AUDIT import audit_activities_descriptions
import mock_data
from unittest import result
from requests import Response
from fastapi import FastAPI, status,  HTTPException, Request, Response
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi import Depends, FastAPI
from AWS_manager import AWS_Manager
from typing import List, Dict, Union
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm
from AUTH.authentication import get_current_user, get_user_from_db
from AUTH.user_class import User
from passlib.context import CryptContext
from config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
from datetime import datetime

audit_manager = Audit_Manager("cyberark")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
app = FastAPI()
app.mount("/FRONT", StaticFiles(directory="FRONT"), name="FRONT")

acceptable_states = ["running", "stopped", "terminated"]
acceptable_types = ["t2.micro", "t1.micro"],


def check_params(params_received: List[str], acceptable_params: List[str]):
    if len(params_received) == 0:
        return True
    for param_received in params_received.split("_"):
        if param_received not in acceptable_params:
            return False
    return True


@app.post("/Login")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = get_user_from_db(form_data.username)
    if not user_dict:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password or company")
    user = User(**user_dict)
    if (not pwd_context.verify(form_data.password, user.password)) or form_data.client_secret != user.company:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password or company")
    token = user.username + " " + user.company
    response.set_cookie(key="Authorization", value="Bearer %s " %
                        token, httponly=True)
    cur_time = datetime.now()
    description = audit_activities_descriptions.USER_LOGIN.format(user.username)
    audit_manager.write_activity(cur_time, description)
    return {"access_token": token, "token_type": "bearer"}


@app.get("/instances/")
async def get_instances(states: str = "", types: str = "", response: Response = None, current_user: User = Depends(get_current_user)) -> List:
    aws_manager = AWS_Manager(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
    cur_time = datetime.now()
    username = current_user.split(" ")[0]
    description = ""
    if states == "" and types == "":
        results = aws_manager.get_all_instances()
    elif check_params(params_received=states, acceptable_params=acceptable_states) == False or check_params(params_received=types, acceptable_params=acceptable_types) == False:
        response.status_code = status.HTTP_400_BAD_REQUEST
        description = audit_activities_descriptions.INSTANCES_FILTER_FAILED.format(username, states, types)
        return {"Error": "states or types are invalid"}
    elif states == "":
        results = aws_manager.filter_instances_by_types(types=types.split("_"))
    else:
        results = aws_manager.filter_instances_by_states(
            states=states.split("_"))
        if types != "":
            results = list(
                filter(lambda instance: instance["Type"] in types.split("_"), results))
    description = audit_activities_descriptions.INSTANCES_FILTER_SUCCESS.format(username, states, types)
    audit_manager.write_activity(cur_time, description)
    return results


@app.patch("/instances/{instance_id}")
async def operate(instance_id, request: Request, response: Response, current_user: User = Depends(get_current_user)):
    req = await request.json()
    new_state = req["state"]
    aws_manager = AWS_Manager(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
    operations_dict = {"terminated": aws_manager.terminate_instance, "stopped": aws_manager.stop_instance,
                       "running": aws_manager.start_instance, "reboot": aws_manager.reboot_instance}
    operations_dict[new_state](instance_id)
    cur_time = datetime.now()
    username = current_user.split(" ")[0]
    description = audit_activities_descriptions.INSTANCE_METHOD.format(username, instance_id, new_state)
    audit_manager.write_activity(cur_time, description)



@app.get("/")
async def root():
    return FileResponse("./FRONT/login.html")


if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1",
                port=8034, log_level="info", reload=True)
