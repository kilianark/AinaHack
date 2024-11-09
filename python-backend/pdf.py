import fitz  # PyMuPDF
from transformers import MarianMTModel, MarianTokenizer
from tqdm import tqdm

def extract_text_from_pdf(pdf_path):
    """
    Extract text from PDF file.
    """
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text("text")
    return text

def translate_text(text, source_language, target_language, max_length=512):
    """
    Translates text from source language to target language.
    """
    model_name = f'Helsinki-NLP/opus-mt-{source_language}-{target_language}'
    model = MarianMTModel.from_pretrained(model_name)
    tokenizer = MarianTokenizer.from_pretrained(model_name)

    text_segments = [text[i:i + max_length] for i in range(0, len(text), max_length)]

    translated_segments = []
    
    for segment in tqdm(text_segments, desc="Translating", unit="segment"):
        inputs = tokenizer(segment, return_tensors='pt', padding=True, max_length=max_length, truncation=True)
        outputs = model.generate(**inputs)
        translated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        translated_segments.append(translated_text)

    translated_text = " ".join(translated_segments)
    return translated_text

def create_pdf_from_text(original_pdf_path, translated_text, output_path, font_path):
    """
    Creates a PDF file from text, preserving the original format.
    """
    doc = fitz.open(original_pdf_path)
    translated_doc = fitz.open()  # Create a new PDF

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        translated_page = translated_doc.new_page(width=page.rect.width, height=page.rect.height)
        blocks = page.get_text("dict")["blocks"]
        
        for block in blocks:
            if block["type"] == 0:  # Text block
                for line in block["lines"]:
                    for span in line["spans"]:
                        translated_span_text = translate_text(span["text"], source_language, target_language)
                        translated_page.insert_text((span["bbox"][0], span["bbox"][1]), translated_span_text, fontsize=span["size"], fontname="helv", fontfile=font_path)

    translated_doc.save(output_path)

# Parameters for translation and paths
input_pdf_path = 'input.pdf'
output_pdf_path = 'output.pdf'
source_language = 'es'  
target_language = 'ca'  
font_path = 'Arial.ttf'  # Path to your font file

# Extract text from PDF
text = extract_text_from_pdf(input_pdf_path)

# Translate text and print the translated text
translated_text = translate_text(text, source_language, target_language)
print(translated_text)  # Display translated text

# Generate the translated PDF
create_pdf_from_text(input_pdf_path, translated_text, output_pdf_path, font_path)
