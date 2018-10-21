from flask import Flask
from flask import render_template
from flask import url_for
from flask import request
from flask import jsonify
from random import *
app = Flask(__name__)
@app.route('/')
def play():
    gameScript = url_for('static', filename='script.js')
    bulma = url_for('static', filename='bulma.min.css')
    customStyle = url_for('static', filename='style.css')
    return render_template('index.html', gameScript=gameScript, bulma=bulma, customStyle=customStyle)

@app.route('/image', methods=['POST'])
def processImage():
    #print(list(request.data))
    return jsonify(
            fingerNumber = randint(0,5)
            )




