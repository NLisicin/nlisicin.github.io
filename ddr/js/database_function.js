// add new user to database
function addNewUserScore(UserName, UserScore){
    db.collection("highscore").add({
    Name: UserName, 
    score: UserScore
    })
    .then(function(docRef) {
    console.log("Document written with Id: ", docRef.id); 
    })
    .catch(function(error){
    console.error("error adding:", error)
    })
    }

//  create leader board rows
function addLeaders(user, score){
    let scorestring = score.toString();
    let showLeader = document.createElement("tr");
        showLeader.className = 'lbRow';
        showLeader.innerHTML = "<td class = 'lbName'><p>"+user+"</p></td><td class='lbScore'>"+scorestring+"</td>";
        document.getElementById("lb").appendChild(showLeader);
        }

// retrieve scores from database
function getTopScores() {
    // let topscores = db.collection('highscore').get.then(orderByValue('score'));
    // console.log(topscores);
    let allscores = [];
    let db_ref = db.collection("highscore").orderBy("score", "desc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            allscores.push(doc.data().score);
            addLeaders(doc.data().Name, doc.data().score.toString()); 
            return allscores;        
            }) 
        })
    }

// user submit scores
function submitScore() {
    let userName = document.getElementById('namelb').value;
    let acheivedscore = document.getElementById('lbscore').innerText;
    addNewUserScore(userName, acheivedscore);
    setTimeout(function(){
        goToLeaderboard();
    }, 1000);
}


