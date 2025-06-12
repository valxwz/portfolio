 



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

// password

// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Only run on the dtcpay overview page
const path = window.location.pathname;
// only continue if we’re on work_1 OR work_2
if (!path.endsWith("dtcpay_work_1.html") && !path.endsWith("dtcpay_work_2.html")) return;

  const modal            = document.getElementById("password-modal");
  const protectedContent = document.getElementById("protected-content");
  const pwdInput         = document.getElementById("password-input");
  const toggleBtn        = document.getElementById("toggle-password");
  const iconImg          = document.getElementById("password-icon");
  const submitBtn        = document.getElementById("password-submit");
  const closeIcon        = document.querySelector(".cd-popup-close");

  const correctPassword  = "valzhang";
  const ICON_ON          = "assets/img/home/visible_on.svg";
  const ICON_OFF         = "assets/img/home/visible_off.svg";

  // 1) Show modal immediately and hide the rest
  modal.classList.add("is-visible");
  protectedContent.style.display = "none";
  document.body.style.overflow   = "hidden";
  if (pwdInput) pwdInput.focus();

  // 2) Toggle “eye” icon to show/hide the password
  toggleBtn.addEventListener("click", () => {
    const isHidden = pwdInput.type === "password";
    pwdInput.type = isHidden ? "text" : "password";
    iconImg.src   = isHidden ? ICON_ON : ICON_OFF;
    iconImg.alt   = isHidden ? "Hide password" : "Show password";
  });

  // 3) Handle “Show me” button
  submitBtn.addEventListener("click", () => {
    if (pwdInput.value === correctPassword) {
      // ✅ correct – reveal page
      modal.classList.remove("is-visible");
      protectedContent.style.display = "";
      document.body.style.overflow   = "";
    } else {
      // ❌ wrong – stay in modal
      alert("Incorrect password. Please try again.");
      pwdInput.focus();
    }
  });

  // 4) If user manually closes or clicks outside, redirect to index.html

closeIcon.addEventListener("click", () => history.back());
  window.addEventListener("click", e => {
    if (e.target === modal) history.back();
  });
});

