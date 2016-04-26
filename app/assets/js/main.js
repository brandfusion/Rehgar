$(function(){	
	function getGridSize3() {
    return (window.innerWidth < 767) ? 1 :
           (window.innerWidth < 1000) ? 2 : 3;
  }
	function getGridSize4() {
    return (window.innerWidth < 767) ? 2 :
           (window.innerWidth < 1000) ? 3 : 4;
  }
  function getGridSize5() {
    return (window.innerWidth < 767) ? 2 :
           (window.innerWidth < 1000) ? 4 : 5;
  }
  function getGridSize7() {
    return (window.innerWidth < 767) ? 2 :
           (window.innerWidth < 1000) ? 4 : 7;
  }
  // $(window).resize(function() {
  //   var gridSize = getGridSize();
  //   var productCarousel4Items = $('.product-carousel-4 .list');
  //   productCarousel4Items.vars.minItems = gridSize;
  //   productCarousel4Items.vars.maxItems = gridSize;
  // });
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



	 // $('.carousel-4').slick({
	 // 	dots: false,
	 //  infinite: true,
	 //  speed: 300,
	 //  touchMove: false,
	 //  slidesToShow: 4,
	 //  slidesToScroll: 1,	 
	 //  responsive: [
	 //    {
	 //      breakpoint: 1200,
	 //      settings: {
	 //        slidesToShow: 3,
	 //        slidesToScroll: 1
	 //      }
	 //    },
	 //    {
	 //      breakpoint: 768,
	 //      settings: {
	 //        slidesToShow: 2,
	 //        slidesToScroll: 1
	 //      }
	 //    },
	 //    {
	 //      breakpoint: 480,
	 //      settings: {
	 //        slidesToShow: 1,
	 //        slidesToScroll: 1
	 //      }
	 //    }
	 //  ]
	 // }); 
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
	  $('.product-carousel-3 .list').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    itemWidth: 210,
	    itemMargin: 20,
	    minItems: getGridSize3(),
      maxItems: getGridSize3(),
      controlNav: false,
      move: 1,
      customDirectionNav: $(this).find(".list-navigation a")
   });
	  $('.product-carousel-4 .list').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    itemWidth: 210,
	    itemMargin: 20,
	    minItems: getGridSize4(),
      maxItems: getGridSize4(),
      controlNav: false,
      move: 1,
      customDirectionNav: $(this).find(".list-navigation a")
   });
	  $('.product-carousel-5 .list').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    itemWidth: 210,
	    itemMargin: 20,
	    minItems: getGridSize5(),
      maxItems: getGridSize5(),
      controlNav: false,
      move: 1,
      customDirectionNav: $(this).find(".list-navigation a")
   });
	  // $('.brands-carousel').flexslider({
	  //   animation: "slide",
	  //   animationLoop: true,
	  //   itemWidth: 210,
	  //   itemMargin: 20,
	  //   minItems: getGridSize7(),
   //    maxItems: getGridSize7(),
   //    controlNav: false,
   //    move: 1      
   // });
	  $('.product-carousel-istoric .list').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    itemWidth: 210,
	    itemMargin: 20,
	    minItems: getGridSize5(),
      maxItems: getGridSize5(),
      controlNav: false,
      move: 1,
      customDirectionNav: $(this).find(".list-navigation a")
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