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
    action = 'active';
    start = start+ limit;

    setTimeout(function(){
      load_timeline(limit,start);
    },1000);
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
uploadImg(); 
})
function likeClick(e){
    let liked = false;
    console.log(e.target);
    postId = e.target.classList[0];
    if(e.target.classList.contains('far')){ 
        // 아직 좋아요를 누르지 않았을 때 
        $(e.target).removeClass('far').addClass('fas');
        let like_counts = $(e.target).next().text();
        $(e.target).next().text(parseInt(like_counts)+1);
        likes(postId,'add');
    }else{
      $(e.target).removeClass('fas').addClass('far');
      let like_counts = $(e.target).next().text();
      $(e.target).next().text(parseInt(like_counts)-1);
      likes(postId,'minus');
    }
} 

// 타임라인 likes 표시 관련 
const likes = function(postId,type){
  $.ajax({
    method: 'POST',
    url: '/post/timeline/likepost',
    data: {
      postId: postId.split("@")[1],
      type: type
    },
    success:function(data){
      console.log('success');
    }
  })
}


//포스팅 이미지 업로드 

  

const uploadImg= function() {
  $('#imgInp').on('change',function(){
    $('#imgUp').css('display','initial');
    readURL(this);
  })
  function readURL(input) {
    if(input.files && input.files[0]){
      var reader = new FileReader(); 

      reader.onload = function(e) {
        $('#imgUp').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]); 
    }
  }
}

const writePost = function(){
  let files = $('#imgInp')[0].files[0];
  let data = new FormData(); 
  // data.append('postImage', files);
  data.append('image', files);
  data.append('posts', $('#postInput')[0].value);
  $.ajax({
    method: "POST",
    url: '/post/timeline/writepost',
    enctype: 'multipart/form-data',
    data:data,
    processData: false,
    contentType: false, 
    beforeSend: function() {
      $('.loader').css('display', 'block');
      $('.loader-cover').css('display','block');
    },
    complete: function(){
      $('.loader').css('display','none');
      $('.loader-cover').css('display','none');
    },
    success: function(data){
      if(data == 'success'){
        location.href='/post/timeline'
      }else{
        console.log(data)
      }
    }
  })
}