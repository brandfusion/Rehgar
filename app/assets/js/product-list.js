$(function(){
  //Compare
  if($("#input-compare-add").length > 0) {
    var groupId= getQueryVariable("dataGroup");
    var productId = getQueryVariable("compare").split(",")[0]
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
      $('#input-compare-add').append(options);
    })
    .fail(function(data) {
      console.log("error downloading compare items");
    })
    .always(function(data) {
      // console.log("complete");
    });
    $('.compare-add-wrapper button').on("click", function(){
      var groupId = getQueryVariable("dataGroup");
      var arguments = getQueryVariable("compare") + ',' + $('#input-compare-add').val();
      var link = "/Default.aspx?ID=2&compare=" + arguments  + "&dataGroup=" + groupId;
      if($("#compare-list .item").length >= 3) {
        var errorMessage = $('#compare-list').attr("data-error-toomanyitems");
        alert(errorMessage);
      } else {
        window.location.href = link;
      }
     
    });
  }
  $('.quick-view').on("click", function(e){
    e.preventDefault();
    var link = "/Default.aspx?ID=82&groupId=" + $(this).attr("data-group-id") + "&productId=" +  $(this).attr("data-product-id");
     $('#product-modal iframe').attr("src", link);
     $('#product-modal').bPopup();
    // $.ajax({
    //   url: link,
    //   type: 'GET',
    //   dataType: 'html'
    // })
    // .done(function(data) {
    //   console.log(data);
     
    // })
    // .fail(function(data) {
    //   console.log("error");
    // })
    // .always(function(data) {
    //   console.log("complete");
    // });
    
  });

});