console.log("Welcome to Spotify");

// Initialize the variales
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let MyProgressBar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Baby Ko Bass Pasand Hai ", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Chammak Challo", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Haule Haule", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Jag Ghoomeya ", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Masakali ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Mitwa", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Rang Barse", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Saure Ghar", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Such Keh Raha Hai", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Ve Fukrey", filePath: "songs/9.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// audioElement.play();

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to Evemts
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //console.log(progress);
    MyProgressBar.value = progress;
})

MyProgressBar.addEventListener('change', () => {
    audioElement.currentTime = MyProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');


        //         element.classList.remove('fa-pause-circle');
        //         element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    masterSongName.innerText = songs[songIndex].songName;
    if(songIndex>9){
        songIndex = 0;
    }
    else{
        songIndex +=1 ;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1 ;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})