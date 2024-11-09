from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

def simplify(text):
    # Use the pre-trained T5 model and tokenizer
    model_name = 't5-base'  # You can use 't5-small' or 't5-large' depending on resources
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    model = T5ForConditionalGeneration.from_pretrained(model_name)
    tokenizer = T5Tokenizer.from_pretrained(model_name)
    model.to(device)

    # Encode the input text
    inputs = tokenizer.encode("simplify: " + text, return_tensors="pt", max_length=1000000, truncation=True)
    inputs = inputs.to(device)

    # Generate the simplified text
    outputs = model.generate(inputs, max_length=1000000, num_beams=4, early_stopping=True)
    simplified_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return simplified_text

# Example usage
