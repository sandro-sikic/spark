import os
from dotenv import load_dotenv
load_dotenv()



api_key = os.environ.get("STABILITY_KEY")

engine_id = 'stable-diffusion-v1-5'
api_host = 'https://api.stability.ai'

StabilityIMGendpoint = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image'


base_headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": f"Bearer {api_key}"
}