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
		// if (value > stock) {
		// 	$(this).val(stock);	
		// 	alertify.logPosition("center center");
		// 	alertify.alert("value > stock");
		// }
	});
	// $('.product .compare').on("click", function(){
	// 	$(this).find('.fa').toggleClass("fa-square-o").toggleClass("fa-check-square-o");
 //    // $('.compare-input-box').toggleClass("visible");
    
	// }); 
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
	if($("#input-compare").length > 0) {
		var groupId= $('#input-compare').attr("data-group-id");
		var productId= $('#input-compare').attr("data-product-id");
		$.ajax({
			url: '/Files/Extra/GetProductsFromGroup.aspx',
			type: 'POST',
			data: {groupId: groupId, productId: productId}
		})
		.done(function(data) {
			var data = $.parseJSON(data);			
			var keys = Object.keys(data);
			options = "";
			for (var i = 0; i < keys.length; i++) {
			    var val = data[keys[i]];
			    var key = keys[i];
			    options += '<option value="' + key + '">' + val + '</option>';			  
			}
			$('#input-compare').append(options);
		})
		.fail(function(data) {
			console.log("error downloading compare items");
		})
		.always(function(data) {
			// console.log("complete");
		});
		$('.compare-input-box button').on("click", function(){
			var groupId = $('#input-compare').attr("data-group-id");
			var productId = $('#input-compare').attr("data-product-id");
			var compareId = $('#input-compare').val();
			var link = "/Default.aspx?ID=2&compare=" + productId + "," + compareId + "&dataGroup=" + groupId;
			window.location.href = link;
		});
	}
	$('.main-image').on("click", function(){
			var content = $(this).html();
			$('.main-image-popup .bmodal-content').html(content);
			$('.main-image-popup .bmodal-content').find(".zoomImg").remove();

			$('.main-image-popup').bPopup();
	});
	$('.main-image-popup .close').on("click", function(){
    setTimeout(function(){      
      $('.main-image-popup').bPopup().close();
    });
  });
	
});
