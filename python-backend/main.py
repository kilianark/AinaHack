from salamandra import translate_text

def main():
    # Example sentence to translate
    src_lang_code = 'Catalan'
    tgt_lang_code = 'Spanish'
    sentence = input("Introduzca el la frase que quiere traducir: ")
    # Call the translate_text function
    translated_text = translate_text(src_lang_code, tgt_lang_code, sentence)

    # Print the result
    print("Original:", sentence)
    print("Translated:", translated_text)

if __name__ == "__main__":
    main()