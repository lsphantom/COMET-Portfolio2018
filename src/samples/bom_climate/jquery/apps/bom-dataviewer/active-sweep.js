//========================
// BOM multiselect sweeper
//========================
// Setup sweeper functionality
$(document).ready(function() {

$('#bsi-form').change(function() {
// Setup vars
var leftDriver = $('select[name=ld]').val();
var leftVar = $('select[name=lv]').val();;
var leftSeason = $('select[name=ls]').val();;

var rightDriver = $('select[name=rd]').val();;
var rightVar = $('select[name=rv]').val();;
var rightSeason = $('select[name=rs]').val();;


var leftImgComp = leftDriver + leftSeason + leftVar;
var rightImgComp = rightDriver + rightSeason + rightVar;

var driverPath1 = 'la_nina/';
var driverPath2 = 'el_nino/';
var driverPath3 = 'neg_iod/';
var driverPath4 = 'pos_iod/';
var driverPath5 = 'ln_neg_iod/';
var driverPath6 = 'en_pos_iod/';

	// Left image comp switch
	switch (leftDriver) {
		case 'LN':
			$('#left-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath1 + leftImgComp + '.jpg');
			break;
		
		case 'EN':
			$('#left-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath2 + leftImgComp + '.jpg');
			break;
			
		case 'IODN':
			$('#left-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath3 + leftImgComp + '.jpg');
			break;
			
		case 'IODP':
			$('#left-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath4 + leftImgComp + '.jpg');
			break;
		
		case 'LN-IODN':
			$('#left-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath5 + leftImgComp + '.jpg');
			break;
		
		case 'EN-IODP':
			$('#left-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath6 + leftImgComp + '.jpg');
			break;
			
		default:
			$('#left-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath1 + leftImgComp + '.jpg');
			break;
	}
	
	// Right image comp switch
	switch (rightDriver) {
		case 'LN':
			$('#right-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath1 + rightImgComp + '.jpg');
			break;
		
		case 'EN':
			$('#right-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath2 + rightImgComp + '.jpg');
			break;
			
		case 'IODN':
			$('#right-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath3 + rightImgComp + '.jpg');
			break;
			
		case 'IODP':
			$('#right-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath4 + rightImgComp + '.jpg');
			break;
		
		case 'LN-IODN':
			$('#right-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath5 + rightImgComp + '.jpg');
			break;
		
		case 'EN-IODP':
			$('#right-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath6 + rightImgComp + '.jpg');
			break;
			
		default:
			$('#right-bsi-image').attr('src', 'samples/bom_climate/media/graphics/bsi/' + driverPath1 + rightImgComp + '.jpg');
			break;
	}
	
}).change();


// Initialize sweeper for interactive version
$(window).load(function(){
	
	// Generate Image Sweepers
	if (printVersion) {
		// Display Images (Take NO Action)
	}
	else {
		// BOM Sweeper Interaction
		$('.bsi-sweeper').twentytwenty({
	  		default_offset_pct: 0.5
		});
	};
	
});

	
    
});