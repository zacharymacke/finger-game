
const video = document.querySelector('video');
var videoTracks2;
var picture;
var counter = 0;
var takePic;
var r;

const constraints = window.constraints = {
	audio: false,
	video: true
};



function handleSuccess(stream){
	videoTracks = stream.getVideoTracks();
	videoTracks2 = stream.getVideoTracks()[0];
	window.stream = stream;
	video.srcObject = stream;
};

async function init(){
	try{
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		handleSuccess(stream);
	} catch (error){
		console.log(error);
	}
}

function sendPhoto(){

		counter++;
		picture.takePhoto();		
		
		var request = new XMLHttpRequest();
		request.open("POST", "http://localhost:5000/image", true);
		request.onload = function (oEvent){
			console.log("uploaded");
		};

		var blob = new Blob(['photo'])
		request.send(blob);
		
		request.onreadystatechange = () => {
			if(request.readyState === 4 && request.status === 200){
				console.log(request.responseText);								
				var fNum = JSON.parse(request.responseText).fingerNumber;
				console.log(fNum);
				if(fNum === r){
					generateRandom();	
				}
				
			}
				}
				if(counter === 15){
					clearInterval(takePic);
					counter = 0;
				}

};

function generateRandom(){
	r = Math.floor(Math.random() * 6);
	document.getElementById("number").innerHTML = r;

}

function startGame(){
	generateRandom();

	picture = new ImageCapture(videoTracks2);
	takePic = setInterval(sendPhoto, 2000)
};


init();

var el = document.getElementById("go");
el.addEventListener("click", startGame)
