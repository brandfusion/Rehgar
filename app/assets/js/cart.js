$(function(){
	$("[name='Update']").on("click", function(){
		var id = $(this).closest("div").children("input").attr("id");
		var quantity = $(this).closest("div").children("input").val();		
		window.location.href = "Default.aspx?CartCmd=updateorderlines&" + id + "=" + quantity
		
	});
});