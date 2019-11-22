function validate(){
  const inputArray = $('.validate');
  let short = $('#short')[0].checked;
  let long = $('#long')[0].checked;
  let target_weight, target_height;
  let period;
  inputArray.map((_,item) => {
    if(item.value.length ===0){
        alert('빈칸이 있으면 안됩니다.');
        return false;
      }
  });
  if($('input[type=radio][name=target-period]:checked').length <1){
    alert('나의 다이어트 기간을 정해주세요 :)');
    return false;
  }
  short ? period = 1 : long ? period = 2: alert('목표 기간을 설정해주세요.');
  target_weight = inputArray[0].value;
  target_fat = inputArray[1].value;
  $.ajax({
    method: "POST",
    url: '/user/apply2',
    data:{
      type: 'apply2',
      goalWeight: target_weight,
      goalFatRate: target_fat,
      period: period,
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
      if(data === 'success'){
        location.href="/cc/pages/apply3.php";
      } else if(data ==='post_error'){
        console.log('apply2 포스트 타입을 받지 못했습니다.');
      } else {
        console.log(data);
      }
    }
  })
}

function periodClick(){
  const $short = $('#short-box img');
  const $long = $('#long-box img');
  $long.on('click',function(){
    $long.css('width','11vw');
    $short.css('width', '9vw');
  });
  $short.on('click',function(){
    $short.css('width','11vw');
    $long.css('width', '9vw');
  });
}

function hoverBadge(){
  $('#long-box').mouseover(
    function(){
      $('.long-period-badge').css('opacity','0.75');
    }).mouseout(function(){
      $('.long-period-badge').css('opacity','0');
    });
  $('#short-box').mouseover(
    function(){
    $('.short-period-badge').css('opacity','0.75');
  }).mouseout(function(){
    $('.short-period-badge').css('opacity','0');
  });
}
