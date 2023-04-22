
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import routes
from settings.config import *
import os, random ,string
from mongoengine import connect
from mongoengine import connect
from mongoengine.connection import get_db
from mongoengine import connect, Document, StringField
from models.models import *
from fastapi.staticfiles import StaticFiles

connect(host=mongodb_url)
image_dir = "./images/"

app = FastAPI()
app.mount("/images", StaticFiles(directory="./images"), name="images")

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
