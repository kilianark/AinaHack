import requests
from transformers import AutoTokenizer

HF_TOKEN = "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"
BASE_URL = "https://hijbc1ux6ie03ouo.us-east-1.aws.endpoints.huggingface.cloud"
model_name = "BSC-LT/salamandra-7b-instruct-aina-hack"

tokenizer = AutoTokenizer.from_pretrained(model_name)

def send_message_to_chatbot(user_message):

    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }

    system_prompt = "Responde a las preguntas del usuario en catalán de manera clara y concisa."
    
    message = [{"role": "system", "content": system_prompt}]
    message.append({"role": "user", "content": user_message})

    prompt = tokenizer.apply_chat_template(
        message,
        tokenize=False,           
        add_generation_prompt=True
    )

   
    payload = {
        "inputs": prompt,  
        "parameters": {}   
    }

    
    api_url = BASE_URL + "/generate"
    response = requests.post(api_url, headers=headers, json=payload)


    if response.status_code == 200:
        respuesta_json = response.json()
        
        return respuesta_json["content"]["text"]
    else:
        
        return f"Error: {response.status_code} - {response.text}"
    
def start_chatbot():
    print("¡Bienvenido al chatbot de Salamandra! Escribe 'salir' para terminar la conversación.")

    while True:
        user_message = input("Tú: ")

        if user_message.lower() == "salir":
            print("Chatbot: ¡Adéu! Ha estat un plaer ajudar-te.")
            break

        bot_response = send_message_to_chatbot(user_message)

        print(f"Chatbot: {bot_response}")

start_chatbot()