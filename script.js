const playlistEl = document.getElementById('playlist');
const audio = document.getElementById('audio');
const songNameEl = document.getElementById('songName');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const progressEl = document.getElementById('progress');
const timeEl = document.getElementById('time');

let isPlaying = false;
let shuffle = false;
let repeat = false;
let currentIndex = 0;
let songs = [];

// Carrega playlist do JSON
async function loadSongs() {
  const res = await fetch('songs.json');
  songs = await res.json();

  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.name} - ${song.artist}`;
    li.addEventListener('click', () => playSong(index));
    playlistEl.appendChild(li);
  });
}

loadSongs();

function playSong(index){
  currentIndex = index;
  const song = songs[index];
  audio.src = song.file;
  coverEl.src = song.cover;
  songNameEl.textContent = song.name;
  artistEl.textContent = song.artist;
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
  coverEl.classList.add('playing');
}

function togglePlay(){
  if(!audio.src) return;
  if(isPlaying){ audio.pause(); playBtn.textContent='▶️'; coverEl.classList.remove('playing'); }
  else { audio.play(); playBtn.textContent='⏸'; coverEl.classList.add('playing'); }
  isPlaying = !isPlaying;
}

function nextSong(){
  if(shuffle){ currentIndex = Math.floor(Math.random() * songs.length); }
  else{ currentIndex = (currentIndex + 1) % songs.length; }
  playSong(currentIndex);
}

function prevSong(){
  if(shuffle){ currentIndex = Math.floor(Math.random() * songs.length); }
  else{ currentIndex = (currentIndex - 1 + songs.length) % songs.length; }
  playSong(currentIndex);
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
shuffleBtn.addEventListener('click', ()=> shuffle = !shuffle);
repeatBtn.addEventListener('click', ()=> repeat = !repeat);

audio.addEventListener('timeupdate', ()=>{
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressEl.value = progressPercent || 0;
  let min = Math.floor(audio.currentTime / 60);
  let sec = Math.floor(audio.currentTime % 60);
  timeEl.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
});

progressEl.addEventListener('input', ()=>{
  audio.currentTime = (progressEl.value / 100) * audio.duration;
});

audio.addEventListener('ended', ()=>{
  if(repeat) playSong(currentIndex);
  else nextSong();
});

// Tema automático dark/light
const hour = new Date().getHours();
if(hour >= 6 && hour < 18) document.body.style.background = 'linear-gradient(135deg, #00c6ff, #0072ff)';
