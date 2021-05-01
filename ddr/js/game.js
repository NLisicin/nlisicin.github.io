//variables setting the difficulty and song of the game from the URL
let mode = { easy: 120, medium: 60, hard: 30 }
let bpm = {jojo: 83, intoyou: 108, sept: 126, backstreet: 99, pizzapie: 96, violeta: 115, jesse: 90}
let queryString = window.location.href.split('?')
let difficulty = queryString[2]
let song = queryString[1]
let beat = (mode[difficulty] / bpm[song]) * 1000;

//variables tracking game interactions
let hit = 0;
let arrowcount = 0;
let score = 0;

//variables that affect timing of arrow movements
let pagecenter = (window.innerHeight+10) / 2
let partition = 100;

//variables to get positions of static arrows 
let leftBounds = document.getElementById("left").getBoundingClientRect();
let rightBounds = document.getElementById("right").getBoundingClientRect();
let upBounds = document.getElementById("up").getBoundingClientRect();
let downBounds = document.getElementById("down").getBoundingClientRect();

//arrays for randomly creating arrow object
let id_arr = ['L', 'U', 'D', 'R'];
let pos_arr = [leftBounds.left, upBounds.left, downBounds.left, rightBounds.left];
let src_arr = ['images/left.png', 'images/up.png', 'images/down.png', 'images/right.png'];

//Changes the centre text on click
function displayText(hit) {
    text = document.getElementById('displayOnHit');
    hitOptions = ['Great!', 'Perfect!', 'Groovy!', 'Rock on!'];
    missOptions = ['Miss!', 'Oof!', 'Do better!', 'Yikes!'];
    i = Math.floor(Math.random() * 4);

    if (hit) {
        text.innerHTML = hitOptions[i];
        text.style.color = 'white';
    } else {
        text.innerHTML = missOptions[i];
        text.style.color = 'black';
    }
    text.style.display = 'inline';
}

//arrow object constructor
function Arrow(startPoint, id, src) {
    this.arw = document.createElement("img");
    this.arw.className = "glow";
    this.arw.id = id;
    this.arw.src = src;
    this.arw.style.position = 'absolute';
    this.arw.style.top = window.innerHeight - 200;
    this.arw.style.left = startPoint + 'px';
    this.arw.onclick = checkClick;
    document.body.appendChild(this.arw)
}

//creates a new arrow and moves it from the bottom to the top of the screen
function controlArrow() {
    arrowcount++;
    i = Math.floor(Math.random() * 4);
    let current_arrow = new Arrow(pos_arr[i], id_arr[i], src_arr[i]);
    let arrow_pos = parseInt(current_arrow.arw.style.top);
    let interval = setInterval(move, (2 * beat) / partition);
    function move() {
        //continue to get closer to the top
        if (arrow_pos > 0) {
            arrow_pos -= pagecenter / partition;
            current_arrow.arw.style.top = arrow_pos + 'px';
            return;
        }
        //once arrow reached the top (if not clicked), remove it
        else {
            current_arrow.arw.remove();
            clearInterval(interval);
            return;
        }
    }
}

//use to check if the arrow was within the limits when a key is pressed
function checkHit(check_arrow) {
    if (parseInt(check_arrow.style.top) < leftBounds.bottom) {
        hit += 1;
        document.getElementById('hits').innerHTML = hit;
        score = Math.floor((hit/arrowcount)*100);
        document.getElementById('score').innerHTML = score + '%';
        check_arrow.remove();
        displayText(true);
        return;
    }
    else {
        check_arrow.remove();
        displayText(false);
        return;
    }
}

//use to check if the arrow was within the limits when it is clicked
function checkClick() {
    if (parseInt(this.style.top) < leftBounds.bottom) {
        hit += 1;
        document.getElementById('hits').innerHTML = hit;
        score = Math.floor((hit/arrowcount)*100);
        document.getElementById('score').innerHTML = score + '%';
        this.remove();
        displayText(true);
        return;
    }
    else {
        this.remove();
        displayText(false);
        return;
    }
}

//eventlistener for arrow keys - applies checkHit function when arrow is pressed
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowDown":
            document.getElementById("downGlow").style.visibility = "visible";
            this.setTimeout(function(){document.getElementById("downGlow").style.visibility = "hidden";}, 100)
            down_arrow = document.getElementById('D');
            if(down_arrow){
                checkHit(down_arrow);
                return;
            }
            else{
                return;
            }
        case "ArrowUp":
            document.getElementById("upGlow").style.visibility = "visible";
            this.setTimeout(function(){document.getElementById("upGlow").style.visibility = "hidden";}, 100)
            up_arrow = document.getElementById('U');
            if(up_arrow){
                checkHit(up_arrow);
                return;
            }
            else{
                return;
            }
        case "ArrowLeft":
            document.getElementById("leftGlow").style.visibility = "visible";
            this.setTimeout(function(){document.getElementById("leftGlow").style.visibility = "hidden";}, 100)
            left_arrow = document.getElementById('L');
            if(left_arrow){
                checkHit(left_arrow);
                return;
            }
            else{
                return;
            }
        case "ArrowRight":
            document.getElementById("rightGlow").style.visibility = "visible";
            this.setTimeout(function(){document.getElementById("rightGlow").style.visibility = "hidden";}, 100)
            right_arrow = document.getElementById('R');
            if(right_arrow){
                checkHit(right_arrow);
                return;
            }
            else{
                return;
            }
        default:
            return; // Quit when this doesn't handle the key event.
    }
});

//prevents arrows from navigating the page
let arrow_keys_handler = function (e) {
    switch (e.keyCode) {
        case 37: case 39: case 38: case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);

//plays song and starts creating arrows
function playSong() {
    let selectSong = new Audio("audio/"+song+".mp3");
    selectSong.play();
    setInterval(controlArrow, beat);
    setTimeout(function(){window.location.replace('end.html?'+score)}, 90000)
    document.getElementById('start').style.pointerEvents = 'none';
}
function quitGame(){
    window.location.replace('end.html?'+score);
}
document.getElementById('start').onclick = playSong;
document.getElementById('quit').onclick = quitGame;

