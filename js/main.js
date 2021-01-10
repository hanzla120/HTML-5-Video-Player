// get all values of variables
const player = document.querySelector('.player');
const video = document.querySelector(".video");
const seekBar = document.querySelector(".progress-range");
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeBar = document.querySelector('.volume-bar');
const volumeRange = document.querySelector('.volume-range');
const speed = document.querySelector('.player-speed');
const speedText = document.querySelector('.speedText');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const fullScreenIcon = document.querySelector('#fullscreen_icon');
const controls_container = document.querySelector('.controls-container');
// all functions 

(function() {
    let mouseTimer = null, cursorVisible = true;

    function disappearCursor() {
        mouseTimer = null;
        video.style.cursor = "none";
        cursorVisible = false;
    }

    video.onmousemove = function() {
        if (mouseTimer) {
            window.clearTimeout(mouseTimer);
        }
        if (!cursorVisible) {
            video.style.cursor = "default";
            cursorVisible = true;
        }
        mouseTimer = window.setTimeout(disappearCursor, 5000);
    };
})();





function playPauseVideo(){ // play and pause function
	
	palyed = false;
	if(video.paused){
		
		video.play();
		playBtn.classList = "fas fa-pause";
		
		controls_container.classList.remove("add_opacity");
	
	}else{
		video.pause();
		playBtn.classList = "fas fa-play";
		controls_container.classList.add("add_opacity");
		
		
		
	}
} // end function

function showPlayIcon() { // show play button when video ended.
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}



function seekBarMouseEnterFunc(){ // mouseenter function
	const cssTemplateString = `
	.progress-range::-webkit-slider-thumb{
	  background-color:var(--primary-color); 
	  width:17px;
	  height:17px;
	 
	}
	.progress-range{
		height:5px;
	}
  `;

	const styleTag = document.createElement("style");
styleTag.innerHTML = cssTemplateString;
styleTag.id = "custom_style";
document.head.insertAdjacentElement('beforeend', styleTag);
	
}// end function

function seekBarMouseLeaveFunc(){ // mouseleave function
	const removeStyleTag = document.getElementById("custom_style");
  removeStyleTag.remove();
	
}

function displayTime(time) { //get current time and duration  function
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function seekTimeUpdate(){ // seekBar time update function
	const newTime = video.currentTime * (100 / video.duration);
	seekBar.value = newTime;
	const color = `linear-gradient(90deg,red ${seekBar.value}%, rgb(202, 202, 202) ${seekBar.value}%)`;
	seekBar.style.background = color;
	currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
	
} // end function
function seekBarInputChangeFunc(){ // seekBar input change function
		const x = seekBar.value;
		const color = `linear-gradient(90deg,red ${x}%, rgb(202, 202, 202) ${x}%)`;
	seekBar.style.background = color;
		const seekto = video.duration * (x/100);
		
		video.currentTime = seekto;
	
		
}// end function
function toggleMute() { // mute and unmute function
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
	
	if (video.volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (video.volume < 0.7 && video.volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (video.volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }else{
	 
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute'); 
  }
	
	
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
} // end function
function changeVolume(e) { // change volume function 
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume.toFixed(1) <= "0.1") {
    volume = 0.2;
  }
   if (volume.toFixed(1) == "0.3" || volume.toFixed(1) == "0.2") {
    volume = 0.2;
  }
  if (volume.toFixed(1) == "0.5" || volume.toFixed(1) == "0.4") {
    volume = 0.4;
  }
  if (volume.toFixed(1) == "0.6") {
    volume = 0.6;
  }
  if (volume.toFixed(1) == "0.7" || volume.toFixed(1) == "0.8") {
    volume = 0.8;
  }
  if (volume.toFixed(1) >= "0.9" || volume.toFixed(1) == "1") {
    volume = 1;
  }
  
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  
  
  
  // Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-mute');
  }
  lastVolume = volume;
}
// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

/* start in fullscreen function*/
function getFullscreenElement(){
	
	return document.fullscreenElement
		   || document.webkitFullscreenElement
		   || document.mozFullscreenElement
		   || document.msFullscreenElement;
	
}
function toggleFullscreen(){
	if(getFullscreenElement()){
		
		document.exitFullscreen();
		
	}else{
	player.requestFullscreen().catch(console.log);
 fullScreenIcon.classList="fas fa-compress";
 video.classList.add('video-fullscreen'); 
	}
	
}
// end fullscreen function





// all event listener 
function initPlayer(){
playBtn.addEventListener("click",playPauseVideo); // play/pause addEventListener
video.addEventListener("click",playPauseVideo); // play/pause when click on videoaddEventListener
seekBar.addEventListener("mouseenter",seekBarMouseEnterFunc); // seekBar mouseenter addEventListener
seekBar.addEventListener("mouseleave",seekBarMouseLeaveFunc); // seekBar mouseleave addEventListener
video.addEventListener("timeupdate",seekTimeUpdate); // seekBar time update addEventListener
seekBar.addEventListener("input",seekBarInputChangeFunc);// seekBar input change addEventListener
seekBar.addEventListener("input",seekBarInputChangeFunc);// seekBar input change addEventListener
volumeIcon.addEventListener("click",toggleMute);// mute and unmute volume addEventListener
volumeRange.addEventListener('click', changeVolume); // change volume addEventListener
video.addEventListener('ended', showPlayIcon); // change volume addEventListener
speed.addEventListener('change', changeSpeed); //change playbackrate
fullScreenIcon.addEventListener('click', toggleFullscreen); //toggle fullscreen listener
video.addEventListener("dblclick",toggleFullscreen); // toggle fullscreen when dbclick on videoaddEventListener

// keydown function 
document.addEventListener("keyup",(e)=>{
	
	if(e.keyCode == 39){
		
		video.currentTime += 2;
	}
	if(e.keyCode == 37){
		video.currentTime -= 4;
	}
	if(e.keyCode == 38){
		
		if(video.volume.toFixed(1) >= "1.0"){
			
			return false;
		}
		
		video.volume += 0.2;
		volumeBar.style.width = `${video.volume * 100}%`;
		
		if (video.volume > 0.7) {
    volumeIcon.classList = 'fas fa-volume-up';
  }
  if (video.volume < 0.7 ) {
    volumeIcon.classList='fas fa-volume-down';
  }
  if (video.volume < 0.2) {
    volumeIcon.classList = 'fas fa-volume-mute';
  }
		 
	}
	if(e.keyCode == 40){
		if(video.volume.toFixed(1) == "0.2"){
			
			video.volume = 0.2;
			return false;
		}
		video.volume -= 0.2;
		volumeBar.style.width = `${video.volume * 100}%`;
		if (video.volume > 0.7) {
    volumeIcon.classList = 'fas fa-volume-up';
  }
  if (video.volume < 0.7 ) {
    volumeIcon.classList='fas fa-volume-down';
  }
  if (video.volume < 0.2) {
    volumeIcon.classList = 'fas fa-volume-mute';
  }
		
	}
	
});

// keypress function 
document.addEventListener("keypress",(e)=>{
	if(e.keyCode == 32){
		playPauseVideo();
	}
	if(e.keyCode == 102){
		toggleFullscreen();
	}
	if(e.keyCode == 109){
		toggleMute();
	}
	if(e.keyCode == 43 ){
		if(video.playbackRate >= 4.0){
			return false;
		}
		video.playbackRate += 0.2;
		let speedValue = video.playbackRate.toFixed(1);
		speedText.textContent = `${speedValue} x`;
		speedText.value = speedValue;
		
	}
	if(e.keyCode == 95 ){
		if(video.playbackRate <= 0.4){
			return false;
		}
		video.playbackRate -= 0.2;
		let speedValue = video.playbackRate.toFixed(1)
		speedText.textContent = `${speedValue} x`;
		speedText.value = speedValue;
	}
	
});

document.addEventListener("fullscreenchange",()=>{
		if(getFullscreenElement() == null){
		fullScreenIcon.classList="fas fa-expand";
		video.classList.remove('video-fullscreen'); 
		}
		
		
		
	});


video.onwaiting = function(){
    playBtn.classList = "fas fa-spinner fa-spin"
	
};
video.onplaying = function(){
     playBtn.classList = "fas fa-pause"
};
currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

video.addEventListener("loadedmetadata",initPlayer);




