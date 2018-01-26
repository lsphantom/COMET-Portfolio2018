$(document).ready(function(){
//==================
//Primary variables
var numberOfQuestions = 3; //Number of presented questions per attempt
var attemptNumber = 1;
var continueButton = $('#fws-submit-btn');
var userResponse;
var uxStage = $('.fws-page.current').data('stage');  //Current Stage level [1-3 or feedback]

//=================
//Randomize options function
function randomizeSelection (){
	$('.fws-random-responses').each(function(){
	var $resList = $(this);
	var $resArray = [];

	//Get current array
	var $res = $(this).children('.response-group-item');
	$res.each(function(i){
		$resArray.push($res[i]);
	});	

	//Shuffle function
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	  }
	  return array;
	}

	//Shuffle current array
	var arr = $resArray;
	arr = shuffle(arr);

	//Append new array
	$resList.append(arr);
	});
}
randomizeSelection();



//Append first attempt number
$('#fws-attempt-count').text(attemptNumber);



//Dynamic model data function
function modelDataUpdate () {
	if ( uxStage === 1 ) {
		$('#mod-data').parent('.panel').removeClass('hidden');
		$('#tab2-identifyer').addClass('hidden');
	} else if ( uxStage === 2 ) {
		$('#tab2-identifyer').removeClass('hidden');
	} else {
		$('#mod-data').parent('.panel').addClass('hidden');
	}
}
modelDataUpdate();


// [continue] on click actions
$(continueButton).click(function(e){
	//Local storage
	userResponse = $('.current input[type=radio]:checked').val();
	uxStage += 1;

	
	//UX Actions
	if ( userResponse != null ) {
		//Set local storage ( Key Name: Attempt Number + Question Number , Value: User Response )
		localStorage.setItem( 'A' + attemptNumber + 'Q' + (uxStage - 1) + '', userResponse );
		$(this).attr('disabled', '');
		$('.current .response-group-item').children('input').attr('disabled', '');
		$('.current').removeClass('current');
		randomizeSelection();
		nextStage();
		modelDataUpdate();
		
	} else {
		e.preventDefault();
		$('.current .message').css('display', 'block');
	}
	
	function nextStage () {
	//UX switch stage or display feedback
	if (uxStage === numberOfQuestions + 1){
		// Write current Responses
		var response1 = localStorage.getItem('A' + attemptNumber + 'Q1');
		var response2 = localStorage.getItem('A' + attemptNumber + 'Q2');
		var response3 = localStorage.getItem('A' + attemptNumber + 'Q3');

		// Combine current responses
		var currentResponses = response1 + response2 + response3;
		
		//console.log( "Attempt: " + attemptNumber );
		//console.log("Responses: " + currentResponses);
		
		// Navigate to feedback stage
		$('.fws-page[data-stage="feedback"]').addClass('current');
		// Hide continue button
		$(continueButton).addClass('hidden');
		
		
		
		// Feedback Loops set for number of questions
		if ( attemptNumber !== numberOfQuestions ){
			// Actions for normal attempts
			switch (currentResponses){
				case "aaa":
					//alert('You took the right path');
					$('#fws-correct-statement').removeClass('hidden');
					$('#fws-end-btn').removeClass('hidden');
					break;
				default:
					//alert('Did not follow the right path, try again!');
					$('#fws-incorrect-statement').removeClass('hidden');
					$('#fws-retry-btn').removeClass('hidden');
					break;
			}
		} else {
			// Actions for last attempt
			
			// Display last attempt basic feedback
			switch (currentResponses){
				case "aaa":
					//alert('Third attempt - All correct answers');
					$('#fws-correct-statement').removeClass('hidden');
					$('#fws-end-btn').removeClass('hidden');
					break;
				
				default:
					//alert('Third attempt - Incorrect answers');
					$('#fws-incorrect-statement').removeClass('hidden');
					$('#fws-end-btn').removeClass('hidden');
					break;
			}
			
			// Display last attempt specific feedback
			// Response 1
			if (response1 === "a"){
				$('#fws-1a').removeClass('hidden');
			} else if (response1 === "b"){
				$('#fws-1b').removeClass('hidden');
			} else if (response1 === "c"){
				$('#fws-1c').removeClass('hidden');
			} else {}
			
			// Response 2
			if (response2 === "a"){
				$('#fws-2a').removeClass('hidden');
			} else if (response2 === "b"){
				$('#fws-2b').removeClass('hidden');
			} else if (response2 === "c"){
				$('#fws-2c').removeClass('hidden');
			} else {}
			
			
			// Response 3 overhead
			if (response1 === "a" && response2 === "a"){
				// Response 3 feedback
				if (response3 === "a"){
					$('#fws-3a').removeClass('hidden');
				} else if (response3 === "b"){
					$('#fws-3aab').removeClass('hidden');
				} else if (response3 === "c"){
					$('#fws-3aac').removeClass('hidden');
				}
			} else {
				// Response 3 feedback
				if (response3 === "a"){
					$('#fws-3ax').removeClass('hidden');
				} else if (response3 === "b"){
					$('#fws-3b').removeClass('hidden');
				} else if (response3 === "c"){
					$('#fws-3c').removeClass('hidden');
				}
			}
			
			
		}
	} else {
		// Navigate to next stage
		$('.fws-page[data-stage="' + uxStage + '"][data-order="' + userResponse +'"]').addClass('current');
		// Clear choices if they're selected from previous attempt
		$('.current .response-group-item').children('input:checked').removeAttr('checked');
		$('.current .response-group-item').children('input').removeAttr('disabled');
		
	}
	}
	
	
	//UPDATE PROGRESS BAR
	switch (uxStage) {
		case 1:
			$('#fws-progress-bar').val('0');
			break;
		case 2:
			$('#fws-progress-bar').val('33');
			break;
		case 3:
			$('#fws-progress-bar').val('66');
			break;
		case 4:
			$('#fws-progress-bar').val('100');
			break;
		default:
			$('#fws-progress-bar').val('0');
			break;
	}
	
});





//Check for changes in current answer selection
$('.fws-random-responses input[type=radio]').change(function(){
	userResponse = $('.current input[type=radio]:checked').val();
	continueButton.removeAttr('disabled');

});




// Increase attempt count on completion
$('#fws-retry-btn').on('click', function() {
	//Write new attempt number
	attemptNumber++;
	$('#fws-attempt-count').text(attemptNumber);
	$('.fws-feedback').addClass('hidden');
	//Reset progress bar
	$('#fws-progress-bar').val('0');
	//Hide feedback and return cleared stage 1
	$('.current').removeClass('current');
	randomizeSelection();
	//Unhide continue button
	$(continueButton).removeClass('hidden');
	uxStage = 1;
	$('.fws-page[data-stage="' + uxStage + '"]').addClass('current');
	$('.current .response-group-item').children('input:checked').removeAttr('checked');
	$('.current .response-group-item').children('input').removeAttr('disabled');
	//Unhide model data
	$('#mod-data').parent('.panel').removeClass('hidden');
	modelDataUpdate();
});




});