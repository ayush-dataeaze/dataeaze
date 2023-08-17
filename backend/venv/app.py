from flask import Flask, request, jsonify

app = Flask(__name__)

def initialize_custom_model():
    print("Please wait while I load onto your GPU memory...")
    model_id = 'meta-llama/Llama-2-7b-chat-hf'
    token = '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'
    
    model_config = transformers.AutoConfig.from_pretrained(
        model_id,
        use_auth_token=token
    )
    
    bnb_config = transformers.BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type='nf4',
        bnb_4bit_use_double_quant=True,
        bnb_4bit_compute_dtype=bfloat16
    )
    
    model = transformers.AutoModelForCausalLM.from_pretrained(
        model_id,
        trust_remote_code=True,
        config=model_config,
        device_map='auto',
        quantization_config=bnb_config,
        use_auth_token=token
    )
    
    tokenizer = transformers.AutoTokenizer.from_pretrained(
        model_id,
        use_auth_token=token
    )
    
    print("Model loaded onto your GPU memory")
    return model, tokenizer

# Initialize the model and tokenizer only once
model, tokenizer = initialize_custom_model()
pipe = transformers.pipeline(
    model=model,
    tokenizer=tokenizer,
    task='text-generation',
    return_full_text=True,
    temperature=0.0,
    max_new_tokens=512,
    repetition_penalty=1.1
)

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json['user_input']

    # Generate assistant's response using the custom model and pipeline
    assistant_response = generate_response(user_input)

    return jsonify({'response': assistant_response})

def generate_response(user_input):
    response = pipe(user_input)[0]['generated_text']
    return response

if __name__ == '__main__':
    app.run(debug=True)
