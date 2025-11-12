# model/predictor.py

def predict_function(input_data: str):
    """
    Simple demo prediction function.
    Replace this with your real ML model inference later.
    """
    if not isinstance(input_data, str) or not input_data.strip():
        return "Error: Input cannot be empty."

    text = input_data.strip().lower()
    if "price" in text or "cost" in text or "rate" in text:
        return "Predicted Category: Pricing AI"
    elif "image" in text or "photo" in text or "img" in text:
        return "Predicted Category: Vision Model"
    elif "text" in text or "description" in text:
        return "Predicted Category: NLU/Text Model"
    else:
        return f"Generic Prediction for input: {input_data}"
