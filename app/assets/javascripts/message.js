$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-info">
           <div class="upper-info__talker">
             ${message.user_name}
           </div>
           <div class="upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
          ${message.content}
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-info">
           <div class="upper-info__talker">
             ${message.user_name}
           </div>
           <div class="upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
             ${message.content}
         </div>
       </div>`
     return html;
   };
 }

$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html).animate({ scrollTop: $('.messages')[0].scrollHeight});    
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  })
  .always(function(){
    $('input').removeAttr("disabled");
  })

})
});