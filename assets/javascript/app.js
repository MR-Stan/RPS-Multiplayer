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
    intialize : function() {

    },

    createPlayer : function() {
        $("#submitNameButton").on("click", function(event) {
            event.preventDefault();
            if(!($("#playerName").val())) {
                return
            }
            else {
                gameObject.player.name = $("#playerName").val().trim();
            }
        });
    },

    createOpponent : function() {

    },

    computerOpponent : function() {

    },

    tie : function() {
        $("#status").text(this.player.choice + " ties " this.opponent.choice);
    },

    // creates new round instance - after players determined
    newRound : function() {

    },

    // selection timer
    timer : function() {

    },

    // player wins
    pWin : function() {
        this.player.wins += 1; 
        // update win display
        $("#status").text(this.player.choice + " beats " this.opponent.choice + ". " + this.player.name + " wins!");
    },

    // opponent wins
    oWin : function() {
        this.opponent.wins += 1; 
        // update win display
        $("#status").text(this.opponent.choice + " beats " this.player.choice + ". " + this.opponent.name + " wins!");
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
    }
}


//checkWin(this.player.choice, this.opponent.choice);


