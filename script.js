const playlistEl = document.getElementById('playlist');
const audio = document.getElementById('audio');
const songNameEl = document.getElementById('songName');

// Lista de músicas (coloque mp3 na pasta "music")
const songs = [
  { name: 'Música 1', artist: 'Artista A', file: 'music/song1.mp3' },
  { name: 'Música 2', artist: 'Artista B', file: 'music/song2.mp3' },
  { name: 'Música 3', artist: 'Artista C', file: 'music/song3.mp3' }
];

// Popula lista de músicas
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.name} - ${song.artist}`;
  li.addEventListener('click', () => playSong(index));
  playlistEl.appendChild(li);
});

let currentIndex = 0;

function playSong(index){
  currentIndex = index;
  const song = songs[index];
  audio.src = song.file;
  audio.play();
  songNameEl.textContent = `${song.name} - ${song.artist}`;
}
