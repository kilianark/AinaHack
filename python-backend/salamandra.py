import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
def translate_text(src_lang_code, tgt_lang_code, sentence, model_id='BSC-LT/salamandraTA-2b'):

    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(model_id)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    prompt = f"Translate the following from {src_lang_code} to {tgt_lang_code}: {sentence}"

    input_ids = tokenizer(prompt, return_tensors='pt').input_ids.to(device)

    output_ids = model.generate(input_ids, max_length=500, num_beams=5, early_stopping=True)

    translated_text = tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()

    return translated_text