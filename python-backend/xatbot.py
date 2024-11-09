from transformers import XLMRobertaForQuestionAnswering, XLMRobertaTokenizer

# Cargar el modelo y el tokenizador preentrenados para QA (SQUAD2)
modelo = XLMRobertaForQuestionAnswering.from_pretrained("deepset/xlm-roberta-large-squad2")
tokenizer = XLMRobertaTokenizer.from_pretrained("deepset/xlm-roberta-large-squad2")

# Contexto sobre la Generalitat de Catalunya
contexto = """
La Generalitat de Catalunya és el govern autonòmic de Catalunya. És responsable de l'administració pública de la comunitat autònoma 
i s'encarrega de la gestió de polítiques públiques en àmbits com l'educació, la sanitat, l'economia i la justícia. 
El president de la Generalitat és elegit pel Parlament de Catalunya.
"""

# Pregunta del usuario
pregunta = "Què és la Generalitat de Catalunya?"

# Tokenizar la pregunta y el contexto
inputs = tokenizer(pregunta, contexto, return_tensors="pt")

# Hacer la predicción con el modelo
outputs = modelo(**inputs)

# Extraer la respuesta
start_idx = outputs.start_logits.argmax()
end_idx = outputs.end_logits.argmax()

# Obtener las palabras correspondientes a los índices
answer_tokens = inputs.input_ids[0][start_idx:end_idx+1]
respuesta = tokenizer.decode(answer_tokens)

# Mostrar la respuesta
print("Resposta:", respuesta)
