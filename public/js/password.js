function typing(pwInput,pwCkInput,emailInput,alert,alert2,alert3){
  pwInput.onkeyup = function(){
    const pw = pwInput.value;
    if(!pwdValid(pw)){
        alert.innerText = '비밀번호는 특수문자,숫자, 영어 대/소문자를 포함해서 10글자가 넘어야 합니다.';
    }else{
        alert.innerText='';
    }
  }
  pwCkInput.onkeyup =function(){
    const pw = pwInput.value;
    const pw_ck = pwCkInput.value;
    if(!pwdChkValid(pw,pw_ck)){
      alert2.innerText='비밀번호가 일치하지 않습니다.';
    } else{
      alert2.innerText='';
    }
  }

  emailInput.onkeyup = function(){
    const email = emailInput.value;
    if(!emailValid(email)){
      alert3.innerText='올바른 이메일 형식으로 적어주세요.';
    }else{
      alert3.innerText='';
    }
  }
}

function pwdChkValid(pw,pw_ck){
  if(pw!=pw_ck){
    return 0
  } else return 1;
}
function pwdValid(pw){
  const pattern1 =/[0-9]/;
  const pattern2 =/[a-z]/;
  const pattern3 =/[~!@#$%<>^&*()_+?]/;
  // const pattern4 = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{10,20}$/
  if(!pattern1.test(pw)||!pattern2.test(pw)||!pattern3.test(pw)||pw.length<10||pw.length>50){
  // if(!pattern4.test(pw)){
    return 0;
  }
  return 1;
}
function emailValid(email){
  const pattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if(!pattern.test(email)){
    return 0;
  }else{
    return 1;
  }
}
