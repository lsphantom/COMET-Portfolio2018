//========================
// BOM multiselect sweeper
//========================

// Setup spinner functionality
$(document).ready(function() {

var vegas = 0;
var magicNumber = 7;
var winner = Math.floor((Math.random() * 21) + magicNumber);

var spinVar = 0;

// Gamble
$('#vegas').on('click', function() {
  ++vegas;
});

// Spin on click to a random degree between 720 - 5760
$('.spin-btn').on('click', function() {

  var randomVar = Math.floor((Math.random() * 360) + 0);
  spinVar += 1080 + randomVar;
  
  //Spin the roulette [cw]
  $(this).parents('.spinner-wrap').find('.spinner').css({
    'transform': 'rotate(' + spinVar + 'deg)',
    '-moz-transform': 'rotate(' + spinVar + 'deg)'
  });
  
  var ballspinVar = spinVar * -1;
  
  //Spin the ball [ccw]
  $(this).parents('.spinner-wrap').find('.spinner-ball').css({
    'transform': 'rotate(' + ballspinVar + 'deg)',
    '-moz-transform': 'rotate(' + ballspinVar + 'deg)'
  });
 
$('#jckpt').remove();
$('#dbl-jckpt').remove();

if (vegas === magicNumber) {
	$('#vegas').after('<div id="jckpt"><h4>JACKPOT!!!</h4><p>You found the hidden jackpot. <span>&#9786;</span></p></div>');
} else if (vegas === winner) {
	$('#vegas').after('<div id="dbl-jckpt"><h4><span id="db-1">DOUBLE</span> <span id="db-2">JACKPOT</span>!!!</h4><p>You broke the roulette... <span>&#9785;</span><p></div>');
}

});


});