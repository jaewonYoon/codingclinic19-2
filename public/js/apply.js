function validate(){
  let flag = 1; 
  const inputArray = $('.validate');
  let male = $('#male')[0].checked;
  let female = $('#female')[0].checked;
  let gender;
  let height, weight;
  let bmr, kcal;
  $.each(inputArray, (_,item) => {
    if(item.value.length ===0){
        alert('빈칸이 있으면 안됩니다.');
        flag = 0;
        return false;
      }
    else if(isNaN(item.value)){
      alert("숫자로 써주세요 :) ");
      flag = 0;
      return false;
    }
  });
  if( (male || female) === false ){
    flag = 0;
    alert('성별을 선택해주세요.');
    return false;
  }
  male ? gender = 'male' : gender = 'female';

  bmr = parseInt($('.bmr').text());
  kcal = parseInt($('.kcal').text());
  height = inputArray[0].value;
  weight = inputArray[1].value;
  const age = document.querySelector('.age-input').value;
  const activityCheck = document.querySelector('input[type=radio][name=pattern]:checked');
  if(!activityCheck){
    alert('생활패턴을 선택해주세요.');
    flag = 0; 
    return false;
  }
  else {
    activity = activityCheck.id; 
  }
  if(flag){
    makeModal(gender);
  }
}
function makeModal(gender){ 
  gender === 'male' ? gender = '남자' : '여자'; 
  $('#modalAge').text($('.age-input')[0].value);
  $('#modalHeight').text($('.height-input')[0].value);
  $('#modalWeight').text($('.weight-input')[0].value);
  $('#modalGender').text(gender);
  $('.applyModal').css('opacity',1)
    .css('width', '70%')
    .css('height', '300px');
  $('.loader-cover').css('display','block');
  
}

function deleteModal() {
  if($('.applyModal').css('opacity')){
    $(document).on('click', function(e){
      if($(e.target).hasClass('loader-cover')){
        $('.applyModal').css('opacity', 0)
        .css('width','0px')
        .css('height', '0px');
        $('.loader-cover').css('display','none');
      }
    })
  }
}
function genderClick(){
  const $male = $('#male-box');
  const $female = $('#female-box');
  $male.on('click',function(){
    $male.css('width','5vw');
    $female[0].style.width =null;
  });
  $female.on('click',function(){
    $female.css('width','5vw');
    $male[0].style.width =null;
  });
}
function activeClick(item){
  const patterns = document.querySelectorAll('.pattern-box div img');
  const targetId = item.id;
  patterns.forEach(function(item){
    if(item.id != targetId){
      item.style.width = null;
    } else{
      item.style.width = '150px';
    }
  });
}

function calbmr(){
  const inputArray = $('.validate');
  let male = $('#male')[0].checked;
  let female = $('#female')[0].checked;
  let height, weight,age;
  let gender, pattern;
  let bmr, cal;
  let patternMul;
  $('input').on('input',function(){
      height = $('.height-input')[0].value;
      weight = $('.weight-input')[0].value;
      age = $('.age-input')[0].value;
      gender = $('input[type=radio][name=gender]:checked');
      pattern = $('input[type=radio][name=pattern]:checked');
      if(height && weight && age && Number.isInteger(+height) && Number.isInteger(+weight) && Number.isInteger(+age)
        && gender[0] && pattern[0]){
          patternValue = pattern[0].id;
          switch(patternValue){
            case 'pattern1':
              patternMul = 1.2;
              break;
            case 'pattern2':
              patternMul = 1.3;
              break;
            case 'pattern3':
              patternMul = 1.5;
              break;
            case 'pattern4':
              patternMul = 1.9;
              break;
            default:
              patternMul = 1.7;
          }
          genderValue = gender[0].id;
          if(genderValue === "male"){
              bmr = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * age);
          } else if(genderValue ==='female'){
              bmr = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age);
          } else{
            alert('성별이 선택되지 않았습니다.');
          }
          cal = bmr * patternMul;
          $('span.bmr').text(Math.round(bmr));
          $('span.kcal').text(Math.round(cal));
      }
  });

}

function makeGoal(){

  let age = parseInt($('.age-input')[0].value);
  let height = parseInt($('.height-input')[0].value);
  let weight = parseInt($('.weight-input')[0].value);
  let activity = parseInt($('input[type=radio][name=pattern]:checked')[0].id[7]);
  let bmr = parseInt($('.bmr').text());
  let gender;
  $('#male')[0].checked ? gender = 'male' : gender = 'female';
  let kcal = parseInt($('.kcal').text());
  if($('input[name=check]')[0].checked === false){
    alert('확인란에 체크를 해주세요 :) ');
    return false;
  }
  $.ajax({
    method: "POST",
    url: '/user/apply',
    data:{
      age: age,
      height: height,
      weight: weight,
      gender: gender,
      activity: activity,
      bmr: bmr,
      kcal: kcal,
      process: 1 
    },
    beforeSend:function(){
      $('.loader').css('display','block');
      $('.loader-cover').css('display','block');
    },
    complete:function(){
      $('.loader').css('display','none');
      $('.loader-cover').css('display','none');
      $('.applyModal').css('opacity', 0)
        .css('width','0px')
        .css('height', '0px');s
    },
    success:function(data){
      if(data === 'success'){
        location.href="/user/apply2";
      } else if(data ==='post_error'){
        console.log('apply1 포스트 타입을 받지 못했습니다.');
      } else {
        console.log(data);
      }
    }
  })
}