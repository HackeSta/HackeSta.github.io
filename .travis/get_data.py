import urllib3.request, urllib.request
import requests as req
import os
import json

def get_foss():
    url = "https://api.github.com/orgs/hackesta/repos"
    response = req.get(url, auth=(os.environ.get('GITHUB_USERNAME'), os.environ.get('GH_TOKEN')))
    data = json.loads(response.text)
    fossdata = {
        'repo_count':0,
        'stargazer_count':0,
        'fork_count':0
    }
    for repo in data:
        fossdata['repo_count'] += 1
        fossdata['stargazer_count'] += repo['stargazers_count']
        fossdata['fork_count'] += repo['forks_count']
    json.dump(fossdata, fp=open("data/fossdata.json", "w"))

get_foss()
