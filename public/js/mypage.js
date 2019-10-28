function passwordEdit(pw,pw_ck){
  $.ajax({
    method: "POST",
    url: '/cc/include/mypageEdit.php',
    data: {
      type: "password",
      pw: pw,
      pw_ck: pw_ck
    },
    success: function(data){
      if(data == 'post-notfound'){
        console.log('해당 데이터타입이 전송되지 않았습니다.');
      } else if(data == 'success'){
        $('.alert.medium').text('변경완료').css('color','#007bff');
        console.log('완료');
      } else{
        console.log(data);
      }
    }
  });
}
function photoEdit(){
  $('#uploadPhoto').on('change',function(e){
    var files = e.target.files[0];
    console.log(files);
    var data = new FormData();
    data.append('image',files);
    $.ajax({
      method: "POST",
      url: '/user/mypage/changeImage',
      enctype: 'multipart/form-data',
      data: data,
      processData: false,
      contentType: false,
      beforeSend:function(){
        $('.loader').css('display','block');
        $('.loader-cover').css('display','block');
      },
      complete:function(){
        $('.loader').css('display','none');
        $('.loader-cover').css('display','none');
      },
      success: function(data){
        if(data == 'type_error'){
          alert('jpg,jpeg,png 파일만 올려주세요.');
        } else if(data ==='success'){
          console.log('success_upload_image');
          location.reload();
        } else if(data ==="ext_error"){
          console.log('확장자는 png, jpg, jpeg중 하나여야 합니다.');
        } else if(data ==="upload_error"){
          console.log('업로드가 되지 않았습니다.');
        } else if(data === 'name_error'){
          console.log('이름의 길이는 1자 이상이어야 합니다.');
        } else if(data === 'size_error'){
          console.log('파일 사이즈는 2mb 미만이어야 합니다.');
        }else{
          data = data.replace('publicimages', '/images/');
          console.log(data);
          $('.profile-img').css('background-image',`url(${data})`);
        }
      }
    })
  });
}
