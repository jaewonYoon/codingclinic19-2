function search(){
  const search = $('.svg-inline--fa');
  if(!search.hasClass('disable')){
    search.click= function(){
      $('.icon-box').addClass('disable');
    }
  }else{
    document.click= function(){
      if(e.target!=search){
        search.removeClass('disable');
      }
    }
  }
}
function moreBox(){
  mb = $('.more-box');
  $('.more').click(function(){
    console.log('moreBox');
      mb.css('opacity','1').css('max-height','200px');
  });
}
function closeBox(){
  mb = $('.more-box');
  document.addEventListener('click',function(e){
    if(mb.css('opacity')==='1' && e.target.className != 'more'){
      mb.css('opacity','0').css('max-height','0px');
    }
  })
}

function init(){
  search();
  moreBox();
  closeBox();
  packHover();
}

function packHover(){
  box = $('.pack-box .img-box img')
  btn = $('.pack-box .btn-primary')
  box.hover(function(){
    btn.toggleClass('disable');
  });
  btn.hover(function(){
    btn.toggleClass('disable');
  });
}

function fetchUser(type, url, id,password,password_ck="",email="",nick=""){
  $.ajax({
    url:url,
    method:"POST",
    data: {
      type:type,
      id:id,
      password: password,
      password_ck: password_ck,
      email:email,
      nick:nick
    },
    beforeSend:function(){
      $('.loader').css('display','block');
      $('.loader-cover').css('display','block');
    },
    complete:function(){
      $('.loader').css('display','none');
      $('.loader-cover').css('display','none');
    },
    success: function(data){
      if(data=='login'){ // 로그인 성공
        console.log('...');
        window.location.href="/";
      }else if(data =='duplicate'){
        $('#idAlert').text('이미 존재하는 아이디입니다.');
        $('#nickAlert').text('');
      }else if(data =='duplicate_nick'){
        $('#nickAlert').text('이미 존재하는 닉네임입니다.');
        $('#idAlert').text('');
      }
      else if(data =='thankyou'){ //회원가입 성공
        window.location.href="/";
      }else if(data =='wrongpd'){ //비밀번호 틀림
        $('#loginAlert').text('아이디 혹은 비밀번호가 정확하지 않습니다.');
        console.log('Ajax fail');
      }else if(data == 'nouser'){ //그 외 예외 상황
        console.log('해당 아이디의 유저가 존재하지 않습니다.');
      }else{
        console.log("그 이외의 상황");
      }
    }
  })
}

function fetchFile(type,url,file){
  $.ajax({
    url:url,
    enctype: 'multipart/form-data',
    data:{
      url:url,
      file:file,
    },
    success: function(data){
    }
  });
}
function logout(){
  window.location.href="/user/signOut";
}

function revealCover(wow,oh){
  wow.mouseover(function(){
    oh.css('opacity',0.5);
  });
  wow.mouseout(function(){
    oh.css('opacity',0);
  })
}

function randomImage(){
  const result = Math.floor(Math.random() * 3) + 1;
  const url = "/img/loading/"+result+".png";
  console.log(url); 
  $('.loader img')[0].src = url;
}


///////////////
