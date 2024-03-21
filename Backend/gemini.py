import google.generativeai as genai
from data import file
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))

# Set up the model
generation_config = {
  "temperature": 0.6,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["provided `input: $` is a Symptom to a medical condition return an array in new line containing fields = [Ayurvedic Medicine Name(more than 1), Dosage, Home Remedies or life style changes] where each field is a string\" exampleinput: Joint Pain[\"Ashwagandha, Boswellia, Curcumin, Ginger\", \"500mg of each herb, twice daily\", \"Regular exercise, warm baths, massage with sesame oil\"] the output should be array of string in format [Ayurvedic Medicine Name(more than 1), Dosage, Home Remedies or life style changes] your new input is Bladder Infection"]
  },
  {
    "role": "model",
    "parts": ["[\"Chandraprabha Vati, Gokshuradi Guggulu, Punarnavadi Mandoor\", \"Chandraprabha Vati: 1-2 tablets twice daily, Gokshuradi Guggulu: 1-2 tablets twice daily, Punarnavadi Mandoor: 1-2 tablets twice daily\", \"Drink plenty of fluids, especially water and cranberry juice. Avoid caffeine and alcohol. Eat a healthy diet that is high in fruits, vegetables, and whole grains. Get regular exercise. Practice good hygiene, including washing your hands frequently and urinating after sex. Avoid using harsh soaps or feminine hygiene products. Wear cotton underwear and loose clothing. Take sitz baths in warm water several times a day.\"]"]
  },
  {
    "role": "user",
    "parts": ["Ear Infection"]
  },
  {
    "role": "model",
    "parts": ["[\"Garlic Oil, Mullein Oil, Tea Tree Oil\", \"Garlic Oil: 2-3 drops in the affected ear, twice daily. Mullein Oil: 2-3 drops in the affected ear, twice daily. Tea Tree Oil: 2-3 drops in the affected ear, twice daily.\", \"Keep the ear clean and dry. Avoid swimming or getting water in the ear. Use a warm compress to relieve pain. Take over-the-counter pain relievers, such as ibuprofen or acetaminophen. Get plenty of rest.\"]"]
  },
  {
    "role": "user",
    "parts": ["Cold"]
  },
  {
    "role": "model",
    "parts": ["[\"Honey, Garlic, Hot Liquid\", \"Honey: 1-2 teaspoons in a cup of hot water, several times a day. Garlic: Crush a garlic clove and mix it with coconut oil. Apply the mixture to the soles of your feet before bedtime. Hot Liquid: Drink hot liquids, such as tea, soup, or hot water, throughout the day.\", \"Get plenty of rest. Wash your hands frequently. Avoid touching your face. Cover your mouth and nose when coughing or sneezing. Use a humidifier or saline nasal spray to keep your nasal passages moist. Gargle with salt water several times a day.\"]"]
  },
])

import ast
def predict(input):
    if input in file.keys():
        return file[input]
    
    convo.send_message(input)
    l = ast.literal_eval(convo.last.text)
    file[input] = l
    return file[input]
