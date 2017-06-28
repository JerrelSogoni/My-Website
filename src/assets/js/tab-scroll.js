$( document ).ready(function() {
	$("#project-link").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#project-page").offset().top
	    }, 1000);
	    
	});

	$("#contact-link").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#contact-page").offset().top
	    }, 1000);

	});
});

