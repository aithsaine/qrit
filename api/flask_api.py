from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import logging

# Setup logging
logging.basicConfig(level=logging.ERROR)

# Load model and data
MODEL_FILE = 'nutrition_recommendation_model.pkl'
DATA_FILE = 'labeled_nutrition.csv'

model = joblib.load(MODEL_FILE)
df = pd.read_csv(DATA_FILE)

# Features used in the model
FEATURES = ['Caloric Value', 'Fat', 'Carbohydrates', 'Sugars', 'Protein', 'Sodium']

# Predict once at startup 🔥
try:
    X = df[FEATURES]
    y_pred = model.predict(X)
    prediction_df = pd.DataFrame(y_pred, columns=['good_for_diabetes', 'good_for_hypertension', 'good_for_obesity'])
    result_df = pd.concat([df['food'], prediction_df], axis=1)
except Exception as e:
    logging.error(f"Error preparing predictions at startup: {str(e)}")
    result_df = None

# Flask app
app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        if result_df is None:
            return jsonify({'error': 'Server initialization failed. Try again later.'}), 500

        data = request.get_json()

        # Validate JSON structure
        if not data or 'health_condition' not in data:
            return jsonify({'error': 'Missing health_condition field.'}), 400

        # Clean input
        health_condition = data.get('health_condition', '').strip().lower()

        if health_condition not in ['diabetes', 'hypertension', 'obesity']:
            return jsonify({'error': 'Invalid health condition. Please choose diabetes, hypertension, or obesity.'}), 400

        # Filter recommendations
        if health_condition == 'diabetes':
            recommended = result_df[result_df['good_for_diabetes'] == True]['food']
        elif health_condition == 'hypertension':
            recommended = result_df[result_df['good_for_hypertension'] == True]['food']
        else:  # obesity
            recommended = result_df[result_df['good_for_obesity'] == True]['food']

        return jsonify({
            'recommendations': recommended.head(5).tolist()
        })

    except Exception as e:
        logging.error(f"Error in /recommend: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/')
def index():
    return jsonify({'message': 'AI Food Recommendation API is running 🚀'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
