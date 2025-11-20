from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router
from backend.auth import router as auth_router

app = FastAPI(title="Bagbot Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.include_router(auth_router, prefix="/api")

@app.get("/", tags=["health"])
async def root():
    return {"status": "ok", "service": "bagbot backend"}