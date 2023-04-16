
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


connect(host=mongodb_url)

# 5 USERS
# for i in range(5):
#     email = ''.join(random.choices(string.ascii_lowercase, k=10)) + "@example.com"
#     user = User(id=str(i+1), email=email, books=[])
#     user.save()

# def create_choice(choice_data):
#     return Choice(**choice_data)

# def create_prompt(prompt_data):
#     choices = [create_choice(choice_data) for choice_data in prompt_data.get('choices', [])]
#     prompt_data['choices'] = choices
#     return Prompt(**prompt_data)

# def create_book(book_data):
#     storyline = [create_prompt(prompt_data) for prompt_data in book_data.get('storyline', [])]
#     book_data['storyline'] = storyline
#     return Book(**book_data)






# user_data = {
#     "id": "1",
#     "email": "example@example.com",
#     "books": [
#         {
#             "id": "book1",
#             "name": "Adventures of Cat Rengar",
#             "is_finished": False,
#             "storyline": [
#                 {
#                     "order": 1,
#                     "prompt": "First prompt",
#                     "type": "text",
#                     "image_url": "https://example.com/image1.jpg",
#                     "text": "This is the text content of the first prompt"
#                 },
#                 {
#                     "order": 2,
#                     "prompt": "Second prompt",
#                     "type": "choices",
#                     "image_url": "https://example.com/image2.jpg",
#                     "choices": [
#                         {
#                             "text": "Choice 1",
#                             "type": "genre",
#                             "image_description": "Image description for choice 1",
#                             "image_url": "https://example.com/choice1.jpg",
#                             "description": "Description of choice 1",
#                             "is_chosen": False
#                         },
#                         {
#                             "text": "Choice 2",
#                             "type": "genre",
#                             "image_description": "Image description for choice 2",
#                             "image_url": "https://example.com/choice2.jpg",
#                             "description": "Description of choice 2",
#                             "is_chosen": True
#                         }
#                     ]
#                 }
#             ]
#         },
#         {
#             "id": "book2",
#             "name": "Adventures of Dog Rengar",
#             "is_finished": True,
#             "storyline": [
#                 {
#                     "order": 1,
#                     "prompt": "First prompt",
#                     "type": "text",
#                     "image_url": "https://example.com/image1.jpg",
#                     "text": "This is the text content of the first prompt"
#                 },
#                 {
#                     "order": 2,
#                     "prompt": "Second prompt",
#                     "type": "choices",
#                     "image_url": "https://example.com/image2.jpg",
#                     "choices": [
#                         {
#                             "text": "Choice 1",
#                             "type": "genre",
#                             "image_description": "Image description for choice 1",
#                             "image_url": "https://example.com/choice1.jpg",
#                             "description": "Description of choice 1",
#                             "is_chosen": False
#                         },
#                         {
#                             "text": "Choice 2",
#                             "type": "genre",
#                             "image_description": "Image description for choice 2",
#                             "image_url": "https://example.com/choice2.jpg",
#                             "description": "Description of choice 2",
#                             "is_chosen": True
#                         }
#                     ]
#                 }
#             ]
#         }
#     ]
# }

# books = [create_book(book_data) for book_data in user_data.pop('books')]
# user_data['books'] = books
# user = User(**user_data)
# user.save()



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


# [
#   {
#     "text": "Romance",
#     "type": "genre",
#     "image_description": "Couple holding hands",
#     "image_url": "https://example.com/romance.jpg",
#     "description": "Stories about love and relationships"
#   },
#   {
#     "text": "Mystery",
#     "type": "genre",
#     "image_description": "Magnifying glass on a table",
#     "image_url": "https://example.com/mystery.jpg",
#     "description": "Stories about solving crimes and puzzles"
#   },
#   {
#     "text": "Science Fiction",
#     "type": "genre",
#     "image_description": "Spaceship flying through space",
#     "image_url": "https://example.com/scifi.jpg",
#     "description": "Stories about futuristic technology and space travel"
#   },
#   {
#     "text": "Horror",
#     "type": "genre",
#     "image_description": "Haunted house at night",
#     "image_url": "https://example.com/horror.jpg",
#     "description": "Stories about fear and the supernatural"
#   },
#   {
#     "text": "Adventure",
#     "type": "genre",
#     "image_description": "Person hiking in the mountains",
#     "image_url": "https://example.com/adventure.jpg",
#     "description": "Stories about exploring new places and taking risks"
#   },
#   {
#     "text": "Historical Fiction",
#     "type": "genre",
#     "image_description": "Old book on a wooden table",
#     "image_url": "https://example.com/historical.jpg",
#     "description": "Stories set in the past with fictional characters and events"
#   }
# ]