function validate(){
  const inputArray = $('.validate');
  let male = $('#male')[0].checked;
  let female = $('#female')[0].checked;
  let gender;
  let height, weight;
  let bmr, kcal;
  inputArray.map((_,item) => {
    if(item.value.length ===0){
        alert('빈칸이 있으면 안됩니다.');
        return false;
      }
    else if(isNaN(item.value)){
      alert("숫자로 써주세요 :) ");
      return false;
    }
  });
  male ? gender = 'male' : female ? gender = 'female': alert('성별을 선택해주세요.');
  bmr = parseInt($('.bmr').text());
  kcal = parseInt($('.kcal').text());
  height = inputArray[0].value;
  weight = inputArray[1].value;
  const age = document.querySelector('.age-input').value;
  const activity = document.querySelector('input[type=radio][name=pattern]:checked').id;
  $.ajax({
    method: "POST",
    url: '/cc/include/check_apply.php',
    data:{
      type: 'apply1',
      age: age,
      height: height,
      weight: weight,
      gender: gender,
      activity: activity,
      bmr: bmr,
      kcal: kcal
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
        location.href="/cc/pages/apply2.php";
      } else if(data ==='post_error'){
        console.log('apply1 포스트 타입을 받지 못했습니다.');
      } else {
        console.log(data);
      }
    }
  })
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
  //input[type=radio]
  $('input').on('input',function(){
      height = $('.height-input')[0].value;
      weight = $('.weight-input')[0].value;
      age = $('.age-input')[0].value;
      gender = $('input[type=radio][name=gender]:checked');
      pattern = $('input[type=radio][name=pattern]:checked');

      if(height && weight && age && Number.isInteger(+height) && Number.isInteger(+weight) && Number.isInteger(+age)
        && gender[0] && pattern[0]){
          patternValue = pattern[0].id;
          console.log(patternValue);
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
          console.log(patternMul);
          $('span.bmr').text(Math.round(bmr));
          $('span.kcal').text(Math.round(cal));
      }
  });

}
