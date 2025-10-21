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

// Lista de músicas
const songs = [
  { name: 'Música 1', artist: 'Artista A', file: 'music/song1.mp3', cover: 'music/song1.jpg' },
  { name: 'Música 2', artist: 'Artista B', file: 'music/song2.mp3', cover: 'music/song2.jpg' },
  { name: 'Música 3', artist: 'Artista C', file: 'music/song3.mp3', cover: 'music/song3.jpg' }
];

// Popula playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.name} - ${song.artist}`;
  li.addEventListener('click', () => playSong(index));
  playlistEl.appendChild(li);
});

// Funções de reprodução
function playSong(index) {
  currentIndex = index;
  const song = songs[index];
  audio.src = song.file;
  coverEl.src = song.cover;
  songNameEl.textContent = song.name;
  artistEl.textContent = song.artist;
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

function togglePlay() {
  if (!audio.src) return;
  if (isPlaying) { audio.pause(); playBtn.textContent = '▶️'; }
  else { audio.play(); playBtn.textContent = '⏸'; }
  isPlaying = !isPlaying;
}

function nextSong() {
  if(shuffle){
    currentIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  playSong(currentIndex);
}

function prevSong() {
  if(shuffle){
    currentIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  }
  playSong(currentIndex);
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
shuffleBtn.addEventListener('click', ()=> shuffle = !shuffle);
repeatBtn.addEventListener('click', ()=> repeat = !repeat);

// Atualiza barra de progresso
audio.addEventListener('timeupdate', ()=>{
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressEl.value = progressPercent || 0;

  let min = Math.floor(audio.currentTime / 60);
  let sec = Math.floor(audio.currentTime % 60);
  timeEl.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
});

// Clicar na barra de progresso
progressEl.addEventListener('input', ()=>{
  audio.currentTime = (progressEl.value / 100) * audio.duration;
});

// Repetir música
audio.addEventListener('ended', ()=>{
  if(repeat) playSong(currentIndex);
  else nextSong();
});
