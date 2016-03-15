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
		var stock = $(this).attr("data-stock");
		var value = $(this).val();
		var parent = $(this).parent();
		console.log(parent[0]);
		if (value > stock) {
			$(this).val(stock);			
			alertify.parent(parent[0]);
			alertify.logPosition("center center");
			alertify.alert("value > stock");
		}
	});
	$('.thumbs a').on("click", function(e){
		e.preventDefault();
		var value= $(this).find("img").attr("src");
		$('.main-image img').attr("src", value);
	});

});
