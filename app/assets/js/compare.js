// function getBookmarks() {
//     var deferred = $.Deferred();

//   $.ajax({
//         method: "GET",
//     url: "/Files/WebServices/Bookmarks.ashx",
//     dataType: "json",
//     cache: false
//   }).done(function(response){
//     deferred.resolve(response);
//   }).fail(function(error){
//     deferred.reject(error);
//   });

//   return deferred.promise();
// }

var Compare = {
  data: [],
  group: "",
  loadResources: function(){   
    var groupId = Cookies.get('CompareGroup') == undefined ? "" : Cookies.get('CompareGroup');
    this.group = groupId;
    console.log(this.data.length);
    if(this.data.length == 0) {
      var items = Cookies.get('CompareItems') == undefined ? "" : Cookies.get('CompareItems');
      var loopItems = items.split("/");
      for (var i = loopItems.length - 1; i >= 0; i--) {
        if (loopItems[i] != "") {
          this.data.push(loopItems[i]);
        }        
      }   
    }
  },
  remove: function(arg) {     
    this.loadResources();
    var data = this.data;  
    var cookies = "";
    for (var i = data.length - 1; i >= 0; i--) { 
      if (data[i] == arg) {
        data.splice(i, 1);
      }
    }
    this.data = data;

    for (var i = data.length - 1; i >= 0; i--) {
      cookies += data[i] + "/";
    }
    Cookies.set('CompareItems', cookies);

    console.log(Cookies.get('CompareItems'));
    found = false;
    $("#compareOutterWrapper .item").each(function(){
      var currentId = $(this).attr("data-id");
      if (currentId == arg) {
        found = true;
        $(this).remove();
      }
    });
    return;
  },
  add: function(arg) {  
    var data = this.data;      
    if (data.length >= 3) {
      alert("too many items");
      return;
    }
    var found = false; 
    this.loadResources();
    for (var i = data.length - 1; i >= 0; i--) { 
      if (data[i] == arg) {
        found = true;
        alert("item found");
        return;
      }
    }
    if(!found) {
      data.push(arg);
      var cookies = Cookies.get('CompareItems') == undefined ? "" : Cookies.get('CompareItems');
      cookies += arg + "/";
      Cookies.set('CompareItems', cookies);
    }
    this.data = data;
    return this.render();
  },
  init: function() {
    this.loadResources();
    return this.render();
  },
  buildCompareItem: function(data) {
    var id = data.id;
    var name = data.name;
    var image = data.image;
    var found = false;
    $("#compareOutterWrapper .item").each(function(){
      var currentId = $(this).attr("data-id");
      if (currentId == id) {
        found = true;
      }
    });
    if(!found) {
        var compareItem = "";
      compareItem += '<div class="media item" data-id="' + id +'">';
      compareItem +=  '<div class="media-left">';
      compareItem += '<div class="image"><img src="' + image + '" class="media-object" /></div>';
      compareItem += '</div>';
      compareItem += '<div class="media-body">';
      compareItem += '<p class="title">' + name + '</p>';
      compareItem += '<button type="button" class="remove"><i class="fa fa-close"></i></button>';
      compareItem += '</div>';
      compareItem += '</div>';

      $('#compareWrapper').append(compareItem);

      if ($('#compareWrapper .item').length > 0) {
        $('#compareOutterWrapper').addClass("opened");
      } else {
        $('#compareOutterWrapper').removeClass("opened");
      }
      
      $("#compareWrapper .item").each(function(){
        var id = $(this).attr("data-id");
        var target = $('button.compare[data-product-id="' + id + '"]');
        target.addClass("selected");
        target.find(".fa").removeClass("fa-square-o").addClass("fa-check-square-o");
      });

    }
    
  },
  render: function(){   
    var data = this.data;
    var _this = this
   
    for (var i = data.length - 1; i >= 0; i--) { 
      var link = "/Default.aspx?ID=1086&groupId=" + this.group + "&productId=" + data[i];
      $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json'
      })
      .done(function(response) {
        _this.buildCompareItem(response[0]);
      });
    }
    console.log(data);
    
    
     
   
   
    
    return this.data;
  }
}

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
  compareItem += '<button type="button" class="remove"><i class="fa fa-close"></i></button>';
  compareItem += '</div>';
  compareItem += '</div>';

  $('#compareWrapper').append(compareItem);

  if ($('#compareWrapper .item').length > 0) {
    $('#compareOutterWrapper').addClass("opened");
  } else {
    $('#compareOutterWrapper').removeClass("opened");
  }
}
function compareList(group, product){
  var def = $.Deferred();
  items = Cookies.get('CompareItems') == undefined ? "" : Cookies.get('CompareItems');
  items += product + "/";
  Cookies.set('CompareItems', items);
  console.log(Cookies.get('CompareItems'));
  return def.promise();
}
$(function(){    
    //Compare
    // $('#compareWrapper').empty();

    if($('[data-compare-category]').length) {
      var compareCategory = $('[data-compare-category]').attr("data-compare-category");
      console.log(compareCategory);
      console.log(Cookies.get('CompareCategory'));
      if (compareCategory == Cookies.get('CompareCategory')) {
        Compare.init();
        
      } else {
        Cookies.set('CompareCategory', compareCategory);
        Cookies.set('CompareItems', "");
      }
    }

   
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

    var compareString="";
    $('.product-box .compare').on("click", function(){
      var productId = $(this).attr("data-product-id");
      var groupId = $(this).attr("data-group-id");
      if($(this).hasClass("selected")) {       
        $(this).find('.fa').toggleClass("fa-square-o").toggleClass("fa-check-square-o");
        $(this).removeClass("selected");
        Compare.remove(productId);
        // compareString = buildItemsCompareLink();
        // // console.log(compareString);
        // var id = $(this).parents(".product-box").attr("data-product-id");
        // var target = $("#compareOutterWrapper .item");
        // target.each(function(){
        //   var itemId = $(this).attr("data-id");
        //   if(itemId == id) {
        //     $(this).remove();
        //   }
        // });
      } else {
        // if($(".product-list .product-box.selected").length == 3) {
        //   alert("Ati depasit numarul de produse ce pot fi comparata simultan.");
        //   return false;
        // }
        // addCompare($(this));
        $(this).addClass("selected");
        $(this).find('.fa').toggleClass("fa-square-o").toggleClass("fa-check-square-o");
        Compare.add(productId);
        // compareString = buildItemsCompareLink();
        // var compareProductsList= compareString.split("compare=")[1].split("&")[0];
        // var compareGroupId= compareString.split("compare=")[1].split("&dataGroup=")[1]
        // console.log(compareProductsList);
        // Cookies.set('compareItems', compareProductsList);      
        // console.log(compareString);
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