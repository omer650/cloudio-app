from fastapi import FastAPI
import os

app = FastAPI()

# נתיב האחסון המחובר (ה-PVC)
DATA_PATH = "/app/data"

@app.get("/")
def read_root():
    return {"message": "Cloudio Admin Interface - Private Access Only"}

@app.get("/files")
def list_files():
    # פונקציה שתציג בעתיד את רשימת התיקיות שיצרנו
    if not os.path.exists(DATA_PATH):
        return {"error": "Storage not found"}
    return {"folders": os.listdir(DATA_PATH)}
