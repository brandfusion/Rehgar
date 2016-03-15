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
	 	arrows: false
	 });
	  $('.middle-slider').unslider({
	   nav: false,
	   arrows: {		
			prev: '<a class="unslider-arrow prev"><i class="fa fa-angle-left"></i></a>',
			next: '<a class="unslider-arrow next"><i class="fa fa-angle-right"></i></a>',
		}
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
	  $('.brands-carousel').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    itemWidth: 210,
	    itemMargin: 20,
	    minItems: getGridSize7(),
      maxItems: getGridSize7(),
      controlNav: false,
      move: 1      
   });
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

	//PRODUCT PAGE

	$('.variant [data-option]').on("click", function(){
		var value = $(this).attr("data-option");
		var text = $(this).html();
		var select = $(this).parents(".variant").find('[data-select]')
		select.html(text);
		select.attr("data-select",value);
	});

	$('[data-increase]').on("click", function(){
		var input = $(this).parent().find("input")
		var value =  parseFloat(input.val()) + 1;
		input.val(value);
	});
	$('[data-decrease]').on("click", function(){
		var input = $(this).parent().find("input")
		var value = parseFloat(input.val()) - 1;
		if(input.val() >=2 ) {
			input.val(value);
		}
	});
});