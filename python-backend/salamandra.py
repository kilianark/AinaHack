import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = 'BSC-LT/salamandraTA-2b'

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

src_lang_code = 'Spanish'
tgt_lang_code = 'Catalan'
sentence = 'Ayer se fue, tomó sus cosas y se puso a navegar.'

prompt = f'[{src_lang_code}] {sentence} \n[{tgt_lang_code}]'

# Tokenize and move inputs to the same device as the model
input_ids = tokenizer(prompt, return_tensors='pt').input_ids.to(device)
output_ids = model.generate(input_ids, max_length=500, num_beams=5)
input_length = input_ids.shape[1]

generated_text = tokenizer.decode(output_ids[0, input_length:], skip_special_tokens=True).strip()
print(generated_text)