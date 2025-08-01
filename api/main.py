import json
from fastapi import FastAPI
from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "https://healthguardproject.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the .env file
load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=OPENAI_KEY)

class SymptomRequest(BaseModel):
    symptoms: str
    language: str

class EmotionRequest(BaseModel):
    emotions: str
    language: str

@app.options("/analyze-symptoms")
async def options_analyze_symptoms():
    return Response(status_code=200)

@app.options("/analyze-emotions")
async def options_analyze_emotions():
    return Response(status_code=200)

@app.post("/analyze-symptoms")
async def analyze_symptoms(request: SymptomRequest):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        
        messages=[
            {
                "role": "system",
                "content": """
                You are a helpful medical assistant. Based on the user's language preference (English or Spanish), respond in that language.

                Return output as a valid JSON object with these keys:
                - "conditions": list of possible conditions
                - "homeCare": list of home care tips
                - "seekHelp": guidance on when to get medical help

                Only return the JSON object, with no extra text.

                If the user’s input language is Spanish, reply entirely in Spanish using the same JSON structure.
                If the user’s input language is English, reply in English.
                """
            },
            {"role": "user", "content": f"Given these symptoms, return the JSON: {request.symptoms}. User's speaking language code is: {request.language}"}
        ]
    )

    gpt_output = response.choices[0].message.content

    # Parse LLM response into dict
    try:
        data = json.loads(gpt_output)
        return data
    except json.JSONDecodeError:
        return {
            "error": "Could not parse GPT output as JSON",
            "raw_output": gpt_output
        }

@app.post("/analyze-emotions")
async def analyze_emotions(request: EmotionRequest):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        
        messages=[
            {"role": "system", "content": """You are a helpful therapist. Based on the user's language preference (English or Spanish), respond in that language. Return output as a valid JSON object with:
- "primaryEmotion": primary emotion user most likely is feeling
- "confidence": how confident are you in your assessment of what the user is feeling (as a whole number from 0 to 100)
- "insights": give insights on how user is feeling and support them if needed
- copingTips: list of tips for user to cope with what they are feeling right now,
        color: represents user emotions, like green is for happy, blue is for sad, stress is orange, purple is anxiety, etc.
        icon: emoji representing what the user is feeling
Only return the JSON object, no extra text."""},
            {"role": "user", "content": f"Given what the user listed, return the JSON: {request.emotions}. Language code is: User's speaking language code is: {request.language}"}
        ]
    )

    gpt_output = response.choices[0].message.content

    try:
        data = json.loads(gpt_output)
        return data
    except json.JSONDecodeError:
        return {
            "error": "Could not parse GPT output as JSON",
            "raw_output": gpt_output
        }
# --- Optional GET route ---
@app.get("/")
async def root():
    return {"message": "Hello World"}