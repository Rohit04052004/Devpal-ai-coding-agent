# 🤖 DevPal

**DevPal** is an AI-powered coding assistant built with [LangGraph](https://github.com/langchain-ai/langgraph).  
It works like a multi-agent development team that can take a natural language request and transform it into a complete, working project — file by file — using real developer workflows.

---

## 🏗️ Architecture

- **Planner Agent** – Analyzes your request and generates a detailed project plan.
- **Architect Agent** – Breaks down the plan into specific engineering tasks with explicit context for each file.
- **Coder Agent** – Implements each task, writes directly into files, and uses available tools like a real developer.

<div style="text-align: center;">
    <img src="resources/dev_pal_diagram.png" alt="DevPal Architecture" width="90%"/>
</div>

---

## 🚀 Getting Started
### Prerequisites
- Make sure you have uv installed, follow the instructions [here](https://docs.astral.sh/uv/getting-started/installation/) to install it.
- Ensure that you have created a groq account and have your API key ready. Create an API key [here](https://console.groq.com/keys).

### ⚙️ **Instsllstion and Startup**
- Create a virtual environment using: `uv venv` and activate it using `source .venv/bin/activate`
- Install the dependencies using: `uv pip install -r pyproject.toml`
- Create a `.env` file and add the variables and their respective values mentioned in the `.sample_env` file

Now that we are done with all the set-up & installation steps we can start the application using the following command:
  ```bash
    python main.py
  ```

### 🧪 Example Prompts
- Create a to-do list application using html, css, and javascript.
- Create a simple calculator web application.
- Create a simple blog API in FastAPI with a SQLite database.

## Projects

This repository contains two mini-projects:

### 1. Calculator App

A simple, stylish calculator built with HTML, CSS, and JavaScript.

**Features:**
- Basic arithmetic operations (add, subtract, multiply, divide).
- Clear and backspace functionality.
- Responsive design.
- Dark mode theme.

**To Run:**

Open `calculator/index.html` in your browser.

### 2. Todo App

A lightweight todo list application to manage your tasks.

**Features:**
- Add, edit, and delete tasks.
- Mark tasks as complete.
- In-place editing of tasks.
- Data saved to local storage.

**To Run:**

Open `todo-app/index.html` in your browser.


---
---

## Author

Rohit Chigatapu