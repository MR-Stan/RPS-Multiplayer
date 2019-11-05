//   Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyBUAGbn0ii9D2AyAd5J3dX2-4riUGnaj44",
//     authDomain: "rps-multiplayer-73608.firebaseapp.com",
//     databaseURL: "https://rps-multiplayer-73608.firebaseio.com",
//     projectId: "rps-multiplayer-73608",
//     storageBucket: "rps-multiplayer-73608.appspot.com",
//     messagingSenderId: "217985449291",
//     appId: "1:217985449291:web:2b738773c45b17b6d8fcce",
//     measurementId: "G-94GD03DPFV"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // 
// firebase.analytics();

// //
// let database = firebase.database();
// //
// let connectionsRef = database.ref("/connections");
// //
// let connectedRef = database.ref(".info/connected");
// //
// let waitRef = database.ref("/wait");
// //
// let gameRef = database.ref("/game");

let gameObject = {

    RPS : [
        {
            name : "rock",
            image : "<img src='assets/images/rock.jpg' alt='image of a rock' class='image' id='rock' data-name='rock'>"
        },
        {
            name : "paper",
            image : "<img src='assets/images/paper.jpg' alt='image of paper' class='image' id='paper' data-name='paper'>"
        },
        {
            name : "scissors",
            image : "<img src='assets/images/scissors.jpg' alt='image of scissors' class='image' id='scissors' data-name='scissors'>"
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

    // computer opponent
    compOpp : false,

    // number of game rooms
    gameRoom : 0,

    // which instance of gameRoom is this?
    thisGameRoom : 0,

    // determines whether move choice has been made
    makeChoice : false,

    // initial load screen
    initialize : function() {
        $("#gameContainer").hide();
        $("#initialSubmitButton").on("click", function(event) {
            event.preventDefault();
            // data validation - red text for unfilled options
            if (!($("#radioOnline").is(":checked")) && !($("#radioSingle").is(":checked")) && (!($("#playerName").val()))) {
                $("#gameType").css("color", "red");
                $("#playerNameP").css("color", "red");
                return;
            }
            // data validation - red text for unfilled options
            else if (!($("#radioOnline").is(":checked")) && !($("#radioSingle").is(":checked"))) {
                $("#gameType").css("color", "red");
                $("#playerNameP").css("color", "black");
                return
            }
            // data validation - red text for unfilled options
            else if (!($("#playerName").val())) {
                $("#gameType").css("color", "black");
                $("#playerNameP").css("color", "red");
                return;
            }
            else {
                // online multiplayer 
                if ($("#radioOnline").is(":checked")) {
                    //gameObject.createOpponent();
                }
                // single player
                else if ($("#radioSingle").is(":checked")) {
                    gameObject.compOpp = true;
                    gameObject.computerOpponent();
                    console.log(gameObject.compOpp);
                }
                //$("#radioOnline").prop("checked", false);
                //$("#radioSingle").prop("checked", false);
                gameObject.player.name = $("#playerName").val().trim();
                //$("#playerName").val("");
                $("#initialContainer").hide();
                gameObject.createPlayer();
                $("#gameContainer").show();
            };
        });
    },

    createPlayer : function() {
        // displaying player's name
        $("#playerNameDisplay").text("Player: " + gameObject.player.name);
        // add to pRPSContainer
        gameObject.RPS.forEach(function(item) {
            $("#pRPSContainer").append(item.image);
        });
        gameObject.playerChoice();
    },

    createOpponent : function() {
        gameObject.opponent.name = $("#playerName").val().trim(); //#opponent name?
        gameObject.RPS.forEach(function(item) {
            $("#oRPSContainer").append(item.image);
        });
    },

    computerOpponent : function() {
        let nameArray = ["Frank", "Sally", "Henry", "Tyler", "Monica", "Bruce", "Nancy", "Janice"];
        gameObject.opponent.name = nameArray[Math.floor(Math.random()*nameArray.length)];
        $("#opponentName").text("Player: " + gameObject.opponent.name);
        gameObject.RPS.forEach(function(item) {
            $("#oRPSContainer").append(item.image);
        });
        gameObject.opponentChoice();
    },

    tie : function() {
        $("#status").text(this.player.choice + " ties " + this.opponent.choice);
    },

    playerChoice : function() {
        $("#pRPSContainer").on("click", ".image", function(e) {
            e.stopImmediatePropagation();
            gameObject.player.choice = $(this).data("name");
            console.log(gameObject.player.choice);
            //$("#status").text(gameObject.player.name + " chose " + gameObject.player.choice);
            // $(this).appendTo("#pChosen");
            // $("#pRPSContainer").css("opacity", "0.2");
        });
    },

    opponentChoice : function() {
        if (!gameObject.compOpp) {
            $("#oRPSContainer").on("click", ".image", function(e) {
                e.stopImmediatePropagation();
                gameObject.opponent.choice = $(this).data("name");
            });
        }
        else {
            // put rock as test
            gameObject.opponent.choice = "rock";
            gameObject.timer();
        }     
        // move to checkWin(this.player.choice, this.opponent.choice);

    },

    // selection timer
    timer : function() {
        // 15 seconds to choose a move then skips turn - whoever chooses wins or tie
        setInterval(function() {
            return;
        }, 15000);
        gameObject.checkWin(gameObject.player.choice, gameObject.opponent.choice);
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
    //this.newRound();
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

    // resets round
    // clear stuff, hide things, show other things, call playerChoice
    // newRound : function() {
    //     // clear moves
    //     gameRef.child(gameObject.thisGameRoom).child(gameObject.opponent.id).child("choice").remove();
    //     setTimeout(function() {
    //         // reset choices
    //         gameObject.playerChoice.move = "";
    //         gameObject.opponentChoice.move = "";
    //     });
    // }

}

gameObject.initialize();


// boths player's given 15 seconds to make their choice
// neither player can see the other's choice
// once both made, or time is up, choices are compared
// need to limit players to a single choice

