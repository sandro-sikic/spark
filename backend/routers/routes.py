
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.models import *
from settings.config import *
from settings.image_settings import *
import json
import requests, base64, httpx
import uuid

router = APIRouter()

image_dir = "./images/"

story_builder = [
    {
        "order": 0,
        "return_type": "choice",
        "prequery": "name 6 story genres that would make a great story.",
        "postquery": "you should return your response in strict json format with keys: text, type, scene_description, description",
    },
    {
        "order": 1,
        "return_type": "text",
        "prequery": "",
        "postquery": "you should return your response in strict json format with keys: text, scene_description",
    },
    {
        "order": 2,
        "return_type": "choice",
        "prequery": "name 6 story genres that would make a great story.",
        "postquery": "you should return your response in strict json format with keys: text, type, scene_description, description",
    },
    {
        "order": 3,
        "return_type": "text",
        "prequery": "",
        "postquery": "you should return your response in strict json format with keys: text, scene_description",
    },
    {
        "order": 4,
        "return_type": "choice",
        "prequery": "name 6 story genres that would make a great story.",
        "postquery": "you should return your response in strict json format with keys: text, type, scene_description, description",
    },
    {
        "order": 5,
        "return_type": "text",
        "prequery": "",
        "postquery": "you should return your response in strict json format with keys: text, scene_description",
    }
]


def chatGpt(text):
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "assistant", "content": text }],
        "temperature": 0.5,
        "top_p": 0.1,
    }

    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers=openapi_base_headers, 
            data=json.dumps(data)
        ).json()

        return json.loads(response['choices'][0]['message']['content'])
    except Exception as e:
        raise Exception(f'Something went wrong with the chatGPT API: {response}')


async def create_storyline(choice_text, book):
    book['storyline'].sort(key=lambda x: x['order'], reverse=True)

    if len(book['storyline']) == 0:
        order = 0
        storyline= {
            "order": 0,
            "text": "",
            "type": "choice",
            "choices": []
        }

    else:
        storyline = book['storyline'][0]
        order = storyline['order'] + 1 

    selected_choice = None
    if storyline['type'] == 'choice':
        for choice in storyline['choices']:
            if choice['text'] == choice_text:
                selected_choice = choice
                choice['is_chosen'] = True
        book.save()

    story = [story for story in story_builder if story['order'] == order][0]
    
    if selected_choice:
        response = chatGpt(f"{story['prequery']}{choice['description']}{story['postquery']}")     
    else:
        response = chatGpt(f"{story['prequery']}{storyline['text']}{story['postquery']}")
    
    if story['return_type'] == 'text':
        prompt = {
            "order": order,
            "prompt": "",
            "type": "text",
            "image_url": await create_hero_image(response.get('scene_description', '')),
            "choices": [],
            "text": response.get('text', ''),
            "scene_description": response.get('scene_description', '')
        }

    elif story['return_type'] == 'choice':
        prompt = {
            "order": order,
            "prompt": "",
            "type": "choice",
            "image_url": "",
            "choices": response,
            "text": ""
        }
        prompt = await inject_images(prompt)

    book['storyline'].append(Prompt(**prompt))
    

    book.save()

    return {
        "type": prompt['type'],
        "image_url": prompt['image_url'],
        "choices": prompt['choices'],
        "text": prompt['text'],
    }


async def generate_image(prompt):
    payload = image_properties(prompt)

    async with httpx.AsyncClient(timeout=40.0) as client:
        response = await client.post(
            url=StabilityIMGendpoint, 
            headers=base_headers, 
            json=payload
        )

    data = response.json()

    image_base64 = data["artifacts"][0]["base64"]

    image_name = uuid.uuid4()

    image_path = os.path.join(image_dir, f"{image_name}.png")

    with open(image_path, "wb") as f:
        f.write(base64.b64decode(image_base64))

    return image_name


async def inject_images(prompt):
    enhancer = 'detailed, high detail, modern,stylized,futuristic'

    image_list = []
    for item in prompt['choices']:
        image_name = await generate_image(item['text'] + item['description'] + enhancer)

        item['image_url'] = f"{api_url}/images/{image_name}.png"

        
    return prompt
    
async def create_hero_image(description):
    enhancer = 'detailed, high detail, modern,stylized,futuristic'
    image_name = await generate_image(description + enhancer)
    return f"{api_url}/images/{image_name}.png"

@router.get("/books/{book_id}/story")
async def story(book_id: str, choice: str | None = None):
    book = Book.objects(id=book_id).first()

    if book.is_finished:
        return None

    return await create_storyline(choice_text=choice, book=book)

@router.get("/books")
def get_books():
    books = Book.objects().filter()

    return json.loads(books.to_json())

@router.get("/books/new")
def create_book():
    empty_book = Book.objects().filter(
        is_finished=False, 
        storyline__size=0 
    ).first()
                                
    if empty_book:
        return {
            "book":empty_book.id
        }

    book = Book(
        name="",
        is_finished=False,
        storyline=[]
    )

    book.save()

    return {
        "book":book.id
    }


@router.get("/books/{book_id}")
def get_book(book_id: str):
    book = Book.objects(id=book_id).first()
    
    return json.loads(book.to_json())