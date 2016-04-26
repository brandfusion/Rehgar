$(function(){	
	
	 $('.main-slider').unslider({
	 	arrows: false,
	 	infinite: true,
    aniation: 'fade'
	 });
	  $('.middle-slider').unslider({
	   nav: false,
	   infinite: true,
	   arrows: {		
			prev: '<a class="unslider-arrow prev"></a>',
			next: '<a class="unslider-arrow next"></a>',
		}
	 });
  var $sliders = $(".carousel-4");
   var $arrows = $('.list-navigation');

  $(".product-carousel").each(function(){
        
        var $this = $(this);
        var slick = $this.find( $sliders ).slick({
            appendArrows: $this.find( $arrows ),
            dots: false,
            infinite: true,
            speed: 300,
            touchMove: false,
            slidesToShow: 4,
            slidesToScroll: 1, 
            prevArrow: "<a href='#' class='slick-prev flex-prev'></a>",
            nextArrow: "<a href='#' class='slick-next flex-next'></a>",
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
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
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        });





  });


   $('.carousel-3').slick({
    dots: false,
    infinite: true,
    speed: 300,
    touchMove: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('#brand-prev'),
    nextArrow: $('#brand-next'),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
   }); 
	 $('.brands-carousel .carousel').slick({
	 	dots: false,
	 	autoplay: true,
	  infinite: true,
	  speed: 300,
	  arrows: false,
	  touchMove: false,
	  slidesToShow: 7,
	  slidesToScroll: 1,
	  // prevArrow: $(this).find(".flex-prev"),
	  // nextArrow: $(this).find(".flex-next"),
	  responsive: [
	    {
	      breakpoint: 1200,
	      settings: {
	        slidesToShow: 5,
	        slidesToScroll: 1
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 1
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 1
	      }
	    }
	  ]
	});
	
	$('.compare').on("click", function(){
		$(this).find('.fa').toggleClass("fa-square-o").toggleClass("fa-check-square-o");
	});  

	$('[data-toggle="tooltip"]').tooltip();
  $.ajax({
    url: '/Default.aspx?ID=81',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {
    var data = response;
    $('[data-minicart-quantity]').html(data[0].lines);
    $('[data-minicart-price]').html(data[0].price);
    $('[data-minicart-currency]').html(data[0].currency);
  });
  
});