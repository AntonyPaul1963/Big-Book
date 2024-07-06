import requests 
from bs4 import BeautifulSoup 
import json
import re

def formatting(keyword):
    new = ''
    for i in keyword:
        if i == ' ':
            new += '+'
        else:
            new += i
    return new
        

def getResearch(keyword):
    new = formatting(keyword)
    URL = "https://shodhganga.inflibnet.ac.in/browse?type=title&sort_by=1&order=ASC&rpp=20&etal=-1&starts_with=" + new
    r = requests.get(URL) 
    soup = BeautifulSoup(r.content, 'html5lib')
    quotes=[]
    table = soup.find('table', attrs = {'class':'table'})  
    if table:
        for tr_tag in table.find_all('tr'):
            td_tags = tr_tag.find_all('td')
            if len(td_tags) == 4:
                quote = {}
                quote['upload'] = td_tags[0].get_text(strip=True)
                quote['txt'] = td_tags[1].get_text(strip=True)
                quote['url'] = td_tags[1].a['href']
                quote['author'] = td_tags[2].get_text(strip=True)
                quotes.append(quote)
    print(quotes)
    filename = 'links.json'
    try:
        with open(filename, 'w') as json_file:
            json.dump(quotes, json_file, indent=1)
        print(f"Data successfully written to {filename}")
    except Exception as e:
        print(f"Error occurred while writing to {filename}: {e}")



getResearch('data mining')