from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import json
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
    result: str  # Changed to str to match the JSON string

def formatting(keyword):
    return '+'.join(keyword.split())

def getResearch(keyword):
    new = formatting(keyword)
    URL = "https://shodhganga.inflibnet.ac.in/browse?type=title&sort_by=1&order=ASC&rpp=20&etal=-1&starts_with=" + new
    r = requests.get(URL) 
    soup = BeautifulSoup(r.content, 'html5lib')
    quotes = []
    table = soup.find('table', attrs={'class': 'table'})  
    if table:
        for tr_tag in table.find_all('tr'):
            td_tags = tr_tag.find_all('td')
            if len(td_tags) == 4:
                quote = {
                    'upload': td_tags[0].get_text(strip=True),
                    'txt': td_tags[1].get_text(strip=True),
                    'url': td_tags[1].a['href'],
                    'author': td_tags[2].get_text(strip=True)
                }
                quotes.append(quote)
    return json.dumps(quotes)  # Return the JSON string

@app.post("/api/getResearch", response_model=ResponseModel)
async def get_research(request: RequestModel):
    result = getResearch(request.data)
    return ResponseModel(result=result)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
