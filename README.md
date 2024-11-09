# **Instal·lacions del Projecte**

Aquest projecte requereix diverses biblioteques per suportar funcionalitats de traducció, simplificació de textos, generació de resums i processament de documents PDF. A continuació, es llisten totes les biblioteques i una breu explicació del seu ús.

---

### Instal·lacions principals

- **ctranslate2**: `pip install ctranslate2`  
  Biblioteca d'inferència optimitzada per a models de traducció automàtica i altres tasques seqüència a seqüència. Permet executar models de traducció de forma eficient en diverses plataformes, incloent CPU i GPU.

- **pyonmttok**: `pip install pyonmttok`  
  Tokenitzador utilitzat amb OpenNMT per preparar textos per a traducció automàtica. Divideix el text en unitats més petites, facilitant el procés de traducció.

- **huggingface_hub**: `pip install huggingface_hub`  
  Biblioteca per accedir i gestionar models allotjats a Hugging Face, facilitant la integració amb models de llenguatge i altres eines d'aprenentatge automàtic.

- **torch (PyTorch)**: `pip install torch`  
  Biblioteca de codi obert per a l'aprenentatge profund (deep learning), essencial per construir i entrenar xarxes neuronals.

- **transformers**: `pip install transformers`  
  Proporciona accés a una gran varietat de models de llenguatge preentrenats per a tasques com traducció, generació de text i anàlisi de sentiments.

- **sentencepiece**: `pip install sentencepiece`  
  Biblioteca de tokenització de text desenvolupada per Google, que permet tokenitzar textos en múltiples idiomes.

- **protobuf**: `pip install protobuf`  
  Eina per a la serialització i deserialització de dades, ideal per estructurar i transmetre dades entre diferents components de software en sistemes distribuïts.

---

### Altres eines necessàries

- **torch, transformers, python-dotenv, requests**: `pip install torch transformers python-dotenv requests`  
  Instal·lació conjunta de diverses eines útils per al projecte:
  - `python-dotenv`: Carrega variables d'entorn des d'un arxiu `.env`, facilitant la gestió de secrets i configuracions sensibles.
  - `requests`: Biblioteca per a fer sol·licituds HTTP, usada per comunicar-se amb APIs externes i serveis web.

- **flask, flask-cors**: `pip install flask flask-cors`  
  Eines per desenvolupar l’API:
  - `flask`: Micro-framework per crear APIs RESTful i petites aplicacions web.
  - `flask-cors`: Habilita el Cross-Origin Resource Sharing (CORS), necessari per permetre que altres aplicacions accedeixin a recursos d’aquesta API.

- **OpenAI**: `pip install OpenAI`  
  Biblioteca per interactuar amb les API d'OpenAI, incloent-hi el model GPT i altres eines d'aprenentatge automàtic desenvolupades per OpenAI.

- **PyMuPDF**: `pip install Flask PyMuPDF`  
  Biblioteca per treballar amb documents PDF. Permet llegir, editar i extreure text o altres elements dels arxius PDF, útil per a aplicacions que requereixen processament de documents.

---

Aquestes eines són essencials per oferir funcionalitats avançades en el projecte, com ara la traducció de textos, la simplificació de llenguatge, la generació de resums, i la manipulació de PDFs.

# Backend (python)
Per al backend, hem utilitzat Python per la seva potència en el processament de llenguatge natural i la seva capacitat d'integrar models d'intel·ligència artificial. Python facilita la creació d'APIs lleugeres amb Flask i la gestió de tasques com la traducció, simplificació i resum de textos. A més, és fàcil de desplegar i escalable, amb una gran comunitat i suport.

A continuació, t'explico com hem usat cadascuna de les instal·lacions dins de les funcions dels arxius de codi que has proporcionat, explicant també la funció de cada mòdul:

### **`app.py`**: API principal del projecte
Aquest fitxer defineix l'API, implementada amb Flask, que proporciona diferents endpoints per realitzar traduccions, simplificació de text, resums i extracció de text de PDFs.

1. **Instal·lacions usades**:
   - **`flask` i `flask-cors`**: Flask s'utilitza per crear els endpoints de l'API. Flask-CORS permet que aquesta API pugui ser cridada des de diferents orígens.
   - **`fitz` (PyMuPDF)**: Aquesta biblioteca permet obrir i extreure text de PDFs.

2. **Funcions del fitxer**:
   - **`translateTextApi`**: Endpoint per traduir text, que crida la funció `translate_text` de `salamandra.py` amb els paràmetres de codi de llengua d'origen, llengua objectiu i la frase.
   - **`simplifyTextApi`**: Endpoint per simplificar text; crida `simplifyText` de `salamandra.py`.
   - **`resumerTextApi`**: Endpoint per resumir text, utilitzant la funció `resumeText` de `salamandra.py`.
   - **`extract_text_from_pdf`**: Endpoint per extreure text d'un arxiu PDF, usant `fitz` per accedir a cada pàgina del document i recollir tot el text, retornant-lo en format JSON.

### **`pdf.py`**: Mòdul per generar, traduir i llegir PDFs
Aquest fitxer se centra en l'extracció de text d'un PDF, traducció i creació d'un nou PDF amb el text traduït.

1. **Instal·lacions usades**:
   - **`fitz` (PyMuPDF)**: Per obrir i llegir el text d'un PDF.
   - **`transformers`** (concretament `MarianMTModel` i `MarianTokenizer`): Per realitzar la traducció del text en diversos idiomes.

2. **Funcions del fitxer**:
   - **`extract_text_from_pdf`**: Llegeix un fitxer PDF i retorna el text contingut.
   - **`translate_text`**: Tradueix el text des d'un idioma d'origen a un idioma objectiu usant un model de traducció Marian. Divideix el text en segments per processar-lo eficientment.
   - **`create_pdf_from_text`**: Crea un PDF traduït a partir del text traduït, mantenint el format original, mitjançant `fitz` per crear pàgines i afegir-hi text en les mateixes coordenades que l'original.

### **`resume.py`**: Mòdul per resumir text
Aquest fitxer defineix funcions per resumir textos en diferents idiomes.

1. **Instal·lacions usades**:
   - **`transformers`** (concretament `MBartForConditionalGeneration` i `MBart50TokenizerFast`): Utilitza el model `mBART` per generar resums de textos en diversos idiomes.

2. **Funcions del fitxer**:
   - **`resumir_text`**: Aquesta funció pren un text llarg i el divideix en fragments per resumir-lo més eficientment. Cada fragment es processa per separat i després es combinen tots els fragments resumits en un text final.

### **`salamandra.py`**: Mòdul de funcions principals de traducció, simplificació i resum
Aquest fitxer conté les funcions principals d'interacció amb altres serveis de traducció, simplificació i resum.

1. **Instal·lacions usades**:
   - **`dotenv`**: Carrega variables d'entorn des de `.env`, com el token de Hugging Face.
   - **`requests`**: S'utilitza per enviar peticions HTTP a l'API de Hugging Face per a la traducció.
   - **`transformers`**: Importa models i tokenitzadors per suportar funcions de traducció, simplificació i resum.
   
2. **Funcions del fitxer**:
   - **`translate_text`**: Traducció de text usant l'API de Hugging Face. Afegeix codis d'idioma per dirigir la traducció i estableix paràmetres per a la generació del text traduït.
   - **`simplifyText`**: Simplifica un text, utilitzant la funció `simplify` de `simplify.py`. Traducció prèvia del text a l'anglès (si no ho està), per assegurar una simplificació òptima, i després el tradueix de nou a l'idioma de destinació.
   - **`resumeText`**: Traducció del text d'entrada a l'espanyol per poder ser processat pel model de resum, aplicant `resumir_text` i traduint després el resultat a l'idioma objectiu.

### **`simplify.py`**: Mòdul per simplificar textos de llenguatge jurídic
Aquest fitxer conté una funció per transformar textos de llenguatge complex a llenguatge més simple.

1. **Instal·lacions usades**:
   - **`transformers`** (concretament `T5ForConditionalGeneration` i `T5Tokenizer`): Utilitza el model T5 per simplificar el text a un format més accessible.

2. **Funcions del fitxer**:
   - **`simplify`**: Pren un text en llenguatge jurídic o formal i l’envia al model T5 per simplificar-lo. Aquesta funció és usada dins `salamandra.py` per transformar textos en idiomes difícils d'entendre a una forma més senzilla.

# Frontend (Angular)

Aquest projecte implementa una aplicació frontend en Angular per a traduir, simplificar i resumir textos, tant en format de text directe com en format PDF. Utilitzem Angular per la seva estructura modular i escalable, permetent la gestió d'estats i formularis reactius de forma eficaç, així com la comunicació amb serveis de back-end.

## Estructura de l'Aplicació

L'aplicació es compon de dos mòduls principals:
- **Traducció de Text**
- **Traducció de PDF**

En ambdós mòduls, l'usuari pot seleccionar la funcionalitat desitjada entre:
   - **Traduir:** Traducció completa del text.
   - **Simplificar:** Proporciona una versió simplificada del text.
   - **Resumir:** Genera un resum del text d’entrada.

Cada mòdul compta amb un component independent i serveis dedicats per comunicar-se amb l'API de back-end.

## Components Principals

### 1. Traductor de Text (`TraductorTextComponent`)

Aquest component proporciona una interfície on l'usuari pot:
- Escriure el text que vol processar.
- Seleccionar l'idioma d’origen i destí.
- Seleccionar la funcionalitat desitjada: traduir, simplificar o resumir.

#### Estructura del Component (HTML)
   - Conté un formulari reactiu amb camps per al text, selecció d'idiomes, tipus de funcionalitat i botó de traducció.
   - Inclou una funció de canvi ràpid (swap) per intercanviar els idiomes d’origen i destí amb un sol clic.

#### Lògica del Component (TypeScript)
   - `onSrcLanguageChange`, `onTgtLanguageChange`, i `onFunChange` detecten canvis en els idiomes i la funcionalitat seleccionats.
   - El mètode `guardar` valida el formulari i, segons la funcionalitat seleccionada, invoca el servei corresponent (`translateText`, `simplifyText` o `resumeText`) per processar el text.
   - El resultat s’actualitza al camp `translatedText` un cop rebut de l'API.

### 2. Traductor de PDF (`TraductorDocComponent`)

Aquest component permet a l'usuari seleccionar un fitxer PDF per processar-lo de la mateixa manera que en el traductor de text.

#### Estructura del Component (HTML)
   - Conté camps per pujar un fitxer PDF, així com la selecció d’idiomes i funcionalitat.
   
#### Lògica del Component (TypeScript)
   - `onFileSelected` emmagatzema el fitxer seleccionat.
   - En clicar a “Tradueix”, `uploadPdf` envia el PDF a l'API del back-end per extreure el text. Posteriorment, el text extret es processa mitjançant el servei de traducció, simplificació o resum.

## Serveis (Services) de Comunicació amb el Back-End

Els serveis proporcionen una interfície clara per als components i faciliten la comunicació amb l'API de back-end.

### 1. `TranslateService`
   Aquest servei ofereix mètodes per a les tres funcionalitats:
   - **`translateText`**: Envia una sol·licitud a l'API per traduir el text d'entrada en els idiomes seleccionats.
   - **`simplifyText`**: Proporciona una versió simplificada del text.
   - **`resumeText`**: Genera un resum del text.

Cada mètode crea una petició `POST` amb el cos necessari (`src_lang_code`, `tgt_lang_code`, `sentence`) i retorna un `Observable` amb la resposta de l'API.

### 2. `PdfService`
   Aquest servei inclou el mètode `uploadPdf`, que envia un fitxer PDF a l'API de back-end i n'extreu el text, retornant-lo en format de text que es pot processar. El PDF s’envia en format `FormData` per assegurar una correcta transmissió del fitxer.

## Instal·lació i Execució

1. **Instal·lació de dependències**
   ```bash
   npm install

