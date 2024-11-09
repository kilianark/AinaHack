from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

import os
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

modelo = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50")


def resumir_text(text):
    # Configurar el idioma de entrada en el tokenizer
    tokenizer.src_lang = "es_XX"
    # Codificar el texto de entrada
    inputs = tokenizer(text, return_tensors="pt", max_length=1000000, truncation=True)

    # Calcular longitud mínima y máxima según el tamaño del texto de entrada
    input_length = len(text)
    min_summary_length = int(input_length * 0.2)  # El resumen será al menos el 20% del texto original
    max_summary_length = int(input_length * 0.4)  # El resumen será al máximo el 40% del texto original

    # Generar el resumen
    resumen_ids = modelo.generate(
        inputs["input_ids"], 
        max_length=max_summary_length, 
        min_length=min_summary_length, 
        repetition_penalty=3.0, 
        num_beams=6, 
        no_repeat_ngram_size=2,
        do_sample=True,          
        top_k=50 )
    # Decodificar el resumen y devolverlo
    return tokenizer.decode(resumen_ids[0], skip_special_tokens=True)
