from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from typing import Optional

from agent.graph import agent

app = FastAPI()

# Add CORS middleware to allow frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    user_prompt: str
    recursion_limit: Optional[int] = 100


@app.get("/")
async def read_root():
    return {"message": "DevPal API is running"}


@app.post("/generate")
async def generate_code(request: PromptRequest = Body(...)):
    try:
        result = agent.invoke(
            {"user_prompt": request.user_prompt},
            {"recursion_limit": request.recursion_limit}
        )
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}


if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)