import requests
from bs4 import BeautifulSoup
import json
import re

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
    print(files)
    return files

getFiles("https://shodhganga.inflibnet.ac.in/handle/10603/434179")


    
