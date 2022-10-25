from requests import Response
import uvicorn
from fastapi import Depends, FastAPI
from AWS_manager import AWS_Manager
app = FastAPI()


@app.get("/instances/")
async def get_instances(states,types,response: Response):
    aws_manager= AWS_Manager("AKIAYPGB5TBPQQR2U2NG","ZRce7lY1QPfRqmQ33IXsXiKCuMeHNMaFmBhaCj+i")
    if states is None:
        results = aws_manager.filter_instances_by_types(types=types.split("_"))
    else:
        instances_filtered_by_states = aws_manager.filter_instances_by_states(states = states.split("_"))
        if types is not None:    
            results = list(filter(lambda instance: instance["Type"] in types.split("_"), instances_filtered_by_states))
    return results

    

@app.get("/")
async def root():
    return "Server is running"
    
if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1",
                port=8010, log_level="info", reload=True)
