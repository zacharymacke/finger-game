# used this guys yolo implementation and code
# https://github.com/ayooshkathuria/pytorch-yolo-v3

from flask import Flask
from flask import render_template
from flask import url_for
from flask import request
from flask import jsonify
from random import *
import re

from torch.autograd import Variable
from darknet import Darknet
import cv2 as cv
import numpy as np
import torch
from util import *

from  PIL  import  Image, ImageDraw
import PIL

from io import BytesIO
import base64

import numpy as np


app = Flask(__name__)
@app.route('/')
def play():
    gameScript = url_for('static', filename='script.js')
    bulma = url_for('static', filename='bulma.min.css')
    customStyle = url_for('static', filename='style.css')
    return render_template('index.html', gameScript=gameScript, bulma=bulma, customStyle=customStyle)


def clean_input(img):
    img = cv2.resize(img, (416,416)) 
    img_ =  img[:,:,::-1].transpose((2,0,1))
    img_ = img_[np.newaxis,:,:,:]/255.0
    img_ = torch.from_numpy(img_).float()
    img_ = Variable(img_)
    
    return img_

model = Darknet('a.cfg')
model.load_weights('a.weights')
model.eval()

@app.route('/image', methods=['POST'])
def processImage():
    #print(list(request.data))

    base_64 = re.sub('^data:image/.+;base64,', '', request.data.decode())
    image = Image.open(BytesIO(base64.b64decode(base_64)))

    open_cv_image = np.array(image) 
    # Convert RGB to BGR 
    open_cv_image = open_cv_image[:, :, ::-1].copy() 

    prediction = model(clean_input(open_cv_image), False)
    prediction = write_results(prediction, confidence=.6, num_classes=1, nms = True, nms_conf = .3)
    
    if isinstance(prediction, torch.Tensor):
        return jsonify(
                fingerNumber = len(prediction)
                )
    else:
        return jsonify(
            fingerNumber = 0
        )
