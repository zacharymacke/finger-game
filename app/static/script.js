
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

init();
