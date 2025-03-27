// Variables & Constants

const tracks = ["assets/audio/Abracadabra.mp3", "assets/audio/Poker Face.mp3", "assets/audio/Bad Romance.mp3"];
let currentTrack = 0;
const audioElement = document.getElementById("backgroundMusic");

const URLHead = "";
const rooms = ["", "billie_elish.html"];

const superSecretAnswer = "just dance"; // Don't look!

// Initialize audio settings

audioElement.volume = 0.5;

function startGame() {
    document.getElementById("question").classList.remove("hidden");
    playTrack();
}

function playTrack() {
    if (currentTrack >= 0 && currentTrack < tracks.length) {
        try {
            audioElement.src = tracks[currentTrack];
            audioElement.load(); // Explicitly load the audio
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Playback error:", error);
                    // Try next track if current fails
                    currentTrack = (currentTrack + 1) % tracks.length;
                    playTrack();
                });
            }
        } catch (error) {
            console.error("Error loading track:", error);
        }
    }
}

// Track ended handler

audioElement.addEventListener("ended", () => {
    console.log('Track finished playing');
    currentTrack = (currentTrack + 1) % tracks.length;
    playTrack();
});

// Functions

function submit() {
    let input = document.getElementById("input").value.trim().toLowerCase();
    if (input === superSecretAnswer) {
        nextRoom();
    } else {
        wrongChoice();
    }
}

function nextRoom() {
  pos = 0;
  
  for(let i = 0; i < rooms.length; i ++) {
    if(URLHead + rooms[i] == window.location.href) pos = i;
  }
  
  window.location.href = URLHead + rooms[(pos + 1)];
}

function hideButton() {
    document.querySelector('button').style.display = "none";
}

function wrongChoice() {
    document.getElementById("incorrect").style.display = "block";
}

// Events

document.addEventListener('DOMContentLoaded', function () {
  loadSpin();
});

// :P

let elems = [];
let rotate = 0;
let run = true;
let trigger = '`';

function loadSpin(){
  elems = document.getElementsByTagName('*');
}

function spin() {
  rotate += 180;
  
  for(let i = 0; i < elems.length; i ++) elems[i].style.rotate = '' + rotate + 'deg';
}

document.addEventListener('keypress', function() {
    if(event.key == trigger && run) {
        run = false;
        spin();
        window.setTimeout(spin, 5 * 1000);
        window.setTimeout(function runTrue(){
            run = true;
        }, 5 * 1000 * 2);
    }
});