//A deck of cards
const playingCards = [
    "Spades/2", "Diamonds/2", "Clubs/2", "Hearts/2",
    "Spades/3", "Diamonds/3", "Clubs/3", "Hearts/3",
    "Spades/4", "Diamonds/4", "Clubs/4", "Hearts/4",
    "Spades/5", "Diamonds/5", "Clubs/5", "Hearts/5",
    "Spades/6", "Diamonds/6", "Clubs/6", "Hearts/6",
    "Spades/7", "Diamonds/7", "Clubs/7", "Hearts/7",
    "Spades/8", "Diamonds/8", "Clubs/8", "Hearts/8",
    "Spades/9", "Diamonds/9", "Clubs/9", "Hearts/9",
    "Spades/10", "Diamonds/10", "Clubs/10", "Hearts/10",
    "Spades/11", "Diamonds/11", "Clubs/11", "Hearts/11",
    "Spades/12", "Diamonds/12", "Clubs/12", "Hearts/12",
    "Spades/13", "Diamonds/13", "Clubs/13", "Hearts/13",
    "Spades/14", "Diamonds/14", "Clubs/14", "Hearts/14"
];

//turn card from above to png string in database
function getCardString(cardName) {
    var names = cardName.split("/");
    var temp = names[1]

    if (parseInt(temp) > 10) {
        if (names[1] == "11") {
            names[1] = "J"
        }
        else if (names[1] == "12") {
            names[1] = "Q"
        }
        else if (names[1] == "13") {
            names[1] = "K"
        }
        else if (names[1] == "14") {
            names[1] = "A"
        }
    }
    return "./playing-cards/" + names[0] + "/" + names[1] + ".png";
}

//simple shuffle mechanics
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//gamestart
var round = 1
var curr = ""
var last = ""
var userpick = ""
var deck = shuffle(playingCards);
var r1ch = document.getElementById("r1ch")
var r2ch = document.getElementById("r2ch")
var r3ch = document.getElementById("r3ch")
var r4ch = document.getElementById("r4ch")
var stock = document.getElementById("curr")
stock.addEventListener('animationend', function() {
    stock.style.animation = '';
});
var prev = document.getElementById("last")

var totalscore = 0
var doublelast = ""

var eventlist1
var eventlist2
var eventlist3
var eventlist4

function gameplay() {
    document.getElementById("sequence").innerHTML = (round - 1).toString()
    if (deck.length == 52) {
        initializeRound()
    }
    //section for first card of the game
    if (deck.length != 0) {
        r1ch.removeEventListener("click", eventlist1)
        r2ch.removeEventListener("click", eventlist2)

        //do this
        doublelast = last
        last = curr;
        curr = deck.shift()
        console.log("CURRENT ", curr)

        //wait for one of these to be clicked then remove both
        if (round == 1) {
            r1ch.addEventListener("click", eventlist1 = function() {
                handleRoundOne("red")
                gameplay()
                return
            })
            r2ch.addEventListener("click", eventlist2 = function() {
                handleRoundOne("black")
                gameplay()
                return
            })
        }
        else if (round == 2) {
            r1ch.addEventListener("click", eventlist1 = function() {
                handleRoundOne("higher")
                gameplay()
                return
            })
            r2ch.addEventListener("click", eventlist2 = function() {
                handleRoundOne("lower")
                gameplay()
                return
            })
        }
        else if (round == 3) {
            r1ch.addEventListener("click", eventlist1 = function() {
                handleRoundOne("in between")
                gameplay()
                return
            })
            r2ch.addEventListener("click", eventlist2 = function() {
                handleRoundOne("outside")
                gameplay()
                return
            })
        }
        else if (round == 4) {
            r1ch.addEventListener("click", eventlist1 = function() {
                handleRoundOne("hearts")
                gameplay()
                return
            })
            r2ch.addEventListener("click", eventlist2 = function() {
                handleRoundOne("clubs")
                gameplay()
                return
            })
            r3ch.addEventListener("click", eventlist3 = function() {
                handleRoundOne("diamonds")
                gameplay()
                return
            })
            r4ch.addEventListener("click", eventlist4 = function() {
                handleRoundOne("spades")
                gameplay()
                return
            })
        }
    }
    else {
        round = 1
        curr = ""
        last = ""
        userpick = ""
        deck = shuffle(playingCards);
        totalscore = 0
        doublelast = ""
        eventlist1 = null
        eventlist2 = null
        eventlist3 = null
        eventlist4 = null
    }
}

function initializeRound() {
    document.getElementById("cs").className = "choices"
    r1ch.style.display = "flex"
    r2ch.style.display = "flex"
    if (round == 1) {
        r1ch.innerText = "Red"
        r2ch.innerText = "Black"
    }
    else if (round == 2) {
        r1ch.innerText = "Higher"
        r2ch.innerText = "Lower"
    }
    else if (round == 3) {
        r1ch.innerText = "In Between"
        r2ch.innerText = "Outside"
    }
    else if (round == 4) {
        r1ch.innerText = "3"
        r2ch.innerText = "4"
    }
}

function initializeRound4Choices() {
    document.getElementById("cs").className = "choices4"
    r1ch.style.display = "flex"
    r2ch.style.display = "flex"
    r3ch.style.display = "flex"
    r4ch.style.display = "flex"
    r1ch.innerText = "Hearts"
    r2ch.innerText = "Clubs"
    r3ch.innerText = "Diamonds"
    r4ch.innerText = "Spades"
}

function resetRound() {
    stock.style.animation = "shakewrong .6s forwards"
    document.getElementById("cs").className = "choices" //two choices
    r3ch.style.display = "none" //remove other choices
    r4ch.style.display = "none"
    r1ch.innerText = "Red" //make first option
    r2ch.innerText = "Black"
    round = 1
}

function handleRoundOne(upick) {

    let temp = curr.split("/");
    let currSuit = temp[0];
    let currRank = parseInt(temp[1]);
    let lastRank = parseInt(last.split("/")[1])

    stock.src = getCardString(curr)
    if (last != "") {
        prev.src = getCardString(last)
    }

    if (round == 1) {
        if (upick == "red" && (currSuit == "Hearts" || currSuit == "Diamonds") ||
            (upick == "black" && (currSuit == "Clubs" || currSuit == "Spades"))) {
            round++;
            stock.style.animation = "shakeright .6s forwards"
            initializeRound()
        }
        else {
            resetRound()
        }
    }
    else if (round == 2) {
        if ((upick == "higher" && currRank >= lastRank) || 
            (upick == "lower" && currRank <= lastRank)) {
            round++;
            stock.style.animation = "shakeright .6s forwards"
            initializeRound()
        }
        else {
            resetRound()
        }
    }
    else if (round == 3) {
        let l = parseInt(last.split("/")[1])
        let ll = parseInt(doublelast.split("/")[1])

        if (upick == "in between" && (currRank >= Math.min(l, ll) && currRank <= Math.max(l, ll)) ||
            (upick == "outside" && (currRank <= Math.min(l, ll) || currRank >= Math.max(l, ll)))) {
            round++;
            stock.style.animation = "shakeright .6s forwards"
            initializeRound4Choices()
        }
        else {
            resetRound()
        }
    }
    else if (round == 4) {
        if ((upick == "hearts" && currSuit == "Hearts") ||
            (upick == "clubs" && currSuit == "Clubs") ||
            (upick == "diamonds" && currSuit == "Diamonds") ||
            (upick == "spades" && currSuit == "Spades")) {
            totalscore++

            stock.style.animation = "shakeright .6s 4"
            document.getElementById("score").innerHTML = totalscore.toString()
            document.getElementById("cs").className = "choices" //two choices
            r3ch.style.display = "none" //remove other choices
            r4ch.style.display = "none"
            r1ch.innerText = "Red" //make first option
            r2ch.innerText = "Black"
            round = 1
        }
        else {
            resetRound()
        }
    }
}

//start game
gameplay();
//window.addEventListener('keyup', gameplay, {once: true})