var dealerHand = [];
var playerHand = [];
var deck = makeDeck();

function doNewGame() {
	dealerHand = [];
	playerHand = [];
	deck = makeDeck();
	
	for (var i = 1; i <= 6; i++) {
		document.getElementById("dealer" + i).innerHTML = "";
		document.getElementById("player" + i).innerHTML = "";
	}

	addCardToHand(playerHand, "player");
	addCardToHand(playerHand, "player");
	addCardToHand(dealerHand, "dealer");
	count("countplayer", playerHand);
	count("countdealer", dealerHand);
	result();

	if ((getSum(playerHand) >= 21) || (getSum(dealerHand) >= 21)) {

	}
}

function doMore() {
	if ((playerHand.length < 6) && (playerHand.length > 1) && (getSum(playerHand) < 21) && (getSum(dealerHand) < 17)) {
		addCardToHand(playerHand, "player");
		count("countplayer", playerHand);
		result();
	} 
}

function doStop() {
	if ((playerHand.length < 6) && (playerHand.length > 1) && (getSum(playerHand) < 21)) {
		while (getSum(dealerHand) < 17) {
			addCardToHand(dealerHand, "dealer");
		}

		if (getSum(dealerHand) == 21) {
			document.getElementById("game").innerHTML = "Сожалеем, у дилера Black Jack.  :( ";
		} else if (getSum(dealerHand) > 21) {
			document.getElementById("game").innerHTML = "У дилера перебор!  :D";
		} else if (getSum(playerHand) == getSum(dealerHand)) {
			document.getElementById("game").innerHTML = "Ничья.";
		} else if (getSum(playerHand) > getSum(dealerHand)) {
			document.getElementById("game").innerHTML = "Поздравляем, Вы выиграли!  :)";
		} else {
			document.getElementById("game").innerHTML = "Вы проиграли...  :( ";
		}

		count("countdealer", dealerHand);
	}
}
	
		
function count(idName, handName) {
	document.getElementById(idName).innerHTML = "\"" + getSum(handName) + "\"";
}

function result() {
	var countplayer = getSum(playerHand);
	if (countplayer == 21) {
		document.getElementById("game").innerHTML = "У Вас Black Jack!  :D";
	} else if (countplayer > 21) {
		document.getElementById("game").innerHTML = "Перебор! :(";
	} else {
		document.getElementById("game").innerHTML = " ";	
	}
}

//---------------------------------------------------------------------------------

function makeDeck() {
	var deck = [];
	var cards = ["A", "6", "7", "8", "9", "10", "J", "Q", "K"];
	for (var i = 0; i < cards.length; i++) {
		deck.push(cards[i] + ".1");
		deck.push(cards[i] + ".2"); 
		deck.push(cards[i] + ".3");
		deck.push(cards[i] + ".4");
	}
	return deck;
}

function takeCard(deck) {
	var cardIndex = Math.floor(Math.random() * deck.length);
	var card = deck[cardIndex];
	deck.splice(cardIndex, 1);
	return card;
}

function addCardToHand(hand, handName) {
	var card = takeCard(deck);
	hand.push(card);
	setImage(handName + hand.length, getCardFileName(card));
}

function getCardFileName(card) {
	var denominations = ["A", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var denominationNames = ["00", "02", "03", "04", "05", "06", "07", "08", "09"];
	var denominationIndex = denominations.indexOf(getCardDenomination(card))
	var denominationName = denominationNames[denominationIndex];

	var suitName = "0" + (parseInt(getCardSuit(card)) - 1);

	return "pictures/cards-" + denominationName + "-" + suitName + ".png";
}


function getCardDenomination(card) {
	return card.split(".")[0];
}

function getCardSuit(card) {
	return card.split(".")[1];
}

function setImage(idName, fileName) {
	document.getElementById(idName).innerHTML = "<img src = \"" + fileName + "\">";
}

function getSum(hand) {
	var sum = 0;
	var aces = 0;

	for (var i = 0; i < hand.length; i++) {
		var denomination = getCardDenomination(hand[i]);
		
		if (denomination == "J" || denomination == "Q" || denomination == "K") {
			sum += 10;
		} else if (denomination == "A") {
			aces++; 
		} else {
			sum += parseInt(denomination);
		}		
	}

	if (aces != 0) {
		sum += aces - 1;
		sum += (sum + 11 > 21) ? 1 : 11;
	}

	return sum;
}

function sounds(soundName){
  var audio = new Audio();
  audio.preload = 'auto';
  audio.src = "sounds/" + soundName + ".mp3";
  audio.play();
}

///////////////////////////////////////////////////////////////////////////////////////////


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getCard() {
	var cards = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	return cards[getRandomInt(0, cards.length - 1)];
}



function getStatus() {
	return "Дилер: " + dealer.join(", ") + ". Игрок: " + player.join(", ") + ".";
}

function oldGame() {
	do {
		var dealer = [getCard()];
		var player = [getCard(), getCard()];
		if (getSum(player) == 21) {
			alert(getStatus() + " 21 очко! Везунчик!");
		} else {
			do {
				var answer = prompt(getStatus() + " Хотите еще карту? 1 - да, иначе - нет.");
				if (answer == "1") {
					player.push(getCard());
				}
			} while(answer == "1" && getSum(player) < 21);
			if (getSum(player) == 21) {
				alert("21 очко - поздравляем, Вы выиграли!");
			} else if (getSum(player) > 21) {
				alert(getStatus() + " Перебор!");
			} else {
				while (getSum(dealer) < 17) {
				dealer.push(getCard());
				}
				if (getSum(dealer) == 21) {
					alert(getStatus() + " Сожалеем, у дилера Black Jack.");
				} else if (getSum(dealer) > 21) {
					alert(getStatus() + " У дилера перебор!");
				} else if (getSum(player) == getSum(dealer)) {
					alert(getStatus() + " Ничья!");
				} else if (getSum(player) > getSum(dealer)) {
					alert(getStatus() + " Поздравляем, Вы выиграли!");
				} else {
					alert(getStatus() + " Вы проиграли!");
				}
			}
		}
		var game = prompt("Играем еще? 1 - да, иначе - нет.");
	} while (game == 1);
}