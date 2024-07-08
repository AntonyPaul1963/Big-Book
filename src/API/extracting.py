from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from typing import List
import logging
import requests
from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
import fitz 
import io

app = FastAPI()
model = genai.GenerativeModel("gemini-pro")
GOOGLE_API_KEY = "AIzaSyCYnTLZcsiRAWlvuua4DOEMaQHWMNJKICY"
genai.configure(api_key=GOOGLE_API_KEY)
chat = model.start_chat(history=[])

origins = [
    "http://localhost:3000",  # React dev server
    "http://localhost:5173",  # Vite dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestModel(BaseModel):
    data: str

class ResponseModel(BaseModel):
    result: List

class SeleniumRequest(BaseModel):
    url: str
    script: str

class StringResponse(BaseModel):
    result: str


logging.basicConfig(level=logging.INFO)

def formatting(keyword: str) -> str:
    return '+'.join(keyword.split())

def getResearch(keyword: str) -> List:
    index = 0
    custom = "https://shodhganga.inflibnet.ac.in/handle/"
    new = formatting(keyword)
    URL = "https://shodhganga.inflibnet.ac.in/browse?type=title&sort_by=1&order=ASC&rpp=50&etal=-1&starts_with=" + new
    try:
        r = requests.get(URL)
        r.raise_for_status()
    except requests.RequestException as e:
        logging.error(f"RequestException while fetching research: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    soup = BeautifulSoup(r.content, 'html5lib')
    quotes = []
    table = soup.find('table', attrs={'class': 'table'})
    if table:
        for tr_tag in table.find_all('tr'):
            td_tags = tr_tag.find_all('td')
            if len(td_tags) == 4:
                try:
                    quote = [
                        index,
                        td_tags[0].get_text(strip=True),
                        td_tags[1].get_text(strip=True),
                        custom + re.search(r'(?:[^/]+/){2}(.+)', td_tags[1].a['href']).group(1),
                        td_tags[2].get_text(strip=True)
                    ]
                    quotes.append(quote)
                    index += 1
                except Exception as e:
                    logging.error(f"Error processing table row: {e}")
    return quotes

@app.post("/api/getResearch", response_model=ResponseModel)
async def get_research(request: RequestModel):
    try:
        result = getResearch(request.data)
        return ResponseModel(result=result)
    except Exception as e:
        logging.error(f"Error in get_research endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def getDetails(URL: str) -> List:
    try:
        r = requests.get(URL)
        r.raise_for_status()
    except requests.RequestException as e:
        logging.error(f"RequestException while fetching details: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    soup = BeautifulSoup(r.content, 'html5lib')
    table = soup.find('table', attrs={'class': 'table itemDisplayTable'})
    details = []
    if table:
        td_tags = table.find_all('td', attrs={'class': 'metadataFieldValue'})
        if len(td_tags) >= 5:
            try:
                details = [
                    td_tags[0].get_text(strip=True),
                    td_tags[1].get_text(strip=True),
                    td_tags[2].get_text(strip=True),
                    td_tags[4].get_text(strip=True),
                    table.find_all('tr')[-1].find_all('td')[-1].get_text(strip=True)
                ]
            except Exception as e:
                logging.error(f"Error extracting details from table: {e}")
                raise HTTPException(status_code=500, detail=str(e))
    return details

@app.post("/api/getDetails", response_model=ResponseModel)
async def get_details(request: RequestModel):
    try:
        details = getDetails(request.data)
        return ResponseModel(result=details)
    except Exception as e:
        logging.error(f"Error in get_details endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def getFiles(URL: str) -> List:
    index = 0
    try:
        r = requests.get(URL)
        r.raise_for_status()
    except requests.RequestException as e:
        logging.error(f"RequestException while fetching files: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    soup = BeautifulSoup(r.content, 'html.parser')
    files = []
    table = soup.find('table', class_='table panel-body')
    if table:
        for tr_tag in table.find_all('tr'):
            td_tags = tr_tag.find_all('td', class_='standard')
            if td_tags:
                try:
                    file = [
                        index,
                        td_tags[0].get_text(strip=True),
                        td_tags[2].get_text(strip=True),
                        "https://shodhganga.inflibnet.ac.in/bitstream/" + re.search(r'(?:[^/]+/){2}(.+)', td_tags[0].find('a')['href']).group(1)
                    ]
                    files.append(file)
                    index += 1
                except Exception as e:
                    logging.error(f"Error extracting file data from table row: {e}")
    return files

@app.post("/api/getFiles", response_model=ResponseModel)
async def get_files(request: RequestModel):
    try:
        files = getFiles(request.data)
        return ResponseModel(result=files)
    except Exception as e:
        logging.error(f"Error in get_files endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/runSelenium")
async def run_selenium(request: SeleniumRequest):
    driver = webdriver.Chrome()

    try:
        driver.get(request.url)
        driver.execute_script(request.script)
        time.sleep(40)

        return {"message": "Script executed successfully"}

    except Exception as e:
        logging.error(f"Error executing Selenium script: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        driver.quit()

def get_gemini_response(text: str) -> str:
    try:
        response = chat.send_message(text)
        return response.text
    except Exception as e:
        print(f"Error getting Gemini response: {e}")
        raise HTTPException(status_code=500, detail="Error getting Gemini response")

def extract_text_from_pdf(pdf_file: UploadFile) -> str:
    try:
        doc = fitz.open(stream=pdf_file.file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        raise HTTPException(status_code=500, detail="Error extracting text from PDF")

@app.post("/api/getPdfSummary", response_model=StringResponse)
async def api_get_pdf_summary(file: UploadFile = File(...)):
    try:
        pdf_text = extract_text_from_pdf(file)
        summary = get_gemini_response(pdf_text)
        return StringResponse(result=summary)
    except Exception as e:
        print(f"Error in /api/getPdfSummary: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

