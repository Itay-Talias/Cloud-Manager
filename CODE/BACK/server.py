from requests import Response
from fastapi import FastAPI , status ,  HTTPException , Request , Response
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi import Depends, FastAPI
from AWS_manager import AWS_Manager
from typing import List, Dict,Union
from fastapi.responses import FileResponse

app = FastAPI()
app.mount("/FRONT", StaticFiles(directory="FRONT"), name="FRONT")

accetable_states=["running","stopped","terminated"]
accetable_types=["t2.micro"]

def check_params(params_received: List[str],accetable_params: List[str]):
    if len(params_received)==0:
        return True
    for param_received in params_received.split():
        if param_received not in accetable_params: 
            return False
    return True

@app.get("/instances/")
async def get_instances(states: str="",types: str="",response: Response=None) -> List: 
    AWS_ACCESS_KEY_ID=""
    AWS_SECRET_ACCESS_KEY=""
    aws_manager= AWS_Manager(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY)
    if states == "" and types == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"Error": "no params received"}
    elif check_params(params_received=states,accetable_params=accetable_states)==False or check_params(params_received=types,accetable_params=accetable_types)==False:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"Error": "states or types are invalid"}
    elif states == "":
        results = aws_manager.filter_instances_by_types(types=types.split("_"))
    else:
        results = aws_manager.filter_instances_by_states(states = states.split("_"))
        if types != "":    
            results = list(filter(lambda instance: instance["Type"] in types.split("_"), results))
    return results

@app.get("/")
async def root():
    return FileResponse("./FRONT/index.html")
    
if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1",
                port=8012, log_level="info", reload=True)
