$(function(){
  $('.solicita-cont-header input').on("click", function(){
    var target = '.right-side-forms .' + $(this).val();  
    if(!$('.right-side-forms-wrapper').hasClass("activated")) {
      $('.right-side-forms-wrapper').addClass("activated");
    }
    $('.right-side-forms form').parents(".content-form").parent().hide();
    $(target).parents(".content-form").parent().fadeIn();
    console.log(target);
  });


  $("[name='reorderUpdate']").on("click", function(){
      var id = $(this).closest("div").children("input").attr("id");
      var quantity = $(this).closest("div").children("input").val();
      
      window.location.href = "Default.aspx?CartCmd=updateorderlines&OrderContext=ORDERCONTEXT1&" + id + "=" + quantity
      
  });
  
  $('#UserManagement_Form_OldPassword').on("focusout", function(){
    var value = $(this).val();
    var data = {};
    data.UserManagement_Form_OldPassword = value;
    $.ajax({
      url: '/Default.aspx?ID=1108',
      type: 'POST',
      dataType: 'json',
      data: data,
    })
    .done(function(response) {
      console.log(response);
    })
    .fail(function() {
      console.log("error");
    });
    



  });
});