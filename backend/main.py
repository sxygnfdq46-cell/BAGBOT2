from fastapi import FastAPI
from api.routes import router

app = FastAPI(title="Trading Bot Backend", version="1.0.0")

# Include API routes
app.include_router(router)

@app.get("/")
async def root():
    return {"status": "backend ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)