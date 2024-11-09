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
    
if __name__ == "__main__":
    app.run(debug=True)