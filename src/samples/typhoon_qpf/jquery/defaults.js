// ********************************************************************* //
// * LATEST CORE 2 - Default Functions
// * (Do NOT alter this document! - Override defaults by placing them in the document <head>)
// ********************************************************************* //

// ===============================
// MODULE PRINT VIEW CONTROL
// ===============================
$(document).ready (function (){	
	
	// Auto controls hiding of elements in Print View or Module View.
	if (printVersion) {
		$(document.body).addClass('prt');
		}
	else {
		$(document.body).addClass('dyn');
		};
});

// ===============================
// JQUERY UI COMPONENTS
// ===============================

// Sortable List Items (jQuery UI)
$(function() {
	$( '.sortable' ).sortable({placeholder: 'ui-state-highlight'});
	$( '.sortable' ).disableSelection();
});
	
// Back-to-Top Button
$(function(){
	// hide .back-top first
	$('.back-top').hide();
		// fade in .back-top
		$(function () {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) {
					$('.back-top').fadeIn();
				} else {
					$('.back-top').fadeOut();
				}
		});
		// scroll body to 0px on click
		$('.back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
			});
		});
});

// ===============================
// BOOTSTRAP COMPONENTS
// ===============================

// Tooltips and Popovers
$(function() {
   $('[data-toggle="tooltip"]').tooltip();
   $('.lc-tip, .lc-tip-top').tooltip({ placement : 'top' });
   $('.lc-tip-right').tooltip({ placement : 'right' });
   $('.lc-tip-bottom').tooltip({ placement : 'bottom' });
   $('.lc-tip-left').tooltip({ placement : 'left' });
   
   $('[data-toggle="popover"]').popover();
   $('.lc-pop, .lc-pop-top').popover({ placement : 'top' });
   $('.lc-pop-right').popover({ placement : 'right' });
   $('.lc-pop-bottom').popover({ placement : 'bottom' });
   $('.lc-pop-left').popover({ placement : 'left' });
});

// SIDEBAR - Stick to Top
$(function(){
	$('#toc-panel').affix({
      offset: {
      	top: 150, // This must be the same size as the Module Top-Banner height in pixels
	  	bottom: function () {
        return (this.bottom = $('#module-footer').outerHeight(true))
      	}
      }
  	})
});
// SIDEBAR - Collapse for Smaller Devices
$(window).resize (function() {
  if ($(window).width() <= 992) {  
    $('#collapse-toc').removeClass('in');
  }
  if ($(window).width() >= 992) {  
    $('#collapse-toc').addClass('in');
  }
});
//SIDEBAR - Collapse on Window Resize
$(function(){
  if ($(window).width() <= 992) {  
    $('#collapse-toc').removeClass('in');
  }
});
// SIDEBAR - Size fix at smaller size
$(function(){
	if ($('#toc-panel').hasClass('affix-top')) {
  		$('#toc-panel').removeClass('col-xs-12')
	}
	else if ($('#toc-panel').hasClass('affix')) {
  		$('#toc-panel').addClass('col-xs-12')
	};
});
$(window).scroll(function(){
	if ($('#toc-panel').hasClass('affix-top')) {
  		$('#toc-panel').removeClass('col-xs-12')
	}
	else if ($('#toc-panel').hasClass('affix')) {
  		$('#toc-panel').addClass('col-xs-12')
	};
});

// TABLE OF CONTENTS - Scroll Spy
$(function(){
	$('body').scrollspy({ target: '.sidebar-toc' });
});


// ===============================
// LEARNING INTERACTIONS
// ===============================

$(function(){
  
  // MULTIPLE CHOICE QUESTION - RADIO BUTTONS
  $('.radio .submit-button').click(function(){
	var my_boolean=false;
	for (i=1; i< this.form.length-1; i++){
		if (this.form[i].checked==true){
			my_boolean = true;
		}
	}//end for loop

	if (my_boolean){
		//alert(i);
	  $(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
	  $(this).parent().parent().parent().children('.answer')
	  .css('display', 'block');
	  $(this).parent().parent().parent().children('.message')
	  .css('display', 'none');
	  $(this).siblings('.correct')
	  .addClass('correct-answer');
	  
	  $(this).closest('.question-wrap').next('.show-after').show();
	  $(this).closest('.interaction-question').next('.show-after').show();
	  $(this).closest('.show-after').next('.show-after').show();
	}else{
		$(this).parent().parent().parent().children('.answer')
	  .css('display', 'none');
		$(this).parent().parent().parent().children('.message')
	  .css('display', 'block');
	   $(this).siblings('.correct')
	  .removeClass('correct-answer');
	}//end if else
  });
  
  // MULTIPLE SELECT QUESTIONS - CHECKBOXES
  $('.checkboxes .submit-button').click(function(){
	var my_boolean=false;
	for (i=1; i< this.form.length-1; i++){
		if (this.form[i].checked==true){
			my_boolean = true;
		}
	}//end for loop

		if (my_boolean){
		  //alert(i);
	      $(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
		  $(this).parent().parent().parent().children('.answer')
		  .css('display', 'block');
		  $(this).parent().parent().parent().children('.message')
		  .css('display', 'none');
		  $(this).siblings('.correct')
		  .addClass('correct-answer');
		  
		  $(this).closest('.question-wrap').next('.show-after').show();
	  	  $(this).closest('.interaction-question').next('.show-after').show();
	      $(this).closest('.show-after').next('.show-after').show();
		}else{
			$(this).parent().parent().parent().children('.answer')
		  .css('display', 'none');
			$(this).parent().parent().parent().children('.message')
		  .css('display', 'block');
		   $(this).siblings('.correct')
		  .removeClass('correct-answer');
		}//end if else
  });
  
  // SHORT/LONG ANSWER QUESTION - TEXT ENTRY 
  $('.textentry .submit-button').click(function(){
	$(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
    $(this).closest('.question-wrap').find('.answer').show();
    $(this).closest('.question-wrap').find('.correct').addClass('correct-answer');
    $(this).closest('.question-wrap').next('.show-after').show();
	
  	$(this).closest('.interaction-question').next('.show-after').show();
  	$(this).closest('.show-after').next('.show-after').show();
  });
   
  // SHORT/LONG ANSWER QUESTION (MINIMUM CHARACTER REQUIREMENT) - TEXT ENTRY
  $('.req-text').each(function(){
	  $('.req-text .submit-button').click(function(){
		var inputText = $(this).parent().find('.text-response').val();
		var characterMin = $(this).parent().find('.text-response').attr('data-text-min');
		
		if ( inputText.length > characterMin ){
			$(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
			$(this).closest('.question-wrap').find('.answer').show();
			$(this).closest('.question-wrap').find('.correct').addClass('correct-answer');
			$(this).closest('.question-wrap').next('.show-after').show();
			$(this).parent().parent().siblings('.message').css('display', 'none');
			
  			$(this).closest('.interaction-question').next('.show-after').show();
  			$(this).closest('.show-after').next('.show-after').show();
		}
		else {
			$(this).parent().parent().siblings('.message').css('display', 'block');
		}
	  });
  });
  
  // COMPLETE THE STATEMENT - INLINE DROPDOWNS
  $('.inlinedropdowns .submit-button').click(function(){
	$(this).attr('disabled','disabled')
		.addClass('btn-default').removeClass('btn-primary');
	$(this).parent().children('.dropdown_correct')
		.css('display','block');
	$(this).parent().parent().parent().children('.answer')
		.css('display','block');
	  $(this).siblings('.correct').addClass('correct-answer');
	  
	  $(this).closest('.question-wrap').next('.show-after').show();
	  $(this).closest('.interaction-question').next('.show-after').show();
	  $(this).closest('.show-after').next('.show-after').show();
  });

  // REORDERING QUESTIONS - SORTABLE LIST
  $('.reordering .submit-button').click(function(){
  $(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
  $(this).parent().children('.dropdown-correct')
	.css('display','block');
  $(this).parent().parent().parent().children('.answer')
	.css('display','block');
  $(this).siblings('.correct')
	.addClass('correct-answer');
  
  $(this).closest('.question-wrap').next('.show-after').show();
  $(this).closest('.interaction-question').next('.show-after').show();
  $(this).closest('.show-after').next('.show-after').show();
  });
  
  // NESTED QUESTION - Reset
  $('.show-after').hide();
  
  // DRAG AND DROP QUESTION - Done
  $('.question-wrap-drag .done_drag').click(function(){
    $(this).closest('.question-wrap-drag').find('.answer').show();
    $(this).closest('.question-wrap-drag').find('.correct').addClass('correct-answer');
    $(this).closest('.question-wrap-drag').next('.show-after').show();
  });
  // DRAG AND DROP QUESTION - Reset
  $('.question-wrap-drag .reset_drag').click(function(){
    $(this).closest('.question-wrap-drag').find('.answer').hide();
    $(this).closest('.question-wrap-drag').find('.correct').removeClass('correct-answer');
    $(this).closest('.question-wrap-drag').next('.show-after').hide();
  });
  
  // DRAWING QUESTION - Done
  $('.question-wrap-draw .done').click(function(){
    $(this).closest('.question-wrap-draw').find('.answer').show();
    $(this).closest('.question-wrap-draw').find('.correct').addClass('correct-answer');
	$(this).closest('.question-wrap').find('.answer').show();
    $(this).closest('.question-wrap-draw').next('.show-after').show();
  });
  // DRAWING QUESTION - Reset
  $('.question-wrap-draw .reset').click(function(){
    $(this).closest('.question-wrap-draw').find('.answer').hide();
    $(this).closest('.question-wrap-draw').find('.correct').removeClass('correct-answer');
	$(this).closest('.question-wrap').find('.answer').show();
    $(this).closest('.question-wrap-draw').next('.show-after').hide();
  });
  
});


// ===============================
// Radio Button Image Switcher
// ===============================
$(document).ready(function() {
	$('.radio-image-selector').each(function() {
		$(this).find('.rs-list li input').each(function(r) {
           var inputValue = r;
		   $(this).val(r);		   
        });
		var currentInput = $(this).find('input[type=radio]:checked').val();
			currentInput = parseInt($(this).find(':checked').val());
			//currentInput += -1; used with manual values to begin index @ 1
		
        $(this).children('.rs-content').children().eq( currentInput ).css('display', 'block');
		
		$(this).on('input[type=radio]').change(function(){
			currentInput = parseInt($(this).find(':checked').val());
			//currentInput += -1; used with manual values to begin index @ 1
			$(this).find('.rs-content').children().css('display', 'none');
			$(this).find('.rs-content').children().eq( currentInput ).css('display', 'block');
			
		});
		var listChildNum = $(this).find('.rs-list').children().length;
		var contentChildNum = $(this).find('.rs-content > *').length;
		if (listChildNum !== contentChildNum) {
			$(this).prepend('<p style="font-weight:bold; font-style:italic; color:red;">Number of radio buttons does NOT match number of content items!</p>');
		}
    });
});


// ===============================
// MODULE TITLE
// ===============================
$(document).ready(function() {
	var moduleTitle = $('title').text();
	$('.module-title-text').html( moduleTitle );
});


// ===============================
// MODULE QUIZ AND SURVEY PROMPTS
// ===============================

// Set the Quiz and Survey ID
var moduleQuiz = 1223;

// Module Preassessment, Quiz, and Survey Modal Prompts
$(document).ready(function() {
	// Preassessment Text
	$('#preassessment-message').prepend('<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="preassessment-label">Pre-Assessment</h4></div><div class="modal-body" id="module-preassessment-modal"><p>Before you begin, please complete a short pre-assessment by clicking the button below.<br><br>This pre-assessment covers material in the lesson that you are about to take, and it will help you gauge your current level of understanding of this topic. You will have the opportunity to take a quiz with very similar questions after you have completed the lesson. Comparing the two will help you see how much you’ve learned and will also help us see how well the lesson achieves its goals.</p></div>');
	
	// Quiz Prompt
	//var moduleQuiz = $('#quiz-prompt').attr('data-item-id');
	$('#quiz-prompt').append('<div id="userQuiz" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="userquiz-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="userquiz-label">Quiz</h4></div><div class="modal-body" id="module-userquiz-modal"><p>If you are viewing this page from a downloaded version of the lesson, you will need to be connected to the Internet in order to access the quiz. If you haven’t logged in on MetEd or you need to create a MetEd account, you will be prompted to do so. Your progress in the quiz is saved each time you choose "Save Answer and Continue," even if you close your browser and continue at a later time. You may skip a question and return to it at any point. Once you have saved answers to all questions, your score is calculated and reported.</p><a href="http://www.meted.ucar.edu/about_external_lms.htm" target="_blank">Important note for NOAA, Air Force, and Navy LMS users!</a> </div><div class="modal-footer"> <a class="btn btn-default" href="http://www.meted.ucar.edu/loginForm.php?urlPath=logonOption.php&quizID='+moduleQuiz+'&fromModule=true" target="_blank">Go to the Quiz »</a> </div></div></div></div>');
	
	// Survey Prompt
	$('#quiz-prompt').append('<div id="userSurvey" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="usersurvey-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="usersurvey-label">User Survey</h4></div><div class="modal-body" id="module-usersurvey-modal"><p>We can’t improve without your help. Please let us know what you thought of this product. Your responses will help us create more effective instruction in the future. <br><br>Clicking the following link will take you to a short survey. If you are viewing this page from a downloaded version of the lesson, you will need to be connected to the Internet. If you haven’t logged in on MetEd or you need to create a MetEd account, you will be prompted to do so.</p></div><div class="modal-footer"> <a class="btn btn-default" href="http://www.meted.ucar.edu/registration/surveys/logonOption.php?quizID='+moduleQuiz+'" target="_blank">Go to the user survey »</a> </div></div></div></div>');
});

// ===============================
// PRINT LESSON IMG CAPTION FIX
// ===============================
function captionFix () {
	$('div.center.caption').each(function() {
		if ($(this).children('img').length > 0){
			var capWidth = $(this).children('img')[0].clientWidth;
			if (capWidth >= 960) {
				$(this).css('max-width', '960px');
				$(this).css('min-width', '650px');
			} else {
				$(this).css('max-width', '' + capWidth + 'px');
				$(this).css('min-width', '650px');
			}
		} else {
			var loopCapWidth = $(this).prevAll().closest('a').children('img')[0].width;
			$(this).css('max-width', '' + loopCapWidth + 'px');
			$(this).css('min-width', '650px');
		}		
    });
}