
const video = document.querySelector('video');
var videoTracks2;
var picture;
var counter = 0;
var takePic;

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
				if(counter === 30){
						clearInterval(takePic);
						counter = 0;
				}

};


function startGame(){
				const r = Math.floor(Math.random() * 6);
				document.getElementById("number").innerHTML = r;

				picture = new ImageCapture(videoTracks2);
				picture.onphoto = showImage;

				takePic = setInterval(sendPhoto, 1000)

};

function showImage(blobeven){
				document.getElementById("handNumber").src = URL.createObjectURL(blobeven.data);
};

init();

var el = document.getElementById("go");
el.addEventListener("click", startGame)
