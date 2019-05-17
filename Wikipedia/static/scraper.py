from bs4 import BeautifulSoup
import re
from urllib.request import urlopen
import networkx as nx
import json

names = []

def clearArrs():
    global names
    names = []
    with open('static/graph.json') as f:
        data = json.load(f)
    data['kanter'] = []
    data['noder'] = []
    with open('static/graph.json', 'w') as f:
        json.dump(data, f)

def scrape(name, depth):
    clearArrs()
    print (names)
    links = ["https://en.wikipedia.org/wiki/"+name]
    connections = []
    if name not in names:
        names.append(name)
    #depth = 1

    for i in range(0, int(depth)):
        temp = []
        n = len(links)
        for i in range(0, n):
            page = links[0]
            print ("Page: "+page)
            soup = BeautifulSoup(urlopen(page))
            for para in soup.findAll('p'):
                for link in para.findAll('a', attrs={'href': re.compile("^/wiki/")}):
                    if (len(temp) > 3*(i+1)):
                        break
                    temp.append('https://en.wikipedia.org'+link.get('href'))
                    connections.append((page.replace('https://en.wikipedia.org/wiki/', ''), ('https://en.wikipedia.org'+link.get('href')).replace('https://en.wikipedia.org/wiki/', '')))
                    n = (('https://en.wikipedia.org'+link.get('href')).replace('https://en.wikipedia.org/wiki/', ''))
                    if n not in names:
                        names.append(n)
                else:
                    continue
                break
            links.remove(page)
            #print (temp, len(temp))
        for wiki in temp:
            links.append(wiki)
        #print(links, len(links))
    with open('static/graph.json') as f:
        data = json.load(f)

    for i in range(0, len(connections)):
        data['kanter'].append([connections[i][0], connections[i][1]])

    data['noder'] = []
    for i in range(0, len(names)):
        data['noder'].append(names[i])

    with open('static/graph.json', 'w') as f:
        json.dump(data, f)
clearArrs()
