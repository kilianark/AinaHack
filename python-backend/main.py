from salamandra import translate_text
from resumeSal import resumeSalamandra
def main():
    # Example sentence to translate

    sentence = input("Introduzca la frase que quiere traducir: ")
    
    src_lang_code = 'Spanish'
    tgt_lang_code = 'English'
    
    resumed = resumeSal(sentence)
    print(resumed)
    
    src_lang_code = 'English'
    tgt_lang_code = 'Catalan'
    final_text = translate_text(src_lang_code, tgt_lang_code, resumed)
    
    
    print("Original:", sentence)
    print("Translated:", final_text)


if __name__ == "__main__":
    main()
