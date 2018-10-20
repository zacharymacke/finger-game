
const video = document.querySelector('video');

const constraints = window.constraints = {
	audio: false,
	video: true
};



function handleSuccess(stream){
	const videoTracks = stream.getVideoTracks();
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

function startGame(){
				const r = Math.floor(Math.random() * 6);
				console.log(r);
};

init();

var el = document.getElementById("go");
el.addEventListener("click", startGame)
