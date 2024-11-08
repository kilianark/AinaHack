import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = 'BSC-LT/salamandraTA-2b'

def translate_text(src_lang_code, tgt_lang_code, sentence):
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(model_id)
    
    # Config pad_token_id as eos_token_id
    if model.config.pad_token_id is None:
        model.config.pad_token_id = model.config.eos_token_id

    # Move model to GPU if available
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    prompt = f'[{src_lang_code}] {sentence} \n[{tgt_lang_code}]'

    # Tokenize and move inputs to the same device as the model
    inputs = tokenizer(prompt, return_tensors='pt', padding=True).to(device)
    output_ids = model.generate(inputs.input_ids, attention_mask=inputs.attention_mask, max_length=500, num_beams=5)
    input_length = inputs.input_ids.shape[1]

    generated_text = tokenizer.decode(output_ids[0, input_length:], skip_special_tokens=True).strip()
    return(generated_text)