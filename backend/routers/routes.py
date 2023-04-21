
from fastapi import APIRouter
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
        "prequery": "generate a list of 6 story categories in strict json format no text with keys: text, type, image_description, image_url, description",
        "postquery": ""
    },
    {
        "order": 1,
        "return_type": "text",
        "prequery": "",
        "postquery": "based on the provided text generate the continuation of the story return text blob",
    }
    ,
    {
        "order": 2,
        "return_type": "choice",
        "prequery": "",
        "postquery": " generate a list of 6 common story places in strict  strict json format no text with keys: text,type,image_description, image_url,description. the returned data will describe possible heroes where the story could evolve",
    },
    {
        "order": 3,
        "return_type": "text",
        "prequery": "",
        "postquery": " based on the provided text generate the continuation of the story return text blob",
    }
    ,
    {
        "order": 4,
        "return_type": "choice",
        "prequery": "",
        "postquery": " based on the provided text return 6 possible results in strict json format no text or list with keys: text,type,image_description, image_url,description. the returned data will describe possible heroes where the story could evolve",
    },
    {
        "order": 5,
        "return_type": "text",
        "prequery": "",
        "postquery": " based on the provided text generate the continuation of the story return text blob",
    }
]

def chatGpt(text):
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "assistant", "content": text }],
        "temperature": 0.2
    }

    try:
        response = requests.post(
            open_api_url, 
            headers=openapi_base_headers, 
            data=json.dumps(data)
        ).json()

        return response['choices'][0]['message']['content']
    except Exception as e:
        raise Exception(f'Something went wrong with the chatGPT API: {response}')

def unfinished_book_response(user, choice_text, unfinished_book):
    unfinished_book['storyline'].sort(key=lambda x: x['order'], reverse=True)

    storyline = unfinished_book['storyline'][0]

    if storyline['type'] == 'choice':
        for choice in storyline['choices']:
            if choice['text'] == choice_text:
                choice['is_chosen'] = True
        user.save()

    order = storyline['order'] + 1 
    story = [story for story in story_builder if story['order'] == order][0]

    response = chatGpt(f"{story['prequery']}{story['postquery']}")
    if story['return_type'] == 'text':
        prompt = {
            "order": order,
            "prompt": "",
            "type": "text",
            "image_url": "",
            "choices": "",
            "text": response
        }

    elif story['return_type'] == 'choice':
        prompt = {
            "order": order,
            "prompt": "",
            "type": "choices",
            "image_url": "",
            "choices": json.loads(response),
            "text": ""
        }

    # FIXME: ↘  something wong with this one over here please check it
    unfinished_book['storyline'].append(Prompt(
        **prompt, 
        choices=[Choice(**choice_data) for choice_data in prompt['choices']] if prompt['choices'] else None
    ))
    # ^^ ↗ 

    user.save()

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


async def create_new_book_response(user):
    story = [story for story in story_builder if story['order'] == 0][0]

    response = chatGpt(story['prequery'])

    try:
        generated_story = json.loads(response)
        choices = generated_story if story['return_type'] == 'choice' else []

    except Exception:
        choices = []
        raise Exception(f'ChatGpt returned invalid JSON: {response}')

    book = Book(
        id=f"book{user.id}",
        name="",
        is_finished=False,
        storyline=[Prompt(
            order=0,
            prompt="",
            type=story['return_type'],
            image_url="",
            text="",
            choices=[Choice(**choice_data) for choice_data in choices] if choices else None
        )]
    )

    user.books.append(book)
    user.save()
    
    enhancer = 'cat, in a plain background,modern,stylized,futuristic'
    image_list = []
    for item in choices:
        image_name = await generate_image(item['text'] + item['description'] + enhancer)

        image_url = f"http://127.0.0.1:8000/images/{image_name}.png"

        image_list.append({"image_url": image_url, "image_name": image_name})

        for choice, image in zip(choices, image_list):
            choice['image_url'] = image['image_url']
        
    return choices


@router.get("/story")
async def story(choice_text: str | None = None):
    user = User.objects(id='1').first()

    unfinished_book = [book for book in user['books'] if book['is_finished'] == False]
    
    if len(unfinished_book) > 0:
        return unfinished_book_response(user=user, choice_text=choice_text, unfinished_book=unfinished_book[0])
    else:
        return await create_new_book_response(user)