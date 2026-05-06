 



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

  // In case dynamic includes delay layout, hide preloader once includes finished too
  window.addEventListener('includes:loaded', function() {
    $('#preloader').fadeOut();
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

    // CounterUp - removed (no .counter elements in HTML)

          /* Testimonials Carousel - REMOVED (no testimonials sections in HTML)
     ========================================================*/
     // var owl = $("#testimonials");
     // owl.owlCarousel({
     //   loop: true,
     //   nav: false,
     //   dots: true,
     //   center: true,
     //   margin: 15,
     //   slideSpeed: 1000,
     //   stopOnHover: true,
     //   autoPlay: true,
     //   responsiveClass: true,
     //   responsiveRefreshRate: true,
     //   responsive : {
     //     0 : {
     //       items: 1
     //     },
     //     768 : {
     //       items: 2
     //     },
     //     960 : {
     //       items: 3
     //     },
     //     1200 : {
     //       items: 3
     //     },
     //     1920 : {
     //       items: 3
     //     }
     //   }
     // });  

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
  $(".highlight").not(".highlight-index").each(function(){
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

// Trigger hero underline animation exactly once after fonts/layout are ready
(function(){
  function runOnce(){
    var nodes = document.querySelectorAll('.highlight-index');
    nodes.forEach(function(el){ el.classList.add('animate'); });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runOnce);
  } else {
    window.addEventListener('load', function(){ setTimeout(runOnce, 50); });
  }
})();

// password

// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Only run on the dtcpay overview page
const path = window.location.pathname;
// only continue if we’re on work_1 OR work_2
if (!path.endsWith("dtcpay_work_1.html") && !path.endsWith("dtcpay_work_2.html") && !path.endsWith("nv_work_1.html")) return;

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
  pwdInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitBtn.click();
  }
});


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
      new WOW().init();
    } else {
      // ❌ wrong – stay in modal
      alert("Incorrect password. Please contact Val or try again.");
      pwdInput.focus();
    }
  });

  // 4) If user manually closes or clicks outside, redirect to index.html

closeIcon.addEventListener("click", () => history.back());
  window.addEventListener("click", e => {
    if (e.target === modal) history.back();
  });
});

// Exploding burger scroll animation
(function() {
  const burgerStack = document.getElementById("burgerStack");
  const burgerSection = document.getElementById("burger-explosion");
  if (!burgerStack || !burgerSection) return;

  // Spacing is designed at 320px wide, then scaled with the burger image.
  // This keeps the collapsed overlap visually consistent across screen sizes.
  const designStackWidth = 320;
  const collapsedSpacing = [
    { cssVar: "--space-1-2", value: -60 },
    { cssVar: "--space-2-3", value: -100 },
    { cssVar: "--space-3-4", value: -130 },
    { cssVar: "--space-4-5", value: -85 }
  ];
  const expandedSpacing = {
    mobile: {
      "--space-1-2": 5,
      "--space-2-3": 5,
      "--space-3-4": -10,
      "--space-4-5": 5
    },
    desktop: {
      "--space-1-2": -10,
      "--space-2-3": -20,
      "--space-3-4": -60,
      "--space-4-5": -20
    }
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateBurgerSpacing = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth < 992;
    const progress = clamp(scrollTop / (windowHeight * 0.5), 0, 1);
    const explodeThreshold = isMobile ? 0.2 : 0.8;
    const isExploded = progress > explodeThreshold;
    const firstLayerImage = burgerStack.querySelector(".burger-layer img");
    const renderedStackWidth = firstLayerImage
      ? firstLayerImage.getBoundingClientRect().width
      : burgerStack.getBoundingClientRect().width;
    const stackScale = renderedStackWidth / designStackWidth;
    const activeExpandedSpacing = isMobile ? expandedSpacing.mobile : expandedSpacing.desktop;

    collapsedSpacing.forEach(({ cssVar, value: collapsed }) => {
      const value = isExploded ? activeExpandedSpacing[cssVar] : collapsed * stackScale;
      burgerStack.style.setProperty(cssVar, `${value}px`);
    });

    const label = document.getElementById("topBunLabel");
    const lettuceLabel = document.getElementById("lettuceLabel");
    const cheeseLabel = document.getElementById("cheeseLabel");
    const meatLabel = document.getElementById("meatLabel");
    const bottomBunLabel = document.getElementById("bottomBunLabel");

    const labels = [label, lettuceLabel, cheeseLabel, meatLabel, bottomBunLabel];

    labels.forEach(label => {
      if (label) {
        if (isExploded) {
          label.classList.add("visible");
        } else {
          label.classList.remove("visible");
        }
      }
    });
  };

  let scheduled = false;
  const onScroll = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(() => {
        updateBurgerSpacing();
        scheduled = false;
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateBurgerSpacing);
  window.addEventListener("load", updateBurgerSpacing);
  updateBurgerSpacing();
})();
