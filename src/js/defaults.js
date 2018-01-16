//COMET 2018 PORTFOLIO
$(document).ready(function(){
	//Init scrollmagic
	var controller = new ScrollMagic.Controller();
	
	//index page scene
	var indexScene = new ScrollMagic.Scene({
		triggerElement: '.header-heading',
		reverse: false
	})
	.setClassToggle('.intro-text', 'fade-in')
	.addTo(controller);
	



	//our work scene
	var workScene = new ScrollMagic.Scene({
		triggerElement: '.portfolio-item-card',
		reverse: false
	})
	.setClassToggle('.portfolio-item-card', 'fade-in')
	.addTo(controller);


});