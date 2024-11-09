from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import os

os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

modelo = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50")

def resumir_text(text, fragment_size=1024):
    tokenizer.src_lang = "es_XX"
    # Divide el texto en fragmentos de tamaño adecuado
    tokens = tokenizer(text, return_tensors="pt", max_length=fragment_size, truncation=True, padding="longest")
    input_ids_chunks = [tokens['input_ids'][0][i:i + fragment_size] for i in range(0, tokens['input_ids'].shape[1], fragment_size)]
    
    resúmenes = []
    for chunk in input_ids_chunks:
        # Generar el resumen para cada fragmento
        resumen_ids = modelo.generate(
            chunk.unsqueeze(0),
            max_length=int(len(chunk) * 0.4), 
            min_length=int(len(chunk) * 0.2),
            repetition_penalty=3.0,
            num_beams=6,
            no_repeat_ngram_size=2,
            do_sample=True,
            top_k=50
        )
        resúmenes.append(tokenizer.decode(resumen_ids[0], skip_special_tokens=True))
    
    # Opcional: hacer un resumen adicional de los resúmenes individuales
    resumen_final = " ".join(resúmenes)
    return resumen_final
