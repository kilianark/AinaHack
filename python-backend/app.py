from flask import Flask, request, jsonify  # Importar módulos necesarios
from flask_cors import CORS
from salamandra import translate_text

app = Flask(__name__)
CORS(app)

@app.route("/translate", methods=["POST"])
def translate():
    
    #obtener datos de la solicitud JSON
    data = request.json
    src_lang_code = data.get("src_lang_code")
    tgt_lang_code = data.get("tgt_lang_code")
    sentence = data.get("sentence")
    
    #llamar al traductor de salamandra
    translated_text = translate_text(src_lang_code, tgt_lang_code, sentence)
    
    return jsonify(translated_text)
    
if __name__ == "__main__":
    app.run(debug=True)