document.addEventListener("DOMContentLoaded", function () {
    const playlistsContainer = document.getElementById("playlists");
    const songListContainer = document.getElementById("song-list");
    const nowPlaying = document.getElementById("now-playing");
    const audioPlayer = document.getElementById("audio-player");
    const playPauseBtn = document.getElementById("play-pause");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    let songQueue = [];
    let currentSongIndex = 0;

    function loadPlaylists() {
        fetch("playlists.json")
            .then(res => res.json())
            .then(playlists => {
                playlists.forEach(path => {
                    fetch(`${path}/info.json`)
                        .then(res => res.json())
                        .then(data => {
                            let playlistDiv = document.createElement("button");
                            playlistDiv.className = "playlist";
                            playlistDiv.textContent = data.title;
                            playlistDiv.addEventListener("click", () => loadSongs(path, data.songs));
                            playlistsContainer.appendChild(playlistDiv);
                        });
                });
            });
    }

    function loadSongs(playlistPath, songs) {
        songListContainer.innerHTML = "";
        songQueue = songs.map(song => `${playlistPath}/${song}`);
        songQueue.forEach((song, index) => {
            let li = document.createElement("button");
            let songName = song.split("/").pop().split(".")[0]; // Remove file extension
            li.textContent = songName;
            li.addEventListener("click", () => playSong(index));
            songListContainer.appendChild(li);
        });
    }

    function playSong(index) {
        currentSongIndex = index;
        audioPlayer.src = songQueue[currentSongIndex];
        nowPlaying.textContent = songQueue[currentSongIndex].split("/").pop().split(".")[0];
        audioPlayer.play();
        playPauseBtn.textContent = "⏸️";
    }

    playPauseBtn.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = "⏸️";
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = "▶️";
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentSongIndex < songQueue.length - 1) {
            playSong(currentSongIndex + 1);
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentSongIndex > 0) {
            playSong(currentSongIndex - 1);
        }
    });

    // Automatically play the next song when the current song ends
    audioPlayer.addEventListener("ended", () => {
        if (currentSongIndex < songQueue.length - 1) {
            playSong(currentSongIndex + 1);
        }
    });

    loadPlaylists();
});

