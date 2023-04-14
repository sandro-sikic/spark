
from fastapi import APIRouter
import requests,base64
from settings.config import *

router = APIRouter()

@router.get("/text-to-image")
def getting_a_picture(text: str):
    json_data = {
        "text_prompts": [
            {
                "text": text
            }
        ],
        "cfg_scale": 7,
        "clip_guidance_preset": "FAST_BLUE",
        "height": 1024,
        "width": 1024,
        "samples": 1,
        "steps": 30,
    }
    
    response = requests.post(url=text_to_img_url, headers=base_headers, json=json_data)
    data = response.json()

    for i, image in enumerate(data["artifacts"]):
        with open(f"./image{i}.png", "wb") as f:
            f.write(base64.b64decode(image["base64"]))

    return {"message": "Image(s) generated and saved."}