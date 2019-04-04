jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // $('a[href="#"]').click(function (e) {
  //   e.preventDefault();
  // });

  // Enable swiper
  var breakpoint = window.matchMedia( '(min-width: 768px)' );
  var partnerSlider;

  var breakpointChecker = function() {
    // if larger viewport and multi-row layout needed
    if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( partnerSlider !== undefined ) {
          if ($('.logos__list').length) {
            $('.logos__list').removeClass('swiper-container');
            $('.logos__item').unwrap('.swiper-wrapper');
            $('.logos__item').removeClass('swiper-slide');
            $('.logos__list .swiper-pagination').remove();
            partnerSlider.destroy( true, true );
          }
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  var enableSwiper = function() {
    $('.logos__list').addClass('swiper-container');
    if (! $('.logos__list .swiper-wrapper').length ) {
      $('.logos__item').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.logos__item').addClass('swiper-slide');
    $('.logos__list').append('<div class="swiper-pagination"></div>');

    partnerSlider = new Swiper ('.logos__list', {
      slidesPerView: 1,
      spaceBetween: 15,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  if ($(window).width() < 768) {
    $('.footer__nav li.menu-item-has-children > a').click(function(e) {
      e.preventDefault();
      $(this).next('.sub-menu').slideToggle();
    });
  }

  $('.search-header__icon').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.search-header__body').toggleClass('active');
  });

  // Ajax load more
  $('body').on('click', '.load-more', function(e) {
    e.preventDefault();
    $(this).text('Load...');
  
    var data = {
      'action': 'load_more_post',
      'query': true_posts,
      'page' : current_page
    };
    $.ajax({
      url: window.wp_data.ajax_url,
      data: data,
      type: 'POST',
      beforeSend: function() {
        $('#response').addClass('active');
      },
      success:function(data){
        if( data ) {
          $('.load-more').text('Show more');
          $('#response').append(data);
          $('#response').removeClass('active');
          current_page++;
          if (current_page == max_pages) $('.load-more').remove();
        } else {
          $('.load-more').remove();
        }
      }
    });
  });

  $('.sharrre-container .twitter, .share-post .twitter').sharrre({
    share: {
      twitter: true,
    },
    enableHover: false,
    template: '<div class="box"><div class="share"><i class="ebrain-icon ebrain-icon-twitter"></i></div> <span class="count">{total}</span></div>',
    buttons: { twitter: {}},
    click: function(api, options){
      api.simulateClick();
      api.openPopup('twitter');
    }
  });

  $('.sharrre-container .facebook, .share-post .facebook').sharrre({
    share: {
      facebook: true,
    },
    enableHover: false,
    template: '<div class="box"><div class="share"><i class="ebrain-icon ebrain-icon-facebook"></i></div> <span class="count">{total}</span></div>',
    buttons: { facebook: {}},
    click: function(api, options){
      api.simulateClick();
      api.openPopup('facebook');
    }
  });

  $('.sharrre-container .googlePlus, .share-post googlePlus').sharrre({
    share: {
      googlePlus: true,
    },
    enableHover: false,
    template: '<div class="box"><div class="share"><i class="ebrain-icon ebrain-icon-facebook"></i></div> <span class="count">{total}</span></div>',
    buttons: { googlePlus: {}},
    click: function(api, options){
      api.simulateClick();
      api.openPopup('googlePlus');
    }
  });
  $('.sharrre-container .linkedin, .share-post .linkedin').sharrre({
    share: {
      linkedin: true,
    },
    enableHover: false,
    template: '<div class="box"><div class="share"><i class="ebrain-icon ebrain-icon-linkedin"></i></div> <span class="count">{total}</span></div>',
    buttons: { linkedin: {}},
    click: function(api, options){
      api.simulateClick();
      api.openPopup('linkedin');
    }
  });

  function showShareBox() {
    if ($('.article__content').length) {
      $(window).scroll(function() {
          if ($(this).scrollTop() > $('.article__content').offset().top) {
              $('.share-post').addClass('stick');
          } else {
              $('.share-post').removeClass('stick');
          }
          if ($(this).scrollTop() > $('.newsletter').offset().top - 800) {
              $('.share-post').addClass('invisible');
          } else {
              $('.share-post').removeClass('invisible');
          }
      });
    }
  }
  showShareBox();
  $(window).bind('resize', function() {
    showShareBox();
  });

  // SVG
  svg4everybody({});

});