FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI with Uvicorn
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]