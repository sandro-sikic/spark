
from fastapi import APIRouter
import requests,base64, httpx
from settings.config import *
from settings.image_settings import *
from fastapi.responses import HTMLResponse
import json
router = APIRouter()


@router.get("/text-to-image-local")
async def generate_and_save_image(text: str):
    payload = image_properties(text)
    async with httpx.AsyncClient(timeout=40.0) as client:
        response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
    data = response.json()

    for i, image in enumerate(data["artifacts"]):
        with open(f"./image{i}.png", "wb") as f:
            f.write(base64.b64decode(image["base64"]))

    return {"message": "Image(s) generated and saved."}

@router.get("/text-to-image-postman", response_class=HTMLResponse)
async def Returns_image_in_base64_on_requests(text: str):
    payload = image_properties(text)
    async with httpx.AsyncClient(timeout=40.0) as client:
        response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
    data = response.json()
    image_base64 = data["artifacts"][0]["base64"]

    return f'<img src="data:image/png;base64,{image_base64}" alt="Generated Image">'

@router.get("/text-to-image-postman2", response_class=HTMLResponse)
async def Returns_enhanced_image_in_base64_on_requests(text: str):
    payload = enhanced_image_properties(text)
    async with httpx.AsyncClient(timeout=40.0) as client:
        response = await client.post(url=StabilityIMGendpoint, headers=base_headers, json=payload)
    data = response.json()
    image_base64 = data["artifacts"][0]["base64"]

    return f'<img src="data:image/png;base64,{image_base64}" alt="Generated Image">'


@router.get("/openapi")
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
