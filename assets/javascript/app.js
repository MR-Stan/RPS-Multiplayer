//   Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBUAGbn0ii9D2AyAd5J3dX2-4riUGnaj44",
    authDomain: "rps-multiplayer-73608.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-73608.firebaseio.com",
    projectId: "rps-multiplayer-73608",
    storageBucket: "rps-multiplayer-73608.appspot.com",
    messagingSenderId: "217985449291",
    appId: "1:217985449291:web:2b738773c45b17b6d8fcce",
    measurementId: "G-94GD03DPFV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// let database = firebase.database();
// let connectionsRef = database.ref("/connections");
// let connectedRef = database.ref(".info/connected");
// let waitRef = database.ref("/wait");
// let gameRef = database.ref("/game");

let gameObject = {

    RPS : [
        {
            name : "rock",
            image : "<img src='assets/images/rock.jpg' alt='image of a rock' class='image'>"
        },
        {
            name : "paper",
            image : "<img src='assets/images/paper.jpg' alt='image of paper' class='image'>"
        },
        {
            name : "scissors",
            image : "<img src='assets/images/scissors.jpg' alt='image of scissors' class='image'>"
        }
    ],

    // had to move win and loss counters outside of object to work
    player : {
        name : "",
        id : "",
        wins : "",
        choice : ""
    },

    opponent : {
        name : "",
        id : "",
        wins : "",
        choice : ""
    },

    // initial load screen
    initialize : function() {
        $("#gameContainer").hide();
        $("#initialSubmitButton").on("click", function(event) {
            event.preventDefault();
            // if no name has been entered then bail out
            if(!($("#playerName").val())) {
                return
                // update #gameType saying to choose in red
            }
            else if (!($("#radioOnline").is(":checked")) && !($("#radioSingle").is(":checked"))) {
                return
                // update #playerNameP to Enter your name in red
            }
            else {
                if ($("#radioOnline").is(":checked")) {
                    //gameObject.createOpponent();
                }
                else if ($("#radioSingle").is(":checked")) {
                    gameObject.computerOpponent();
                }
                $("#radioOnline").prop("checked", false);
                $("#radioSingle").prop("checked", false);
                gameObject.player.name = $("#playerName").val().trim();
                $("#playerName").val("");
                $("#initialContainer").hide();
                gameObject.createPlayer();
                $("#gameContainer").show();
            }
        });
    },

    createPlayer : function() {
        // displaying player's name
        $("#playerNameDisplay").text("Player: " + gameObject.player.name);
        // add to pRPSContainer
        gameObject.RPS.forEach(function(item) {
            // add data-name
            $("#pRPSContainer").append(item.image);
        });
    },

    createOpponent : function() {
        gameObject.opponent.name = $("#playerName").val().trim(); //#opponent name?
        gameObject.RPS.forEach(function(item) {
            // add data-name
            $("#oRPSContainer").append(item.image);
        });
    },

    computerOpponent : function() {
        let nameArray = ["Frank", "Sally", "Henry", "Tyler", "Monica", "Bruce", "Nancy", "Janice"];
        gameObject.opponent.name = nameArray[Math.floor(Math.random()*nameArray.length)];
        $("#opponentName").text("Player: " + gameObject.opponent.name);
        gameObject.RPS.forEach(function(item) {
            console.log(item);
            $("#oRPSContainer").append(item.image);
        });
        gameObject.newRound();
    },

    tie : function() {
        $("#status").text(this.player.choice + " ties " + this.opponent.choice);
    },

    // creates new round instance - after players determined
    newRound : function() {
        // clear stuff, hide things, show other things, call playerChoice
        gameObject.playerChoice();
    },

    playerChoice : function() {
        $("#pRPSContainer").on("click", ".image", function(e) {
            e.stopImmediatePropagation()
            console.log(this);
        });
    },

    opponentChoice : function() {
        $("#oRPSContainer").on("click", ".image", function(e) {
            e.stopImmediatePropagation();
            console.log(this);
        // move to checkWin(this.player.choice, this.opponent.choice);
        });
    },

    // selection timer
    timer : function() {
        // 15 seconds to choose a move then skips turn - whoever chooses wins or tie
        setInterval(function() {

        }, 15000);
    },

    // player wins
    pWin : function() {
        this.player.wins += 1; 
        $("#playerWins").text(this.player.name + " wins: " + this.player.wins);
        $("#status").text(this.player.choice + " beats " + this.opponent.choice + ". " + this.player.name + " wins!");
    },

    // opponent wins
    oWin : function() {
        this.opponent.wins += 1; 
        $("#opponentWins").text(this.opponent.name + " wins: " + this.opponent.wins);
        $("#status").text(this.opponent.choice + " beats " + this.player.choice + ". " + this.opponent.name + " wins!");
    },

    checkWin : function(pChoice, oChoice) {
        if (pChoice === oChoice) {
            this.tie();
        }
        else if ((pChoice === "rock" && oChoice === "scissors") || (pChoice === "scissors" && oChoice === "paper") || (pChoice === "paper" && oChoice === "rock")) {
            this.pWin();
        }
        else if ((pChoice === "scissors" && oChoice === "rock") || (pChoice === "paper" && oChoice === "scissors") || (pChoice === "rock" && oChoice === "paper")) {
            this.oWin();
        }
    this.newRound();
    },

    // keeping track of number of connections and assigning player id
    connectionID : function() {
        connectedRef.on("value", function(snap) {
            if (snap.val()) {
                let connect = connectionsRef.push(true);
                gameObject.player.id = connect.key;
                connect.onDisconnect().remove();
            }
        });
    },

    displayConnections : function() {

    },

}

gameObject.initialize();



