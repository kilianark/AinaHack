from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

import os
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

modelo = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50")
tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50")

# Texto en catalán, español o inglés que deseas resumir
text_catalan = "El canvi climàtic és un dels majors desafiaments ambientals, econòmics i socials del nostre temps. L'augment de les emissions de gasos d'efecte hivernacle, principalment el diòxid de carboni, està causant un escalfament global que provoca alteracions en els patrons climàtics a nivell mundial. Aquestes alteracions tenen efectes greus, com l'augment del nivell del mar, canvis en les estacions, i fenòmens meteorològics extrems com huracans i sequeres. Els científics adverteixen que, si no es redueixen les emissions de manera dràstica, aquests efectes seran cada vegada més intensos i afectaran greument la biodiversitat, els ecosistemes i la salut humana. Les accions individuals, com la reducció del consum d'energia i l'ús de transports sostenibles, així com les polítiques governamentals per promoure energies renovables, són essencials per frenar aquest procés."
text_espanol = "El cambio climático es uno de los mayores desafíos ambientales, económicos y sociales de nuestro tiempo. El aumento de las emisiones de gases de efecto invernadero, principalmente el dióxido de carbono, está provocando un calentamiento global que altera los patrones climáticos a nivel mundial. Estas alteraciones tienen efectos graves, como el aumento del nivel del mar, cambios en las estaciones y fenómenos meteorológicos extremos como huracanes y sequías. Los científicos advierten que, si no se reducen drásticamente las emisiones, estos efectos serán cada vez más intensos y afectarán gravemente la biodiversidad, los ecosistemas y la salud humana. Las acciones individuales, como la reducción del consumo de energía y el uso de transportes sostenibles, así como las políticas gubernamentales para promover energías renovables, son esenciales para frenar este proceso."
text_ingles = "Climate change is one of the biggest environmental, economic, and social challenges of our time. The increase in greenhouse gas emissions, primarily carbon dioxide, is causing global warming, which is altering climate patterns worldwide. These changes have serious effects, such as rising sea levels, shifts in seasons, and extreme weather events like hurricanes and droughts. Scientists warn that if emissions are not drastically reduced, these effects will become increasingly severe, severely impacting biodiversity, ecosystems, and human health. Individual actions, such as reducing energy consumption and using sustainable transportation, as well as government policies to promote renewable energy, are essential to slow this process."


def resumir_text(text, idioma):
    # Configurar el idioma de entrada en el tokenizer
    tokenizer.src_lang = idioma
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


print("Resumen en catalán:", resumir_text(text_catalan, "ca_XX"))
print("Resumen en español:", resumir_text(text_espanol, "es_XX"))
print("Resumen en inglés:", resumir_text(text_ingles, "en_XX"))