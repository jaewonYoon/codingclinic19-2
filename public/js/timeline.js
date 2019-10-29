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
    console.log(action);
    console.log(limit,start);

    setTimeout(function(){
      load_timeline(limit,start);
    },1000);
  }else{
    console.log('false');
  }
});
function load_timeline(limit,start){
  $.ajax({
    url:"/post/timeline/getposts",
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
      if(data == 'nodata') {
        $('#load_data_mesage').html("아직 작성 글이 없습니다. 새로운 피드를 작성해 보세요.");
      } else{
        $('#load_data').append(data);
        action = 'inactive';
      }
    }
  })
};

})

