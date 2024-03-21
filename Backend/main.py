from fastapi import FastAPI
import ast
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from gemini import predict
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Ayurvedic(BaseModel):
    Symptoms: str


@app.get("/")
async def main():
    return HTMLResponse("<h1>Welcome to Ayurmedic</h1>")

@app.post("/")
async def root(item: Ayurvedic):
    l = predict(item.Symptoms)
    ans={
        "MedicineName": l[0],
        "CommonlyUsedforDiseases": item.Symptoms,
        "HomeRemedies": l[2],
        "Dosage": l[1],
        }
    return ans
