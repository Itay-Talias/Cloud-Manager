import uvicorn
from fastapi import Depends, FastAPI
app = FastAPI()


@app.get("/instances")
async def read_users_me(states, types):
    pass

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1",
                port=8000, log_level="info", reload=True)
