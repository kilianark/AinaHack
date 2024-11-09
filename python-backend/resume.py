from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

import os
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

modelo = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50")


def resumir_text(text, idioma):
    # Configurar el idioma de entrada en el tokenizer
    tokenizer.src_lang = "es_XX"
    # Codificar el texto de entrada
    inputs = tokenizer(text, return_tensors="pt")
    # Generar el resumen
    resumen_ids = modelo.generate(
        inputs["input_ids"], 
        max_length=130, 
        min_length=50, 
        repetition_penalty=3.0, 
        num_beams=6, 
        no_repeat_ngram_size=2,
        do_sample=True,          
        top_k=50 )
    # Decodificar el resumen y devolverlo
    return tokenizer.decode(resumen_ids[0], skip_special_tokens=True)
