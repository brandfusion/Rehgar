$(function(){
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

	$('[data-stock]').on("focusout",function(){	
		var stock = parseFloat($(this).attr("data-stock"));
		var value = parseFloat($(this).val());
		var parent = $(this).parent();	
		console.log(value);	
		if (value > stock) {
			$(this).val(stock);	
			alertify.logPosition("center center");
			alertify.alert("value > stock");
		}
	});
	$('.thumbs a').on("click", function(e){
		e.preventDefault();
		var value= $(this).find("img").attr("src");
		$('.main-image img').attr("src", value);
		$('html, body').animate({
        scrollTop: $(".main-image").offset().top
    }, 1000);
	});
	// $('#product-page-order').on("submit", function(e){		
	// 	var variantValue = $(this).find("#VariantID").val();
	// 	if (variantValue === "") {
	// 		e.preventDefault();	
	// 		alertify.logPosition("center center");
	// 		alertify.alert("Alegeti o optiune");
	// 	}
	// });
	$('.disabled-submit').on("click", function(e){			
		e.preventDefault();
		alertify.logPosition("center center");
		alertify.alert("Alegeti o optiune");
	});
	if($('.main-image').length > 0) {
		$('.main-image').zoom();
	}
	
});
