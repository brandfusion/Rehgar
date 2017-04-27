window.getQueryVariable = function(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
window.replaceUrlParam = function(url, paramName, paramValue){
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
    if(url.search(pattern)>=0){
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue 
}
window.ObjectInCart = function() {
  var cookie = Cookies.get('ProductInCart');
  if (cookie == undefined || cookie == "False") {   
    alertify.alert("Aveti produse in cos.");
    Cookies.set('ProductInCart', 'True', { expires: 1 });
    return false;
  } 
  if (cookie == "True") {
    return true;
  }  
}
window.cartHasItems = function(){
  var deferred = $.Deferred();
  $.ajax({
    url: '/Default.aspx?ID=81',
    type: 'GET',
    dataType: 'json',
    cache: false
  })
  .done(function(response) {
    var data = response;
    // console.log(data);
    if(data[0].quantity > 0) {
      // ObjectInCart();      
      deferred.resolve(true);      
    } else {
      deferred.resolve(false);     
    }  

   
  });

  return deferred.promise();

};
// window.isLoggedIn =  function(){
//   var cookie = Cookies.get('UserIsLoggedIn');
//   if (cookie == undefined || cookie == "False") { 
//     Cookies.set('UserIsLoggedIn', 'True', { expires: 1 });
//     return false;
//   } 
//   if (cookie == "True") {
//     return true;
//   }
// }
window.minicart = function() {
  $.ajax({
    url: '/Default.aspx?ID=81',
    type: 'GET',
    dataType: 'json',
    cache: false
  })
  .done(function(response) {
    var data = response;
    // console.log(data);
    // if(data[0].quantity > 0) {
    //   ObjectInCart();
    // }
    $('[data-minicart-quantity]').html(data[0].lines);
    $('[data-minicart-price]').html(data[0].price);
    $('[data-minicart-currency]').html(data[0].currency);
  });
}
$(function(){	
  var alreadyLoggedIn = Cookies.get("alreadyLoggedIn") == "True" ? true : false;
 
  
 

  if (alreadyLoggedIn == false) {
    $.when(cartHasItems()).then(function(response){    
      var hasItemsInCart = response;
      var isLoggedIn = $('[data-IsLoggedIn]').attr("data-IsLoggedIn") == "True" ? true : false;
      if(isLoggedIn && hasItemsInCart) {
        alertify.alert("Aveti produse in cos.");
      }
      if (isLoggedIn === true) {
        Cookies.set('alreadyLoggedIn', 'True', { expires: 1 });
      } else {
        Cookies.remove('alreadyLoggedIn');
      }
     
    });
  } 
  




  $('.header-search form').on("submit", function(e){
    if ($(this).find("input").val() == "") {
      e.preventDefault();
    }


  });
  $('.header-logout').on("click", function(e){
    e.preventDefault();
    var link = $(this).attr("href");
    Cookies.remove('alreadyLoggedIn');
    console.log(link);
    window.location.href = link;

  });

  $('.reorder-action, .modifica-comanda').on("click", function(e){
    e.preventDefault();
    var link = $(this).attr("href");
    alertify.confirm('Atentie! Daca aveti produse in cos, acestea vor fi sterse.', function(){ window.location.href = link; }, function(){ return false;});
  });
  if($(window).width() < 1199 && $(window).width() > 768) {
    $('.category-trigger').on("click", function(){
    
      $(this).parent().find(".navigation-main").fadeToggle();
    });
  }
	
	 $('.main-slider').unslider({
	 	arrows: false,
	 	infinite: true,
    aniation: 'fade',
    autoplay: true,
    delay: 6000
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
	
  minicart();

	$('[data-toggle="tooltip"]').tooltip();
  
  
});