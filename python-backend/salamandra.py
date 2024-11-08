import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
def translate_text(src_lang_code, tgt_lang_code, sentence, model_id='BSC-LT/salamandraTA-2b'):

    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(model_id)

    # Move model to GPU if available
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    # Construct a translation prompt
    prompt = f"Translate the following from {src_lang_code} to {tgt_lang_code}: {sentence}"

    # Tokenize the input sentence and move it to the correct device (CPU or GPU)
    input_ids = tokenizer(prompt, return_tensors='pt').input_ids.to(device)

    # Generate the output using beam search for better quality
    output_ids = model.generate(input_ids, max_length=500, num_beams=5, early_stopping=True)

    # Decode the generated output and remove special tokens
    translated_text = tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()

    return translated_text