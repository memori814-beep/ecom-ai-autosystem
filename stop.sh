def predict_function(input_data: str):
    """
    Dummy AI function — later we’ll connect it to real ML model.
    """
    if not input_data.strip():
        return "Error: Input cannot be empty."
    if "price" in input_data.lower():
        return "Predicted Category: Pricing AI"
    elif "image" in input_data.lower():
        return "Predicted Category: Vision Model"
    else:
        return f"Generic Prediction for input: {input_data}"
