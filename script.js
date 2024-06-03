$(document).ready(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    function checkInView() {
        $('.fade-section').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    }

    $(window).on('scroll resize', checkInView);
    $(window).trigger('scroll');
    $('.text-section h2, .text-section h1, .text-section p, .image-section img, .text-section button').hide().fadeIn(2000);

    // Button bounce effect
    $('.text-selection #contact-button').click(function() {
        $(this).effect("bounce", { times: 3 }, "slow");
    });

    $('#contact-button').click(function() {
        console.log("Open form button clicked");
        $('#popup-form').fadeIn();
    });

    // Close the pop-up form
    $('.close-btn').click(function() {
        console.log("Close button clicked");
        $('#popup-form').fadeOut();
        // Reset the form
        $('#popup-form').show();
    });

    // Close the pop-up form when clicking outside of the form
    $(window).click(function(event) {
        if ($(event.target).is('#popup-form')) {
            console.log("Clicked outside the form");
            $('#popup-form').fadeOut();
            // Reset the form
            $('#popup-form').show();
        }
    });
    

    // Handle form submission
    $('#popup-form').submit(function(event) {
        event.preventDefault();
        console.log("Form submitted");

        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                console.log("Form successfully submitted", response);
                $('#popup-form').fadeOut();
                // Reset the form
                $('#contact-form').show();
            },
            error: function(xhr, status, error) {
                console.log("Form submission failed", status, error);
            }
        });
    });

    $('.option').click(function(){
        // Remove active class from all options
        $('.option').removeClass('active');
        // Add active class to the clicked option
        $(this).addClass('active');
        // Get the new image source from the src attribute of the img inside the clicked option
        var newImage = $(this).find('img').attr('src');
        // Change the image source
        $('#main-image').attr('src', newImage);
    });
        $('.content').hover(function() {
            // Remove 'active' class from all content divs
            $('.content').removeClass('active');
            
            // Add 'active' class to the clicked content div
            $(this).addClass('active');
            
            // Change the image
            var newImage = $(this).data('image');
            $('#main-image').attr('src', newImage);
        });
        
});
