(function($) {
  
  "use strict";  

  $(window).on('load', function() {

  /*Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });


    /* Auto Close Responsive Navbar on Click
    ========================================================*/
    function close_toggle() {
        if ($(window).width() <= 768) {
            $('.navbar-collapse a').on('click', function () {
                $('.navbar-collapse').collapse('hide');
            });
        }
        else {
            $('.navbar .navbar-inverse a').off('click');
        }
    }
    close_toggle();
    $(window).resize(close_toggle);

    /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });

    wow.init();

    /* 
    CounterUp
    ========================================================================== */
    $('.counter').counterUp({
      time: 500
    });  
    

     /* Testimonials Carousel 
    ========================================================*/
    var owl = $("#testimonials");
      owl.owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        center: true,
        margin: 15,
        slideSpeed: 1000,
        stopOnHover: true,
        autoPlay: true,
        responsiveClass: true,
        responsiveRefreshRate: true,
        responsive : {
            0 : {
                items: 1
            },
            768 : {
                items: 2
            },
            960 : {
                items: 3
            },
            1200 : {
                items: 3
            },
            1920 : {
                items: 3
            }
        }
      }); 

      // navscroll disappear and appear 
      // =============

     var lastScrollTop = 0;
     

$(window).scroll(function () {
  
var st = $(this).scrollTop();
var sd = lastScrollTop-st;

        if (st < lastScrollTop && sd > 40 || st==0 ){
            $('.navbar ').fadeIn( 'slow' );
        } else if(st > lastScrollTop && sd < -20) {
          $('.navbar ').fadeOut( 'slow' );
        }
        lastScrollTop = st;
  })





      


    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

  });      

}(jQuery));






// highlight

$(".highlight-link").each(function(){
        if ( $(this).isOnScreenHighlight() ) {
              $(this).addClass('shown');
            } else {
              $(this).removeClass('shown');
        }
  });


  $(window).scroll(function(){
    $(".highlight").each(function(){
          if ( $(this).isOnScreenHighlight() ) {
            $(this).addClass('shown');
              } else {
                  $(this).removeClass('shown');
          }
    });

    $(".highlight-link").each(function(){
          if ( $(this).isOnScreenHighlight() ) {
                  $(this).css("animation-delay","0s");
                  $(this).addClass('shown');
              } else {
                $(this).removeClass('shown');
          }
    });
  });

$.fn.isOnScreenHighlight = function(){

  // var fix = parseInt($(".navbar").css("height"));
  var win = $(window);

  var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();

  return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.bottom || viewport.top > bounds.bottom));

};




// contact-dialog pop-up

const dialog_button = document.getElementById("contact-dialog");
var modal = document.getElementById("myModal");

// Password to access the link
  const correctPassword = "valzhang";

  function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;

    if (passwordInput === correctPassword) {
      // Password is correct, open the link
       window.open("https://www.figma.com/file/Erya6GIh5VI7MBIa2m9FzH/Val-2023?type=design&node-id=567%3A90&mode=design&t=HzLauVBmk14pbpcz-1", "_blank"); 
    } else {
      alert("Incorrect password. Please contact Val.");
    }
  }

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("cd-popup-close")[0];

// if the dialog is clicked


dialog_button.onclick = function() {
  console.log("clikced");
  $('.cd-popup').addClass('is-visible');
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    $('.cd-popup').removeClass('is-visible');
  }
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  $('.cd-popup').removeClass('is-visible');
}



