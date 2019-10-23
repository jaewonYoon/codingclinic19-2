function changePage(page){
  $.ajax({
      method: 'GET',
      url:"/cc/pages/posts.php",
      data:{
        page: page,
      },
      beforeSend:function(){
        $('.loader').css('display','block');
        $('.loader-cover').css('display','block');
      },
      complete:function(){
        $('.loader').css('display','none');
        $('.loader-cover').css('display','none');
      },
      success:function(data){
          $('tbody').html(data);
          console.log(data);
      },
      error: function(data){
        console.log(data);
      }
  });
}
