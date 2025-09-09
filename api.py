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
        # Initialize the project root directory
        from agent.tools import init_project_root
        project_root = init_project_root()
        print(f"Project root initialized at: {project_root}")
        
        result = agent.invoke(
            {"user_prompt": request.user_prompt},
            {"recursion_limit": request.recursion_limit}
        )
        
        # Extract the generated code from the result
        generated_code = ""
        if result and "coder_state" in result:
            coder_state = result["coder_state"]
            if hasattr(coder_state, "task_plan") and coder_state.task_plan:
                # Find the HTML file in the implementation steps
                for step in coder_state.task_plan.implementation_steps:
                    if step.filepath.endswith(".html"):
                        try:
                            # Use the safe_path_for_project function to get the correct path
                            from agent.tools import safe_path_for_project
                            file_path = safe_path_for_project(step.filepath)
                            print(f"Attempting to read file: {file_path}")
                            if file_path.exists():
                                with open(file_path, "r") as f:
                                    generated_code = f.read()
                                    print(f"Successfully read file: {file_path}")
                                    break
                            else:
                                print(f"File does not exist: {file_path}")
                        except Exception as file_error:
                            print(f"Error reading file {step.filepath}: {str(file_error)}")
        
        # If no HTML file was found, use a default response
        if not generated_code:
            generated_code = f"<html><body><h1>Generated Project</h1><p>Your project based on '{request.user_prompt}' is being processed. Please check the backend logs for details.</p></body></html>"
            print("Using default HTML response as no generated file was found.")
        
        return {"status": "success", "result": result, "generated_code": generated_code}
    except Exception as e:
        return {"status": "error", "message": str(e)}


if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)