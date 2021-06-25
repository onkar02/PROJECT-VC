(function ($)
  { "use strict"

/* 1. sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

/* 2. slick Nav */
// mobile_menu
    var menu = $('ul#navigation');
    if(menu.length){
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '+',
        openedSymbol:'-'
      });
    };

/* 3. Banner Slider*/
  $('.slider').slick({
    autoplay: true,
    speed: 800,
    lazyLoad: 'progressive',
    arrows: false,
    dots: true,
    }).slickAnimation();

/* 4. Features Slider*/    
    $('.featuresimgList').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      dots: true,
      autoplay: true,
      speed: 800,
      asNavFor: '.featuresdataList',
      responsive: [
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows:true
        }
        },
    ]
      });
      $('.featuresdataList').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.featuresimgList',
      dots: false,
      arrows: false,
      focusOnSelect: true
    });


/* 5. Map Chart*/
  

/* 7. Testimonials Slider*/
    $('.testimonials').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: true,
        speed: 800
    });

/* 8. Material Design Form */
  const setActive = (el, active) => {
    const formField = el.parentNode.parentNode;
    if (active) {
        formField.classList.add("form-field--is-active");
    } else {
        formField.classList.remove("form-field--is-active");
        el.value === "" ?
        formField.classList.remove("form-field--is-filled") :
        formField.classList.add("form-field--is-filled");
    }
    };

    [].forEach.call(
    document.querySelectorAll(".form-field__input, .form-field__textarea"),
    el => {
    el.onblur = () => {
        setActive(el, false);
    };
    el.onfocus = () => {
        setActive(el, true);
    };
    });

    /* 9. Services */

    if ($(window).width() < 768) {
      $('.mobileSlider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }

    /* 9. Latest Updates */

    // if ($(window).width() < 768) {
    //   $('.latestNewsListing').slick({
    //     dots: false,
    //     arrows: true,
    //     infinite: true,
    //     speed: 600,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    //   });
    // }
    $('.latestNewsListing').slick({
      dots: false,
      arrows: true,
      infinite: true,
      autoplay: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
          {
          breakpoint: 992,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: false
          }
          },
          {
          breakpoint: 768,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1
          }
          },
          {
            breakpoint:640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
          }
          },
      ]
      });

      $('.YTubeVideoListing').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1
      });

    /* 9. Gallery */
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
    

})(jQuery);


