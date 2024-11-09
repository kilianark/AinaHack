from dotenv import load_dotenv
import requests
from transformers import AutoTokenizer, AutoModelForCausalLM
import os
from simplify import simplify
from resume import resumir_text
from resumeSal import resumeSalamandra
from simplifySal import simplifySalamandra

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

def translate_text(src_lang_code, tgt_lang_code, sentence):
    # Load tokenizer and model
    sentencesBig=[]
    sentencesBig = sentence.split(', ')
    print(sentencesBig)
    generated_text = []
    for sentences in sentencesBig:
        
        load_dotenv(".env")
        HF_TOKEN = "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"
        BASE_URL = "https://o9vasr2oal4oyt2j.us-east-1.aws.endpoints.huggingface.cloud"
        headers = {
            "Accept" : "application/json",
            "Authorization": f"Bearer {HF_TOKEN}",
            "Content-Type": "application/json"
        }
        prompt = f'[{src_lang_code}] {sentences} \n[{tgt_lang_code}]'
        payload = { "inputs": prompt, "parameters": {
            "max_new_tokens": 3000,
            "temperature": 0.7,  # Adjust the temperature to control randomness
            "repetition_penalty": 1.2,  # Higher value will discourage repetition
            "frequency_penalty": 1.2,
                                                     }}
        response = requests.post(BASE_URL + "/generate", headers=headers, json=payload)

        # Check if the response status code is 200 (OK)
        if response.status_code == 200:
            # Parse the response JSON and extract the generated text
            response_data = response.json()  # The response will be in JSON format
            translated_sentence = response_data.get("generated_text", "").strip()
            if translated_sentence and translated_sentence[-1] not in ['.', '?', '!']:
                translated_sentence += ','
            generated_text.append(translated_sentence)
        else:
            # Handle the error if the request was unsuccessful
            generated_text.append(f"Error: {response.status_code} - {response.text}")
    result = ' '.join(generated_text)
    #', '.join(generated_text)

    # Ensure the final output ends with a period
    if result and result[-1] not in ['.', '?', '!']:
        result += '.'
    return  result



def simplifyText(src_lang_code, tgt_lang_code, sentence):
    
    translated_sentence = translate_text(src_lang_code, 'English', sentence)
    
    simplified_text = simplify(translated_sentence)
    
    return translate_text('English', tgt_lang_code, simplified_text)

def simplifyTextSalamandra(src_lang_code, tgt_lang_code, sentence):
    
    translated_sentence = translate_text(src_lang_code, 'Catalan', sentence)
    
    simplified_text = simplifySalamandra(translated_sentence)
    
    return translate_text('Catalan', tgt_lang_code, simplified_text)
    
def resumeText(src_lang_code, tgt_lang_code, sentence):

    translated_sentence = translate_text(src_lang_code, 'Spanish', sentence)

    resumed_sentence = resumir_text(translated_sentence)

    return translate_text('Spanish', tgt_lang_code, resumed_sentence)

def resumeTextSalamandra(src_lang_code, tgt_lang_code, sentence):
    
    translated_sentence = translate_text(src_lang_code, 'Catalan', sentence)
    
    resumed_sentence = resumeSalamandra(translated_sentence)
    
    return translate_text('Catalan', tgt_lang_code, resumed_sentence)

    