window.buildItemsCompareLink = function(){
  var compareString = "/Default.aspx?ID=2&compare=";
  var groupId = $('[data-group-id-category]').attr("data-group-id-category");
  $(".product-list .product-box.selected").each(function(){
    compareString += $(this).attr("data-product-id") + ","    
  });
  compareString += "&dataGroup=" + groupId;
  // if($(".product-list .product-box.selected").length == 3) {
  //   window.location.href = compareString;
  // }
  return compareString;
}
window.addCompare = function(arg){

  console.log("intra");
  var imageSrc = arg.parents(".product-box").find("img").attr("src");
  var name = arg.parents(".product-box").find(".title").html();
  var id= arg.parents(".product-box").attr("data-product-id");
  var compareItem = "";
  compareItem += '<div class="media item" data-id="' + id +'">';
  compareItem +=  '<div class="media-left">';
  compareItem += '<div class="image"><img src="' + imageSrc + '" class="media-object" /></div>';
  compareItem += '</div>';
  compareItem += '<div class="media-body">';
  compareItem += '<p class="title">' + name + '</p>';
  compareItem += '</div>';
  compareItem += '</div>';

  $('#compareWrapper').append(compareItem);

  if ($('#compareWrapper .item').length > 0) {
    $('#compareOutterWrapper').addClass("opened");
  } else {
    $('#compareOutterWrapper').removeClass("opened");
  }


}
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
     $('#product-modal').bPopup({
       closeClass:'close',
       onClose: function() {            
            console.log("empty");
             window.location.href = window.location.href;
        }
     });
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
  $('#product-modal').on("click", "#product-page-order button", function(){
    setTimeout(function(){
      console.log("intra");
      $('#product-modal').bPopup().close();

    });
  });

  var compareString="";
  $('.product-box .compare').on("click", function(){
    if($(this).parents(".product-box").hasClass("selected")) {
      $(this).parents(".product-box").removeClass("selected");
      $(this).find('.fa').toggleClass("fa-square-o").toggleClass("fa-check-square-o");
      compareString = buildItemsCompareLink();
      // console.log(compareString);
      var id = $(this).parents(".product-box").attr("data-product-id");
      var target = $("#compareOutterWrapper .item");
      target.each(function(){
        var itemId = $(this).attr("data-id");
        if(itemId == id) {
          $(this).remove();
        }
      });
    } else {

      


      if($(".product-list .product-box.selected").length == 3) {
        alert("Ati depasit numarul de produse ce pot fi comparata simultan.");
        return false;
      }
      addCompare($(this));
      $(this).parents(".product-box").addClass("selected");
      $(this).find('.fa').toggleClass("fa-square-o").toggleClass("fa-check-square-o");
      compareString = buildItemsCompareLink();
      console.log(compareString);
    }    
  }); 

  $("#compareOutterWrapper button").on("click", function(){
    var compareString = "/Default.aspx?ID=2&compare=";
    $("#compareOutterWrapper .item").each(function(){
      var id = $(this).attr("data-id");
      compareString += compareString + id + ",";

    });
    window.location.href = compareString;

  });
});