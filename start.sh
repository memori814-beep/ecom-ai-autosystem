#!/bin/bash
# 🚀 Auto-Starter Script for Ecom-AI (Mac)

PROJECT_DIR="/Users/pratikmalvi/Desktop/ecom-ai"
FRONTEND_DIR="$PROJECT_DIR/frontend"
VENV_DIR="$PROJECT_DIR/.venv"
BACKEND_PORT=8000
FRONTEND_PORT=5173

echo "🧠 Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# Step 1: Kill old backend if running
echo "🧹 Checking if port $BACKEND_PORT is already in use..."
PID=$(lsof -ti :$BACKEND_PORT)
if [ ! -z "$PID" ]; then
  echo "⚠️ Port $BACKEND_PORT already in use. Killing process $PID..."
  kill -9 $PID
else
  echo "✅ Port $BACKEND_PORT is free."
fi

# Step 2: Start backend (FastAPI)
echo "🚀 Starting backend on port $BACKEND_PORT..."
cd "$PROJECT_DIR"
uvicorn app:app --reload --port $BACKEND_PORT &
BACKEND_PID=$!

sleep 2

# Step 3: Start frontend (Vite)
echo "🎨 Starting frontend (Vite React)..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

sleep 2

# Step 4: Display info
echo ""
echo "✅ All systems ready!"
echo "--------------------------------------"
echo "🔹 Backend running → http://127.0.0.1:$BACKEND_PORT/docs"
echo "🔹 Frontend running → http://localhost:$FRONTEND_PORT/"
echo "--------------------------------------"
echo "Press CTRL+C to stop everything."

# Step 5: Wait so both keep running
wait $BACKEND_PID $FRONTEND_PID
