from fastapi import FastAPI

from view.actors import router as actors_router
from view.movies import router as movies_router
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allowed HTTP methods
    allow_headers=["*"],
)

app.include_router(actors_router, prefix="/actors", tags=["actors"])
app.include_router(movies_router, prefix="/movies", tags=["movies"])

@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")
