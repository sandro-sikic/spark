
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import routes
from settings.config import *
import os
load_dotenv()


api_key = os.environ.get("STABILITY_KEY")

app = FastAPI()

routers = [routes.router]
for router in routers:
    app.include_router(router)


app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)


