# 🤖 DevPal

**DevPal** is an AI-powered coding assistant that transforms natural language requests into fully functional applications. It simulates a multi-agent development team to understand your requirements, create a plan, and build the project step by step.

---

## 🌟 Key Features

- **Natural Language Understanding**: Simply describe your idea in plain English.
- **Multi-Agent Architecture**: A team of specialized AI agents collaborates to build your project:
  - **Planner Agent**: Creates a high-level plan.
  - **Architect Agent**: Designs the detailed engineering tasks.
  - **Coder Agent**: Writes the code, file by file.
- **Real Developer Workflow**: Uses standard tools and practices to generate clean, maintainable code.
- **Interactive and Iterative**: Work with the AI to refine and build upon your ideas.

<div style="text-align: center;">
    <img src="resources/dev_pal_diagram.png" alt="DevPal Architecture" width="90%"/>
</div>

---

## 🚀 Getting Started

### Prerequisites

- **UV**: Ensure you have `uv` installed. Follow the official [installation guide](https://docs.astral.sh/uv/getting-started/installation/).
- **Gemini API Key**: You'll need a Google AI Studio account and an API key. Create one [here](https://aistudio.google.com/app/apikey).

### ⚙️ Installation and Startup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rohit04052004/Devpal-ai-coding-agent.git
   cd Devpal-ai-coding-agent
   ```

2. **Create and activate a virtual environment**:
   ```bash
   uv venv
   source .venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   uv pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   - Create a `.env` file from the `.sample_env` template.
   - Add your `GEMINI_API_KEY` to the `.env` file.

5. **Run the application**:
   ```bash
   python main.py
   ```

### 🧪 Example Prompts

- "Build a to-do list application using HTML, CSS, and JavaScript."
- "Create a simple calculator web app."
- "Develop a blog API in FastAPI with a SQLite database."

---

## 📁 Project Structure

- **/agent**: Contains the core multi-agent logic.
- **/api**: The FastAPI backend that serves the application.
- **/frontend**: The user interface for interacting with DevPal.
- **/generated_project**: The output directory for the projects you create.

---

## 🤔 How It Works

DevPal uses a sophisticated multi-agent system powered by LangGraph to manage the development process. Here’s a breakdown of the workflow:

1.  **Input**: You provide a high-level description of the application you want to build.
2.  **Planning**: The **Planner Agent** receives your request and creates a structured plan, outlining the necessary steps and technologies.
3.  **Architecture**: The **Architect Agent** takes the plan and designs the software architecture, defining the file structure, components, and their interactions.
4.  **Coding**: The **Coder Agent** receives the architectural plan and writes the code for each file, one by one. It can also read existing files to ensure consistency.
5.  **Output**: The completed project is saved in the `generated_project` directory, ready for you to review and run.

This entire process is automated, allowing you to go from idea to a functional prototype in minutes.

---


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

---

## 📝 License

This project is licensed under the MIT License.

---

## ✍️ Author

Rohit Chigatapu