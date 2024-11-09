import requests
from dotenv import load_dotenv
from transformers import AutoTokenizer
load_dotenv()
api_token = os.getenv("API_TOKEN")
HF_TOKEN = api_token
BASE_URL = "https://hijbc1ux6ie03ouo.us-east-1.aws.endpoints.huggingface.cloud"
model_name = "BSC-LT/salamandra-7b-instruct-aina-hack"
tokenizer = AutoTokenizer.from_pretrained(model_name)
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
def resumeSalamandra(text):
    headers = {
        "Accept" : "application/json",
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }
    system_prompt = "Detecta els punts claus del text, fes una descripció amplia, clara i ordenada dels punts clau"
    message = [ { "role": "system", "content": system_prompt} ]
    message += [ { "role": "user", "content": text } ]
    prompt = tokenizer.apply_chat_template(
    message,
    tokenize=False,
    add_generation_prompt=True,
    )

    payload = {
    "inputs": prompt,
    "parameters": {},
    "temperature": 0.1,
    }
    api_url = BASE_URL + "/generate"
    response = requests.post(api_url, headers=headers, json=payload)
    respuesta= response.json()
    return respuesta["generated_text"]