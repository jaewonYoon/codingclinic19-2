$(document).ready(function(){

var limit  = 5;
var start = 0;
var action = 'inactive';
if(action =='inactive'){
  action='active';
  load_timeline(limit,start);
}
$(window).scroll(function(){
  if($(window).scrollTop() + $(window).height() > $("#load_data").height() && action == 'inactive'){
    console.log('moving');
    action = 'active';
    start = start+ limit;
    setTimeout(function(){
      load_timeline(limit,start);
    },1000);
  }else{
    console.log('false');
  }
})
function load_timeline(limit,start){
  console.log(limit,start);
  $.ajax({
    url:"/cc/include/check_timeline.php",
    method: "POST",
    data: {
      limit:limit,
      start:start
    },
    cache: false,
    beforeSend:function(){
      $('.loader').css('display','block');
      $('.loader-cover').css('display','block');
    },
    complete:function(){
      $('.loader').css('display','none');
      $('.loader-cover').css('display','none');
    },
    success:function(data)
    {
      $('#load_data').append(data);
      if(data == ''){
          $('#load_data_message').html("새 글이 없습니다. 새로운 피드를 남겨보시는건 어떤가요?");
          action = 'active';
      }else{
          $('#load_data_message').html("Loading...");
          action = "inactive";
      }
    }
  })
};

});
