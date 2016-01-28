var dilerHand = [];
var playerHand = [];
var deck = makeDeck();

function doNewGame() {
	dilerHand = [];
	playerHand = [];
	/*$("#diler1").empty(); 
	$("#diler2").empty();
	$("#player1").empty();
	$("#player2").empty();
	$("#player3").empty();
	$("#player4").empty();
	$("#player5").empty();
	$("#player6").empty();*/

	doNewGameDiler();
	doNewGamePlayer();
}

function doNewGamePlayer() {

	function player1() {
		var cardIndex = Math.floor(Math.random() * deck.length);
		playerHand.push(deck[cardIndex]);
		deck.splice(cardIndex, 1);
		return document.getElementById("player1").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
	}
	function player2() {
		var cardIndex = Math.floor(Math.random() * deck.length);
		playerHand.push(deck[cardIndex]);
		deck.splice(cardIndex, 1);
		return document.getElementById("player2").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
	}
	function player3() {
		var cardIndex = Math.floor(Math.random() * deck.length);
		playerHand.push(deck[cardIndex]);
		deck.splice(cardIndex, 1);
		return document.getElementById("player3").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
	}
	return player1() + player2() + player3();
}

function doNewGameDiler() {
	function diler1() {
		var cardIndex = Math.floor(Math.random() * deck.length);
		dilerHand.push(deck[cardIndex], deck[cardIndex]);
		deck.splice(cardIndex, 1);
		return document.getElementById("diler1").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
	}
	function diler2() {
		var cardIndex = Math.floor(Math.random() * deck.length);
		dilerHand.push(deck[cardIndex], deck[cardIndex]);
		deck.splice(cardIndex, 1);
		return document.getElementById("diler2").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
	}
	return diler1() + diler2();
}
	


function doMore() {
	if (playerHand.length < 6) {
		var cardIndex = Math.floor(Math.random() * deck.length);
		playerHand.push(deck[cardIndex]);
		if (playerHand.length == 4) {
			return document.getElementById("player4").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
		} else if (playerHand.length == 5) {
			return document.getElementById("player5").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
		} else {
			return document.getElementById("player6").innerHTML = "<img src = \"" + getCardFileName(deck[cardIndex]) + "\">";
		}
	} else {
		alert("Лимит карт исчерпан. Начни новую игру!");
	}
	
	
}

function doStop() {
	alert("doStop");
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


function getCardFileName(card) {
	return "pictures/cards-" + getCardDenomination(card) + "-" + getCardSuit(card) + ".png";
}


function getCardDenomination(card) {
	var denominations = ["A", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var denominationNames = ["00", "02", "03", "04", "05", "06", "07", "08", "09"];
	var cardDenomination = card.split(".");
	var index = denominations.indexOf(cardDenomination[0]);
	return denominationNames[index];
}

function getCardSuit(card) {
	var suit = ["1", "2", "3", "4"];
	var suitNames = ["00", "02", "03", "04"];
	var cardSuit = card.split(".");
	return "0" + (parseInt(cardSuit[1]) - 1);
}



///////////////////////////////////////////////////////////////////////////////////////////


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getCard() {
	var cards = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	return cards[getRandomInt(0, cards.length - 1)];
}

function getSum(arr) {
	var sum = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == "J" || arr[i] == "Q" || arr[i] == "K") {
			sum += 10;
		} else if (arr[i] == "A") {
			sum += (sum + 11 > 21) ? 1 : 11;
			/*if (sum + 11 > 21) {
				sum += 1;
			} else {
				sum += 11;
			}*/
		} else {
			sum += parseInt(arr[i]);
		}
	}
	return sum;
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
