function validate(){
  const inputArray = $('.validate');
  let short = $('#short')[0].checked;
  let long = $('#long')[0].checked;
  let target_weight, target_height;
  let period;
  let flag; 
  for (item of inputArray){
    if(item.value.length === 0){
      flag = 0;
      alert('빈칸이 있으면 안됩니다. ');
      return false;
    } 
  }
  // inputArray.map((_,item) => {
  //   if(item.value.length ===0){
  //       alert('빈칸이 있으면 안됩니다.');
  //       flag = 0; 
  //       return false;
  //     }
  //   else{
  //     flag=1;
  //   }
  // });
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
        location.href="/user/process";
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


let ctxLong = document.getElementById("longChart"); 
var myChart = new Chart(ctxLong, {
  type: 'bar', //그래프 형태 지정하기
  data: {
      labels: ["1", "2", "3", "4", "5", "6"], //X축 제목
      datasets: [{
          label: '하루 소비 칼로리(일)',
          data: [50, 100, 150, 200, 250, 300,350],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)', //1번째 그래프의 바탕색
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',      //1번째 그래프의 선색
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1 //선굵기
      }]
  },
  options: {
      responsive:false,
      scales: { //X,Y축 옵션
          yAxes: [{
              ticks: {
                  beginAtZero:true  //Y축의 값이 0부터 시작
              }
          }]
      }
  }
});

new Chart(document.getElementById("shortChart"), {
  type: 'line',
  data: {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [{
          label: 'kg(월)',
          data: [
              75,
              67,
              69,
              71,
              70.5,
              72,
              67
          ],
          borderColor: "rgba(255, 201, 14, 1)",
          backgroundColor: "rgba(255, 201, 14, 0.5)",
          fill: true,
          lineTension: 0
      }]
  },
  options: {
      responsive: false,
      title: {
          display: true,
          text: '월별 체중변화'
      },
      tooltips: {
          mode: 'index',
          intersect: false,
      },
      hover: {
          mode: 'nearest',
          intersect: true
      },
      scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'x축'
              }
          }],
          yAxes: [{
              display: true,
              ticks: {
                  suggestedMin: 50,
              },
              scaleLabel: {
                  display: true,
                  labelString: 'y축'
              }
          }]
      }
  }
});


function makeModal(){ 
  $('.apply-modal').css('opacity',1)
    .css('width', '1200px')
    .css('height', '650px');
  $('.loader-cover').css('display','block');
  
}

function deleteModal() {
  if($('.apply-modal').css('opacity')){
    $(document).on('click', function(e){
      if($(e.target).hasClass('loader-cover')){
        $('.apply-modal').css('opacity', 0)
        .css('width','0px')
        .css('height', '0px');
        $('.loader-cover').css('display','none');
      }
    })
  }
}