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

const correctPassword = "valzhang";
let currentLink = "";

document.querySelectorAll(".popup-trigger")
.forEach(btn =>
  btn.addEventListener("click", e => {
      // stash the link
      currentLink = e.currentTarget.dataset.link;
      // reset to hidden state on open:
      pwdInput.type = "password";
      iconImg.src  = ICON_OFF;
      iconImg.alt  = "Show password";
      // show the modal
      const modal = document.getElementById("password-modal");
      modal.classList.add("is-visible");
      // auto-focus the input
      document.getElementById("password-input").focus();
    })
  );


document.getElementById("password-submit")
.addEventListener("click", () => {
 const pwd = document.getElementById("password-input").value;
 if (pwd === correctPassword) {
  window.open(currentLink, "_blank");
  closeModal();
} else {
 alert("Incorrect password. Please contact Val.");
}
});



// Paths to your icons
const ICON_ON  = "assets/img/home/visible_on.svg";
const ICON_OFF = "assets/img/home/visible_off.svg";

const pwdInput = document.getElementById("password-input");
const toggleBtn = document.getElementById("toggle-password");
const iconImg   = document.getElementById("password-icon");

toggleBtn.addEventListener("click", () => {
  const isHidden = pwdInput.type === "password";
  // flip input type
  pwdInput.type = isHidden ? "text" : "password";
  // swap icon and alt text
  iconImg.src = isHidden ? ICON_ON : ICON_OFF;
  iconImg.alt = isHidden ? "Hide password" : "Show password";
});



// 4) modal close logic
function closeModal() {
  document.getElementById("password-modal")
  .classList.remove("is-visible");
  document.getElementById("password-input").value = "";
  currentLink = "";
}

// close on “×”
document.querySelector(".cd-popup-close")
.addEventListener("click", closeModal);

// close on outside click
window.addEventListener("click", e => {
  if (e.target.id === "password-modal") closeModal();
});



// fire the “Show me” click when Enter is pressed
pwdInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();                       // prevent any default form submission
    document.getElementById("password-submit")
            .click();                         // reuse your existing click handler
          }
        });


