$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    $('.nav-toggle').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.nav-close').toggleClass('active');
        $('.header-nav').toggleClass('open');
        var offset = $('.nav-open .nav-toggle').offset();
        $('.nav-close').css({"padding-left": offset.left, "padding-top": (offset.top - document.documentElement.scrollTop)})
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        if ($(this).parents('.header-nav.open').length > 0) {
            $('.nav-toggle').toggleClass('active');
            $('.header-nav').toggleClass('open');
        }
    });

    /***************** Header BG Scroll ******************/

    $(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed');
                $('header').css({
                    "border-bottom": "none",
                    "padding": "20px"
                });
                $('header .member-actions').css({
                    "top": "26px",
                });
                $('header .navicon').css({
                    "top": "54px",
                });
                $('div.logo-container').addClass('nav-fixed');
            } else {
                $('section.navigation').removeClass('fixed');
                $('header').css({
                    "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                    "padding": "20px"
                });
                $('header .member-actions').css({
                    "top": "41px",
                });
                $('header .navicon').css({
                    "top": "40px",
                });
                $('div.logo-container').removeClass('nav-fixed');
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $(function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 90
                    }, 2000);
                    return false;
                }
            }
        });

    });


    /********************** Toggle Map Content **********************/
    $('#btn-show-map').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });
    $('#btn-show-content').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /********************** Add to Calendar **********************/
    var myCalendar = createCalendar({
        options: {
            class: '',
            // You can pass an ID. If you don't, one will be generated for you
            id: ''
        },
        data: {
            // Event title
            title: "Trouw Annelies en Yentl",

            // Event start date
            start: new Date('Jun 08, 2024 10:00'),

            // Event duration (IN MINUTES)
            // duration: 120,

            // You can also choose to set an end time
            // If an end time is set, this will take precedence over duration
            end: new Date('Jun 09, 2024 00:00'),

            // Event Address
            address: 'Salons De Groene Jager, Bredabaan 889, 2930 Brasschaat, Belgium'

            // Event Description
            // description: "We can't wait to see you on our big day. For any queries or issues, please contact Mr. Amit Roy at +91 9876543210."
        }
    });

    $('#add-to-cal').html(myCalendar);


    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var dataArray = $(this).serializeArray();
        var dataObj = {};
        for (var i = 0; i < dataArray.length; i++ ) {
            dataObj[dataArray[i].name] = dataArray[i].value
        }

        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

        grecaptcha.ready(function() { // Wait for the recaptcha to be ready
            grecaptcha
                .execute("6LcK88IkAAAAAJ1NsOqxot9q1yflYjHdYc-l8OLd", {
                    action: "submit"
                }) // Execute the recaptcha
                .then(function(token){
                    dataObj.captcha = token;
                    var data = JSON.stringify(dataObj);
                    $.ajax({
                        contentType: 'text/plain',
                        data: data,
                        dataType: 'text',
                        success: function(){
                            $('#alert-wrapper').html('');
                            $('#rsvp-modal').modal('show');
                        },
                        error: function(data){
                            $('#alert-wrapper').html(alert_markup('danger', data.message));
                        },
                        processData: false,
                        type: 'POST',
                        url: 'https://script.google.com/macros/s/AKfycbyGeqmDrni-dAI5hBlyjr_dA1E-P5YT3U1l_7qaLihc-Y8Ao4dQISXlXN3FWC1gVtef/exec'
                    });
                })
        })
    });

});

/********************** Extras **********************/

// Google map
function initMap() {
    var location = {lat: 51.3165503, lng: 4.5177063};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: location,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function initBBSRMap() {
    var la_fiesta = {lat: 51.3165503, lng: 4.5177063};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: la_fiesta,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: la_fiesta,
        map: map
    });
}

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}
