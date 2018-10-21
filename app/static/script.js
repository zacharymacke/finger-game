const video = document.querySelector('video');
const reader = new FileReader();
var webcam;
var takePhotos;
var randomNum;
var counter = 0;

const constraints = window.constraints = {
  audio: false,
  video: true
};

function sendPhoto() {
  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:5000/image", true);
  request.onload = () => console.log("Uploaded")

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
      let fingerNumber = JSON.parse(request.responseText).fingerNumber;
      if (fingerNumber === randomNum) {
        generateRandom();
      }
    }
  }

  webcam.takePhoto().then(blob => {
    // Convert the image blob to Base64
    reader.readAsDataURL(blob);
    reader.onloadend = () => request.send(reader.result)
  });

  counter++;

  if (counter === 15) {
    // Stop taking/sending photos
    clearInterval(takePhotos);
    counter = 0;
  }
}

function generateRandom() {
  randomNum = Math.floor(Math.random() * 6);
  document.getElementById("number").innerHTML = randomNum;
}

function startGame() {
  generateRandom();
  webcam = new ImageCapture(videoTracks[0]);
  // Take and send photo every 2 seconds
  takePhotos = setInterval(sendPhoto, 2000);
}

function handleSuccess(stream) {
  videoTracks = stream.getVideoTracks();
  window.stream = stream;
  // Display the webcam feed on the page
  video.srcObject = stream;
  document.getElementById("go").addEventListener("click", startGame);
}

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (error) {
    console.log(error);
  }
}

init();
