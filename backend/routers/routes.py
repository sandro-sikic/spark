
from fastapi import APIRouter
import requests,base64, httpx
from settings.config import *
from settings.image_settings import *
from fastapi.responses import HTMLResponse, JSONResponse
import json
from models.models import *
import uuid

router = APIRouter()

image_dir = "./images/"

@router.get("/text-to-image-local" ,  tags=["Stable Diffusion"])
async def generate_and_save_image(text: str):
    payload = image_properties(text)
    async with httpx.AsyncClient(timeout=40.0) as client:
        response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
    data = response.json()

    for i, image in enumerate(data["artifacts"]):
        with open(f"./image{i}.png", "wb") as f:
            f.write(base64.b64decode(image["base64"]))

    return {"message": "Image(s) generated and saved."}

@router.get("/text-to-image-postman", response_class=HTMLResponse ,  tags=["Stable Diffusion"])
async def Returns_image_in_base64_on_requests(text: str):
    payload = image_properties(text)
    async with httpx.AsyncClient(timeout=40.0) as client:
        response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
    data = response.json()
    image_base64 = data["artifacts"][0]["base64"]

    return f'<img src="data:image/png;base64,{image_base64}" alt="Generated Image">'

@router.get("/text-to-image-postman2", response_class=HTMLResponse,  tags=["Stable Diffusion"])
async def Returns_enhanced_image_in_base64_on_requests(text: str):
    payload = enhanced_image_properties(text)
    async with httpx.AsyncClient(timeout=40.0) as client:
        response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
    data = response.json()
    image_base64 = data["artifacts"][0]["base64"]

    return f'<img src="data:image/png;base64,{image_base64}" alt="Generated Image">'


@router.get("/openapi",  tags=["chat-gpt"])
async def openapi(text: str):
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "assistant", "content": text }],
        "temperature": 0.2
    }
    response = requests.post(open_api_url, headers=openapi_base_headers, data=json.dumps(data))
    response_json = response.json()
    response_back = response_json['choices'][0]['message']['content']
    response = json.loads(response_back)
    return response




#  DISPLAY CATEGORIES
@router.get("/openapi/categories" ,  tags=["chat-gpt"])
async def openapi():
    categories_prompt = 'generate a list of 6 story categories in the json format with keys: text, type, image_description, image_url, description'
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "assistant", "content": categories_prompt }],
        "temperature": 0.2
    }
    response = requests.post(open_api_url, headers=openapi_base_headers, data=json.dumps(data))
    response_json = response.json()
    response_back = response_json['choices'][0]['message']['content']
    response = json.loads(response_back)

    for item in response:
        spark_item = SparkCollection(**item)
        spark_item.save()
    return response



# CATEGORY PICK 
# FANTASY CATEGORY EXAMPLE
# FANTASY.DESCRIPTION  + TEXT  based on the provided text return 6 possible results in json format with keys: text,type,image_description, image_url,description. the returned data will describe possible setting where the story could evolve

@router.get("/openapi/landscape" ,  tags=["chat-gpt"])
async def openapi():
    # categories_prompt = 'generate a list of 6 story categories in the json format with keys: text, type, image_description, image_url, description'
    fantasy_genry_description = 'Fantasy stories are set in imaginary worlds where magic and supernatural phenomena are possible. They often feature mythical creatures, such as dragons, elves, and fairies, and may involve quests, battles, or romance'
    landscape_prompt = ' based on the provided text return 6 possible results in json format with keys: text,type,image_description, image_url,description. the returned data will describe possible setting where the story could evolve'
    final_landscape_prompt = fantasy_genry_description + landscape_prompt
# LANDSCAPE PART

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "assistant", "content": final_landscape_prompt }],
        "temperature": 0.2
    }
    response = requests.post(open_api_url, headers=openapi_base_headers, data=json.dumps(data))
    response_json = response.json()
    response_back = response_json['choices'][0]['message']['content']
    response = json.loads(response_back)
    # LIST OF LANDSCAPES
    print(response)
    
    # LETS SAY USER PICKS "The Enchanted Forest"
    #HERO 
@router.get("/openapi/hero" ,  tags=["chat-gpt"])
async def openapi2():
    # categories_prompt = 'generate a list of 6 story categories in the json format with keys: text, type, image_description, image_url, description'
    landscape_description = 'The Enchanted Forest is a magical place where anything can happen. It is home to many friendly and mysterious creatures, such as fairies, unicorns, and talking animals. It is also full of dangers, such as witches, trolls, and dark spells. The forest has many secrets and hidden paths that lead to different realms or adventures.'
    hero_prompt = ' based on the provided text return 6 possible results in json format with keys: text,type,image_description, image_url,description. the returned data will describe possible heroes where the story could evolve'
    final_hero_prompt = landscape_description + hero_prompt
# LANDSCAPE PART

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "assistant", "content": final_hero_prompt }],
        "temperature": 0.2
    }
    response = requests.post(open_api_url, headers=openapi_base_headers, data=json.dumps(data))
    print(response.content)
    response_json = response.json()
    response_back = response_json['choices'][0]['message']['content']
    print(response_back)
    response = json.loads(response_back)
   
    print(response)
    return response


@router.get("/openapi/action" ,  tags=["chat-gpt"])
async def openapi2():
    # categories_prompt = 'generate a list of 6 story categories in the json format with keys: text, type, image_description, image_url, description'
    hero_description = 'Lila is a curious and adventurous girl who loves to explore the Enchanted Forest. She has a special bond with the animals and plants, and can communicate with them. She also has a knack for finding hidden paths and secrets. She is brave and kind, but sometimes gets into trouble because of her impulsiveness.'
    action_prompt = ' based on the provided text return 6 possible results in json format with keys: text,type,image_description, image_url,description. the returned data will describe possible heroes where the story could evolve'
    final_action_prompt = hero_description + action_prompt
# LANDSCAPE PART

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "assistant", "content": final_action_prompt }],
        "temperature": 0.2
    }
    response = requests.post(open_api_url, headers=openapi_base_headers, data=json.dumps(data))
    print(response.content)
    response_json = response.json()
    response_back = response_json['choices'][0]['message']['content']
    print(response_back)
    response = json.loads(response_back)
   
    print(response)
    return response
    
    
story_builder = [
    {
        "order": 0,
        "return_type": "choice",
        "prequery": "generate a list of 6 story categories in strict json format with keys: text, type, image_description, image_url, description",
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
        "postquery": " based on the provided text return 6 possible results in strict json format with keys: text,type,image_description, image_url,description. the returned data will describe possible heroes where the story could evolve",
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
        "postquery": " based on the provided text return 6 possible results in strict json format with keys: text,type,image_description, image_url,description. the returned data will describe possible heroes where the story could evolve",
    },
    {
        "order": 5,
        "return_type": "text",
        "prequery": "",
        "postquery": " based on the provided text generate the continuation of the story return text blob",
    }
]
    

@router.get("/openapi/test" ,  tags=["chat-gpt"])
async def test(choice_text: str | None = None):
    # get user from database
    # user = None
    user = User.objects(id='1').first()


    # check if user has a book that is not finished
    unfinished_book = [book for book in user['books'] if book['is_finished'] == False]

    if len(unfinished_book ) > 0:
        unfinished_book = unfinished_book[0]
    # if there is a book check where in the storyline it is
        unfinished_book['storyline'].sort(key=lambda x: x['order'], reverse=True)
        storyline = unfinished_book['storyline'][0]
#   THERE IS UNFINISHED BOOK
    if storyline['type'] == 'choice':
        for choice in storyline['choices']:
            if choice['text'] == choice_text:
                choice['is_chosen'] = True
        #  Generate Nice picture
        user.save()

        # send request to chatgpt with the forward looking storyline
    order = storyline['order'] + 1 
    story = [story for story in story_builder if story['order'] == order][0]

    response = chatGpt(f"{story['prequery']}{story['postquery']}")
    response = json.loads(response)
    if story_builder[order]['return_type'] == 'text':
        unfinished_book['storyline'].append(Prompt(
                order = order,
                prompt = "",
                type =  'text',
                image_url = "",
                text = response
        ))
        user.save()
        return response
    elif story_builder[order]['return_type'] == 'choice':
        unfinished_book['storyline'].append(Prompt(
                order = order,
                prompt = "",
                type =  'choices',
                image_url = "",
                choices = json.loads(response)
        ))
        user.save()

        return json.loads(response)
    # else:
    #     return "Something went wrong"
    else:
        # NEW BOOK  CREATION

        # if there is no book create one
        story = [story for story in story_builder if story['order'] == 0][0]
        response = chatGpt(story['prequery'] )
        choices = json.loads(response) if story['return_type'] == 'choice' else []
        # GENERATE BOOK OBJECT
        new_book = Book(
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
        user.books.append(new_book)
        user.save()
        # GIVE BACK 1st 6 items  for users to chose  "CATEGORIES'
        response = json.loads(response)
        # return response
        
# STABLE DIFFUSER PART

        image_enhancer = 'cat, in a plain background,modern,stylized,futuristic'
        image_list = []
        for i, item in enumerate(response):
            stable_diff_prompt_text = item['text'] + item['description'] + image_enhancer
            payload = image_properties(stable_diff_prompt_text)
            async with httpx.AsyncClient(timeout=40.0) as client:
                response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
            data = response.json()
            image_base64 = data["artifacts"][0]["base64"]

            # Save the image
            image_name = f"img{i}"
            image_path = os.path.join(image_dir, f"{image_name}.png")
            with open(image_path, "wb") as f:
                f.write(base64.b64decode(image_base64))

            # Return the image URL and ID as a JSON response
            image_url = f"http://localhost:8811/images/{image_name}.png"
            image_list.append({"image_url": image_url, "image_name": image_name})
            for choice, image in zip(choices, image_list):
                choice['image_url'] = image['image_url']

        
        return choices




# STABLE DIFFUSER ABSTRACTED
@router.get("/stabediff/test", response_class=HTMLResponse, tags=["chat-gpt"])
async def test():
    image_dir = "./images/"

    fake_dataset = [
        {'text': 'Romance', 'type': 'category', 'image_description': 'Couple holding hands on a beach', 'image_url': 'https://example.com/romance.jpg', 'description': 'Stories about love and relationships'},
        {'text': 'Mystery', 'type': 'category', 'image_description': 'Dark alleyway at night', 'image_url': 'https://example.com/mystery.jpg', 'description': 'Stories about crime, suspense, and intrigue'},
        {'text': 'Science Fiction', 'type': 'category', 'image_description': 'Spaceship flying through space', 'image_url': 'https://example.com/scifi.jpg', 'description': 'Stories about futuristic technology and other worlds'},
        {'text': 'Horror', 'type': 'category', 'image_description': 'Haunted house at night', 'image_url': 'https://example.com/horror.jpg', 'description': 'Stories about fear and the supernatural'},
        {'text': 'Fantasy', 'type': 'category', 'image_description': 'Dragon flying over a castle', 'image_url': 'https://example.com/fantasy.jpg', 'description': 'Stories about magic and mythical creatures'},
        {'text': 'Historical Fiction', 'type': 'category', 'image_description': 'Old book with a quill pen', 'image_url': 'https://example.com/historical.jpg', 'description': 'Stories set in the past, often with fictional characters'}
    ]
    image_enhancer = 'dramaticc,stylized,futuristic'
    image_list = []
    for i, item in enumerate(fake_dataset):
        stable_diff_prompt_text = item['text'] + item['description'] + image_enhancer
        payload = image_properties(stable_diff_prompt_text)
        async with httpx.AsyncClient(timeout=40.0) as client:
            response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
        data = response.json()
        image_base64 = data["artifacts"][0]["base64"]

        # Save the image
        image_name = f"img{i}"
        image_path = os.path.join(image_dir, f"{image_name}.png")
        with open(image_path, "wb") as f:
            f.write(base64.b64decode(image_base64))

        # Return the image URL and ID as a JSON response
        image_url = f"http://localhost:8811/images/{image_name}.png"
        image_list.append({"image_url": image_url, "image_name": image_name})

    return JSONResponse(content=image_list)





        



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
        print(e)
        return "Something went wrong"
