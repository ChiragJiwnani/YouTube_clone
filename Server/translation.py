from flask import Flask, request, jsonify
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

app = Flask(__name__)

# Load model and tokenizer once when the server starts
model = M2M100ForConditionalGeneration.from_pretrained("facebook/m2m100_418M")
tokenizer = M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text', '')
    source_lang = data.get('source_lang', 'hi')  # Default to Hindi if not provided
    target_lang = data.get('target_lang', 'en')  # Default to English if not provided

    tokenizer.src_lang = source_lang
    encoded_text = tokenizer(text, return_tensors="pt")
    generated_tokens = model.generate(**encoded_text, forced_bos_token_id=tokenizer.get_lang_id(target_lang))
    
    translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
    return jsonify({"translated_text": translated_text})

if __name__ == '__main__':
    app.run(debug=True)
