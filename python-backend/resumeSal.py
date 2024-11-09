import requests
from transformers import AutoTokenizer
HF_TOKEN = "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"
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
    system_prompt = "Detecta els punts claus del text, resumeix el text ordenat pels punts claus"
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