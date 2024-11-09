import fitz
from flask import Flask, request, jsonify  # Importar módulos necesarios
from flask_cors import CORS
from salamandra import translate_text
from salamandra import simplifyText
from salamandra import resumeText

app = Flask(__name__)
CORS(app)

@app.route("/translate", methods=["POST"])
def translateTextApi():
    
    #obtener datos de la solicitud JSON
    data = request.json
    src_lang_code = data.get("src_lang_code")
    tgt_lang_code = data.get("tgt_lang_code")
    sentence = data.get("sentence")
    
    #llamar al traductor de salamandra
    translated_text = translate_text(src_lang_code, tgt_lang_code, sentence)
    
    return jsonify(translated_text)

@app.route("/simplify", methods=["POST"])
def simplifyTextApi():
    #obtener datos de la solicitud JSON
    data = request.json
    src_lang_code = data.get("src_lang_code")
    tgt_lang_code = data.get("tgt_lang_code")
    sentence = data.get("sentence")
    
    #llamar al simplify de salamandra
    simplified_text = simplifyText(src_lang_code, tgt_lang_code, sentence)
    
    return jsonify(simplified_text)   

@app.route("/resume", methods=["POST"])
def resumerTextApi():
    #obtener datos de la solicitud JSON
    data = request.json
    src_lang_code = data.get("src_lang_code")
    tgt_lang_code = data.get("tgt_lang_code")
    sentence = data.get("sentence")
    
    #llamar al simplify de salamandra
    resumed_text = resumeText(src_lang_code, tgt_lang_code, sentence)
    
    return jsonify(resumed_text)  

@app.route("/extract-text-from-pdf", methods=["POST"])
def extract_text_from_pdf():
    """
    Endpoint para extraer texto de un archivo PDF.
    """
    
    # Verificar si hay un archivo en la solicitud
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    # Obtener el archivo PDF de la solicitud
    file = request.files['file']
    
    # Abrir el archivo PDF usando fitz (PyMuPDF) directamente desde el objeto de archivo
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page_num in range(len(doc)):
        # Cargar cada página y extraer el texto
        page = doc.load_page(page_num)
        text += page.get_text("text")
    
    # Devolver el texto extraído en formato JSON
    return jsonify({"text": text})
    
if __name__ == "__main__":
    app.run(debug=True)