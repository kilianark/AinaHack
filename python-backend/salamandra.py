from dotenv import load_dotenv
import requests
from transformers import AutoTokenizer, AutoModelForCausalLM
import os
from simplify import simplify
from resume import resumir_text
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

def translate_text(src_lang_code, tgt_lang_code, sentence):
    # Load tokenizer and model


    load_dotenv(".env")
    HF_TOKEN = "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"
    BASE_URL = " https://o9vasr2oal4oyt2j.us-east-1.aws.endpoints.huggingface.cloud"
    
    headers = {
    "Accept" : "application/json",
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}
    prompt = f'[{src_lang_code}] {sentence} \n[{tgt_lang_code}]'
    payload = {
        "inputs": prompt,
        "parameters": {
            "new_max_tokens": 80000  # Add max_tokens to the parameters
        }
    }
    
    response = requests.post(BASE_URL + "/generate", headers=headers, json=payload,)
    return (response.json()["generated_text"])

def simplifyText(src_lang_code, tgt_lang_code, sentence):
    
    translated_sentence = translate_text(src_lang_code, 'English', sentence)
    
    simplified_text = simplify(translated_sentence)
    
    return translate_text('English', tgt_lang_code, simplified_text)
    
def resumeText(src_lang_code, tgt_lang_code, sentence):

    #translated_sentence = translate_text(src_lang_code, 'Spanish', sentence)

    return resumir_text(sentence)

    #return translate_text('Spanish', tgt_lang_code, resumed_sentence)

    