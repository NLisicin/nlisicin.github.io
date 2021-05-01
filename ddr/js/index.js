// --- Index ---

// Go to the song select page
function goToSongSelect() {
    window.location.href = 'songselect.html';
}

// Go to the how to play page
function goToHowToPlay() {
    window.location.href = 'howtoplay.html';
}

// Go to the leaderboard page
function goToLeaderboard() {
    window.location.href = 'leaderboard.html';
}

// --- Song Select ---

// Go to the difficulty select page, passing the selected song as query string
function goToDifficultySelect(song) {
    window.location.href = 'difficultyselect.html?' + song;
}

// --- Difficulty Select ---

// Go to the game page, passing the selected song and difficulty as query string
function startGame(difficulty) {
    let song = window.location.href.split('?')[1];
    window.location.href = 'game.html?' + song + '?' + difficulty;
}

// --- Leaderboard ---

// Go to the main menu
function goToMainMenu() {
    window.location.href = 'index.html';
}

// --- End ---
