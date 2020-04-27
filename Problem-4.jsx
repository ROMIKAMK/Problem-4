
// includes jQuery, but feel free to write in vanilla JS if you prefer.
(function(){
  "use strict";

  var deck;
  var suit_container;
  var card_face;
	var suit_codes = {
		spades: "\u2660",
		hearts: "\u2665",
		clubs: "\u2663",
		diamonds: "\u2666"
	}
	//Create 13 cards per suit defined in suit_codes or 52 unique cards
	function createDeck(){
		deck = document.createElement("div");
		deck.className = "deck-container";
		for(var suit in suit_codes){
			// Create suit container in order to view all cards easily	
			suit_container = document.createElement("div");
			suit_container.className = "suit-column"; 			
			for(var i=1; i<=13; i++){
				createCard(suit, i); //call the function to create all the cards for the suit
			}
			deck.appendChild(suit_container); //add each suit to the deck 
		}
		document.body.appendChild(deck); //Add deck of cards to the body after all suits have been created
	}
	
	//creates a card
	function createCard(suit, cardNumber){
		card_face = document.createElement("div");
		card_face.className = "card-face";
		//red suites
		if("hearts" === suit || "diamonds" === suit){ 
			card_face.className = "card-face red-suit";
		}
		// Draw rest of the card
		drawCorners(suit, cardNumber); //draws top & bottom
		drawCenter(suit_codes[suit], cardNumber); 
		// Add new elements to the body
		suit_container.appendChild(card_face);
	}
	//Draws the top corner then adds a different class for the bottom right div
	function drawCorners(suit, cardNumber){
		var card_number_slot;
		var card_suit_slot;
		cardNumber = translateFaceCard(cardNumber); //Grabs the letter values, since A is used instead of 1, etc.
		for(var i=0; i<2; i++){
			var cardCorner_info = document.createElement("div");
			if(1 === i){ //flip the corner for the bottom right of the card
				cardCorner_info.className = "corner-elements rotate bottom-right";
			}else{
				cardCorner_info.className = "corner-elements";
			}
			// creates letter inside of a span- needs to be different size than suit image
			card_number_slot = document.createElement("span");
			card_number_slot.className = "card-number";
			card_number_slot.appendChild(document.createTextNode(cardNumber)); //add the suit of the card to the corners
			cardCorner_info.appendChild(card_number_slot);
			//creates the suit image using unicode characters inside of a span as well 			
			card_suit_slot = document.createElement("span");
			//for positioning purposes, add different classes to the spans. For some reason the unicode characters are slightly differnent sizes 			
			if("A" === cardNumber){
				card_suit_slot.className = "corner-bottom-3";
			}else if("J" === cardNumber || "K" === cardNumber || "Q" === cardNumber){
				card_suit_slot.className = "corner"+cardNumber;
			}else if(10 === cardNumber){
				card_suit_slot.className = "corner-bottom-10"; 
			}else if("hearts" === suit || "clubs" === suit){ 
				card_suit_slot.className = "corner-bottom-1";
			}else{
				card_suit_slot.className = "corner-bottom-2";
			}
			card_suit_slot.appendChild(document.createTextNode(suit_codes[suit])); //add the suit image to the parent
			cardCorner_info.appendChild(card_suit_slot);
			card_face.appendChild(cardCorner_info); //add corner information to the face container
		}
	}
	//Draw the center of the card
	function drawCenter(suit, cardNumber){
		var cardMiddle_info = document.createElement("div");
		//special face cards
		if(1===cardNumber|| 11===cardNumber || 12===cardNumber || 13===cardNumber){ 
			drawSpecialCard(cardMiddle_info, cardNumber,suit);
		}else{ //regular number cards
			cardMiddle_info.className = "slots";
			for(var i=0; i<cardNumber; i++){
				var slot = document.createElement("div");  
				/* I attempted to find a pattern to modularly draw the center of the cards based on the number. The closest I got is what you'll find below, which is grouping the cards based on visual patterns. If there's a better or smarter way to do this I'd be more than happy to learn it.	*/
				switch(cardNumber){
					case 2:
						slot.className = "col1" + " row"+i*3
						break;
					case 3:
						slot.className = "col1" + " row"+i*3
						if(2===i){
							slot.className = "col1" + " row4"
						}
						break;
					case 4: case 5:
						slot.className = "col"+(i%2*2) + " row0"
					 	if(i<2){
							slot.className = "col"+(i%2*2) + " row3"
						}else if(4===i){
							slot.className = "col1" + " row4"
						}
						break;
					case 6: case 7:
						slot.className = "col"+(i%2*2) + " row0"
						if(i<2){
							slot.className = "col"+(i%2*2) + " row3"
						}else if(i>3 && i<6){
							slot.className = "col"+(i%2*2) + " row4"
						}else if(i===6){
							slot.className = "col1" + " row5"
						}
						break;
					case 8: case 9: case 10:
						slot.className = "col0" + " row"+i%4
						if(i>3 && i<8){
							slot.className = "col2" + " row"+i%4
						}else if(i===8){
							slot.className = "col1" + " row5"
						}else if(i===9){
							slot.className = "col1" + " row6"
						}
						break;
				}
				slot.appendChild(document.createTextNode(suit)); //add the suit image cardNumber of times
				cardMiddle_info.appendChild(slot);
			}
			card_face.appendChild(cardMiddle_info); //add the middle of the card to the face contianer
		}
	}

	function drawSpecialCard(cardMiddle_info, cardNumber, suit){
			var letterValue = translateFaceCard(cardNumber);
			cardMiddle_info.className = "special-card";
			if(1===cardNumber){
				cardMiddle_info.appendChild(document.createTextNode(suit));
			}else{
				cardMiddle_info.appendChild(document.createTextNode(letterValue + suit));
			}
			card_face.appendChild(cardMiddle_info);
	}
	//Returns the corresponding letter for the special cards
	function translateFaceCard(cardNumber){
		//special face cards
		switch(cardNumber){ 
			case 1: 
				cardNumber = "A"
				break;
			case 11:
				cardNumber = "J"
				break;
			case 12:
				cardNumber = "Q"
				break;
			case 13:
				cardNumber = "K"
				break;
		}
		return cardNumber;
	}
	//Call function to create the deck of cards 	
	createDeck();
})();
/*
	Next steps:
	 * Make the cards responsive
	 * Flip the middle icons to match a real deck of cards as seen in this image https://en.wikipedia.org/wiki/Standard_52-card_deck#/media/File:Piatnikcards.jpg
	
*/