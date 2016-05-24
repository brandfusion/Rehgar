
$(function(){
  var filtersManual = false;
  $(".form-filters input").each(function(){
      if ($(this).prop("checked")) {
        filtersManual = true;
      }
      
  });

  if (filtersManual) {
     $("#clearFilters").show();
  }


  $("#clearFilters").on("click", function(e){
      e.preventDefault()
      $(".form-filters input").each(function(){
        $(this).removeAttr("checked");
      });
      $(".form-filters").submit();
    })


    $('[favorite-add]').on("click", function(){

      var value = $(this).attr("favorite-add");
      var  currentLocation = window.location.href
      $.ajax({
        url: value,
        type: 'POST'
      })
      .done(function() {
        window.location.href = currentLocation;
      });
      
     

    }); 
    $('[favorite-remove]').on("click", function(){

      var value = $(this).attr("favorite-remove");
      var  currentLocation = window.location.href
      $.ajax({
        url: value,
        type: 'POST'
      })
      .done(function() {
        window.location.href = currentLocation;
      });

    });      
    $('.quick-view').on("click", function(e){
      e.preventDefault();
      var link = "/Default.aspx?ID=82&groupId=" + $(this).attr("data-group-id") + "&productId=" +  $(this).attr("data-product-id");
       $.ajax({
         url: link,
         type: 'GET',
         dataType: 'html'
       })
       .done(function(response) {
         $('#product-modal #popup-content').html(response);
       })
       .fail(function(response) {
         console.log("error");
       })
       .always(function(response) {
         console.log("complete");
       });
       
       $('#product-modal').bPopup({
         closeClass:'close',
         onClose: function() {            
              console.log("empty");
               window.location.href = window.location.href;
          }
       });
      
      
    });
    $('#product-modal').on("click", "#product-page-order .close", function(){
      setTimeout(function(){      
        minicart();
        $('#product-modal').bPopup().close();

      });
    });

    

    $("#popup-content").on("click",".product-variant", function(){
      value = $(this).attr("data-value");
      name = $(this).html();   
      link = $(this).attr("data-link"); 
      $(this).parents(".variant").find("[data-select]").attr("data-select", value);
      $(this).parents(".variant").find("[data-select]").html(name);
      $(this).parents(".product").find(".add-to-cart").attr("data-variant-id", value);
      $(this).parents(".product").find(".add-to-cart").attr("data-link", link);
    });
    $("#popup-content").on("focusout",".quantity input", function(){
      var value=$(this).val();
      $(this).parents(".product").find(".add-to-cart").attr("data-quantity", value);
    });
    $("#popup-content").on("click",".add-to-cart", function(e){
      e.preventDefault();

      if ($(this).attr("data-variant-id") == "" || $(this).attr("data-variant-id") == null) {
        alertify.alert($(this).attr("data-message"));

      } else {

        var link = $(this).attr("data-link") + "&CartCmd=add" + "&Quantity=" +  $(this).attr("data-quantity");

        $.ajax({
          url: link,
          type: 'POST'
        })
        .done(function(response) {
          console.log("minicart update");
          minicart();
          $('#product-modal').bPopup().close();

        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });

      }
       
        
    });






  
});