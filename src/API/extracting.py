from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import json
import re
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
    result: list

def formatting(keyword):
    return '+'.join(keyword.split())

def getResearch(keyword):
    index = 0
    custom = "https://shodhganga.inflibnet.ac.in/handle/"
    new = formatting(keyword)
    URL = "https://shodhganga.inflibnet.ac.in/browse?type=title&sort_by=1&order=ASC&rpp=50&etal=-1&starts_with=" + new
    r = requests.get(URL) 
    soup = BeautifulSoup(r.content, 'html5lib')
    quotes = []
    table = soup.find('table', attrs={'class': 'table'})  
    if table:
        for tr_tag in table.find_all('tr'):
            td_tags = tr_tag.find_all('td')
            if len(td_tags) == 4:
                quote = [
                    index, 
                    td_tags[0].get_text(strip=True), 
                    td_tags[1].get_text(strip=True), 
                    td_tags[1].a['href'], td_tags[2].get_text(strip=True)
                ]
                quote[3] = custom + re.search(r'(?:[^/]+/){2}(.+)', quote[3]).group(1)
                quotes.append(quote)
                index += 1
    return quotes

@app.post("/api/getResearch", response_model=ResponseModel)
async def get_research(request: RequestModel):
    result = getResearch(request.data)
    return ResponseModel(result=result)

def getDetails(URL):
    r = requests.get(URL) 
soup = BeautifulSoup(r.content, 'html5lib')

quotes=[]
files = []
table = soup.find('table', attrs = {'class':'table itemDisplayTable'})  
if table:
    td_tags = table.find_all('td', attrs = {'class':'metadataFieldValue'})
    quote = {}
    quote['title'] = td_tags[0].get_text(strip=True)
    quote['researcher'] = td_tags[1].get_text(strip=True)
    quote['guides'] = td_tags[2].get_text(strip=True)
    quote['university'] = td_tags[4].get_text(strip=True)
    quote['completion date'] = td_tags[5].get_text(strip=True)
    quote['dept'] = table.find_all('tr')[-1].find_all('td')[-1].get_text(strip=True)
    quotes.append(quote)
    print(quote)

def getFiles(URL):
    index = 0
    r = requests.get(URL)
    soup = BeautifulSoup(r.content, 'html.parser')
    files = []
    table = soup.find('table', class_='table panel-body')
    if table:
        for tr_tag in table.find_all('tr'):
            td_tags = tr_tag.find_all('td', class_='standard')
            if td_tags:
                try:
                    title = td_tags[0].get_text(strip=True)
                    size = td_tags[2].get_text(strip=True)
                    link = td_tags[0].find('a')['href']
                    
                    file = [
                        index,
                        td_tags[0].get_text(strip=True),
                        td_tags[2].get_text(strip=True),
                        td_tags[0].find('a')['href']
                    ]
                    file[3] = "https://shodhganga.inflibnet.ac.in/bitstream/" + re.search(r'(?:[^/]+/){2}(.+)', file[3]).group(1)
                    files.append(file)
                    index += 1
                except Exception as e:
                    print(f"Error extracting data: {e}")
    return files

@app.post("/api/getFiles", response_model=ResponseModel)
async def get_research(request: RequestModel):
    files = getResearch(request.data)
    return ResponseModel(result=files)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)