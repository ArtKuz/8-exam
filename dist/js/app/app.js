define(['app/random',
	    'jquery'], function(RandomChar, $) {
	
	var $yellowCharH = $('.person__yellow'),
	    $redCharH    = $('.person__red'),
	    $blueCharH   = $('.person__blue'),
	    $yellowCharF = $('.person__yellow.foot'),
	    $redCharF    = $('.person__red.foot'),
	    $blueCharF   = $('.person__blue.foot'),
	    $descChar    = $('.person__desc'),
	    $yellow      = $('.yellow'),
	    $red         = $('.red'),
	    $blue        = $('.blue'),
	    $content     = $('.content'),
	    $btnPlay     = $('.play'),
	    $history     = $('.history'),
	    $persons     = $('.persons'),
	    $personsF    = $('.persons__footer'),
	    $bigAvatar   = $('.this_story'),
	    $iconsStory  = $('.icons_story'),
	    $iconsY  	 = $('.icons_yellow'),
	    $iconsR  	 = $('.icons_red'),
	    $iconsB  	 = $('.icons_blue');

    App = function() {

    	this.color = '';

    	$yellowCharH.click($.proxy(this.yellow, this));
    	$redCharH.click($.proxy(this.red, this));
    	$blueCharH.click($.proxy(this.blue, this));
    	$yellowCharF.click($.proxy(this.yellowF, this));
    	$redCharF.click($.proxy(this.redF, this));
    	$blueCharF.click($.proxy(this.blueF, this));
    	$iconsY.click($.proxy(this.iconChar, this));
    	$iconsR.click($.proxy(this.iconChar, this));
    	$iconsB.click($.proxy(this.iconChar, this));
    }

    App.prototype.init = function() {
    	var app = this;

		switch(RandomChar) {
            case 1:
                app.yellow();
                break;

            case 2:
                app.red();
                break;

            case 3:
                app.blue();
                break;

            default:
                app.yellow();
                 break;
        }

        app.renderStory();
	};

    App.prototype.yellow = function(event) {
    	var app = this;

    	app.clearChar();
    	app.color = 'yellow';

    	hoverChar($redCharH, $yellowCharH);
    	hoverChar($blueCharH, $yellowCharH);

    	app.chengeChar($yellowCharH);
	}

    App.prototype.red = function(event) {
    	var app = this;

    	app.clearChar();
    	app.color = 'red';

    	hoverChar($yellowCharH, $redCharH);
    	hoverChar($blueCharH, $redCharH);

    	app.chengeChar($redCharH);
	}

    App.prototype.blue = function(event) {
    	var app = this;

    	app.clearChar();
    	app.color = 'blue';

    	hoverChar($yellowCharH, $blueCharH);
    	hoverChar($redCharH, $blueCharH);

    	app.chengeChar($blueCharH);
	}

    App.prototype.chengeChar = function(element) {
    	var app = this;

    	element.find('.person__' + app.color + '__avatar').addClass('active');
    	element.find('.person__desc').addClass('view');
    	app.renderStory();
	}

    App.prototype.yellowF = function(event) {
    	var app = this;

    	app.yellow();
    	scrollToElement($('.persons'));
	}

    App.prototype.redF = function(event) {
    	var app = this;

    	app.red();
    	scrollToElement($('.persons'));
	}

    App.prototype.blueF = function(event) {
    	var app = this;

    	app.blue();
    	scrollToElement($('.persons'));
	}

	App.prototype.clearChar = function() {
		var app = this;

		$('.person__' + app.color + '__avatar').removeClass('active');
		$descChar.removeClass('view');
		$yellow.hide();
		$red.hide();
		$blue.hide();
		$content.removeClass(app.color + '__color');
		$btnPlay.removeClass(app.color + '__color');
		$history.removeClass('history__' + app.color);
		$bigAvatar.removeClass(app.color + '_character');
	}

    App.prototype.renderStory = function() {
    	var app  = this;

		$('.' + app.color).show();
		$content.addClass(app.color + '__color');
		$btnPlay.addClass(app.color + '__color');
		$history.addClass('history__' + app.color);
		$bigAvatar.addClass(app.color + '_character');

		foot = $history.offset().top + $history.height();

		window.onscroll = function() {
			iconRender(app.color);

			if(isScrolledIntoView($('.' + app.color), foot)) {
				$bigAvatar.show();
				$iconsStory.show();
			} else {
				$bigAvatar.hide();
				$iconsStory.hide();
			}
    	}
	}

    App.prototype.iconChar = function(event) {
    	var app     = this,
    		element = event.target;

    	for (var i = 2; i < 6; i++) {
    		if ($(element).hasClass('icon_yellow_block' + i)) {
    			app.yellow();
    			scrollToElement($('.yellow_block' + i));
    		} else if ($(element).hasClass('icon_red_block' + i)) {
    			app.red();
    			scrollToElement($('.red_block' + i));
    		} else if ($(element).hasClass('icon_blue_block' + i)) {
    			app.blue();
    			scrollToElement($('.blue_block' + i));
    		}
    	}
	}

	function hoverChar(el1, el2) {
		el1.hover(
		  	function() {
		      el2.find('.person__desc').hide();
		    }, function() {
		      el2.find('.person__desc').css('display', '');
		    }
		)
	}

	function scrollToElement(el) {
		$('html,body').animate({
		    scrollTop: el.offset().top
		}, 800);
	}

	function isScrolledIntoView(el, foot) {

	    var docViewTop    = $(window).scrollTop(),
	    	elemTop       = $(el).offset().top,
	    	docViewBottom = docViewTop + $(window).height(),
	     	elemBottom    = elemTop + $(el).height() + Number($(el).css('padding-top').replace("px", ""));

	    return ((elemBottom >= docViewTop) && (elemTop <= docViewTop) && (docViewBottom <= foot));
	}

	function iconRender(color)	{
		var color2 = '',
			color3 = '';

		if (color == 'yellow') {
			color2 = 'red';
			color3 = 'blue';
		} else if (color == 'red') {
			color2 = 'yellow';
			color3 = 'blue';
		} else {
			color2 = 'yellow';
			color3 = 'red';
		}

		for (var i = 2; i < 6; i++) {
			if(isScrolledIntoView($('.' + color + '_block' + i), foot)) {
				$iconsY.attr('class',"icons_yellow");
				$iconsR.attr('class',"icons_red");
				$iconsB.attr('class',"icons_blue");
				$('.icons_' + color).addClass('icon_' + color + '_block' + i + '_active');
				$('.icons_' + color2).addClass('icon_' + color2 + '_block' + i);
				$('.icons_' + color3).addClass('icon_' + color3 + '_block' + i);
			} else {
				$('.icons_' + color).removeClass('icon_' + color + '_block' + i + '_active');
				$('.icons_' + color2).removeClass('icon_' + color2 + '_block' + i);
				$('.icons_' + color3).removeClass('icon_' + color3 + '_block' + i);
			}
		}
	}

	return App;
});