import os
from dotenv import load_dotenv
load_dotenv()



api_key = os.environ.get("STABILITY_KEY")
open_api_key = os.environ.get("OPENAPI_KEY")
open_api_url  = 'https://api.openai.com/v1/chat/completions'
engine_id = 'stable-diffusion-v1-5'
api_host = 'https://api.stability.ai'

StabilityIMGendpoint = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image'


base_headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": f"Bearer {api_key}"
}
openapi_base_headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": f"Bearer {open_api_key}"
}


