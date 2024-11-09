from salamandra import translate_text
from simplify import simplify
def main():
    # Example sentence to translate

    sentence = input("Introduzca la frase que quiere traducir: ")
    
    src_lang_code = 'Spanish'
    tgt_lang_code = 'English'
    
    resumed = simplify(sentence)
    
    src_lang_code = 'English'
    tgt_lang_code = 'Catalan'
    final_text = translate_text(src_lang_code, tgt_lang_code, resumed)
    
    
    print("Original:", sentence)
    print("Translated:", final_text)


if __name__ == "__main__":
    main()
