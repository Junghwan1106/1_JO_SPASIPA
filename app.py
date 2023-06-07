import os

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)

client = MongoClient(os.environ.get('MongoDbUrl'))
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/movie", methods=["POST"])
def tube_post():
    url_receive = request.form['url_give']
    comment_receive = request.form['comment_give']
    star_receive = request.form['star_give']
    
    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive,headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    # 여기에 코딩을 해서 meta tag를 먼저 가져와보겠습니다.

    ogtitle= soup.select_one('meta[property="og:title"]')['content']
    ogimage= soup.select_one('meta[property="og:image"]')['content']
    ogdesc= soup.select_one('meta[property="og:description"]')['content']

    doc = {
        'title':ogtitle,
        'desc':ogdesc,
        'image':ogimage,
        # 'url':url_receive, 안 필요함
        'comment':comment_receive,
        'star': star_receive
    }
    db.movies.insert_one(doc)

    return jsonify({'msg':'저장 완료!'})

@app.route("/movie", methods=["GET"])
def movie_get():
    all_movies = list(db.movies.find({},{'_id':False}))
    return jsonify({'result': all_movies})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)