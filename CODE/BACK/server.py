import uvicorn
from fastapi import Depends, FastAPI
from AWS_manager import AWS_Manager
app = FastAPI()


@app.get("/instances/")
async def read_users_me(states,types):
    a=4
    aws_manager= AWS_Manager("AKIAYPGB5TBPQQR2U2NG","ZRce7lY1QPfRqmQ33IXsXiKCuMeHNMaFmBhaCj+i")
    instances_filtered_by_states = aws_manager.filter_instances_by_states(states.split("_"))
    instances_filtered_by_types = aws_manager.filter_instances_by_states(types.split("_"))
    result = list(set(instances_filtered_by_states).intersection(set(instances_filtered_by_types)))
    a=5
    

@app.get("/")
async def root():
    return "Server is running"
    
if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1",
                port=8008, log_level="info", reload=True)
