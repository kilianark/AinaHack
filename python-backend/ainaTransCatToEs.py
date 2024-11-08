import ctranslate2
import pyonmttok
from huggingface_hub import snapshot_download
model_dir = snapshot_download(repo_id="projecte-aina/aina-translator-ca-es", revision="main")

tokenizer=pyonmttok.Tokenizer(mode="none", sp_model_path = model_dir + "/spm.model")
tokenized=tokenizer.tokenize("Benvingut al projecte Aina!")

translator = ctranslate2.Translator(model_dir)

def translate_text(input_text):
    # Tokenize the input text (Catalan sentence)
    tokenized = tokenizer.tokenize(input_text)[0]  # Tokenized sentence

    # Translate the tokenized sentence
    translated = translator.translate_batch([tokenized])

    # Detokenize the translated tokens to get the final translated sentence in Spanish
    translated_sentence = tokenizer.detokenize(translated[0][0]['tokens'])
    
    return translated_sentence