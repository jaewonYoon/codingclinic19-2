var ProgressBar = require('progressbar.js');

const heartWriter = () => {
  var heart = new ProgressBar.Path('#heart-path', {
    easing: 'easeInOut',
    duration: 3000
  });

  heart.set(0);
  heart.animate(1.0);  // Number from 0.0 to 1.0
}
const calProcess = () => {
  $.ajax({
    method: 'GET',
    url: 'getGraph',
    beforeSend:function(){
      $('.loader-heart').css('display','block');
      $('.loader-cover').css('display','block');
      heartWriter()
    },
    complete:function(){
      $('.loader-heart').css('display','none');
      $('.loader-cover').css('display','none');
    },
    success:function(data){
      if(data){
        perDayWriter(10) 
      }else {
        console.log(data);
      }
    }
  })
}
const perDayWriter = value => {
var bar = new ProgressBar.SemiCircle(container, {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  svgStyle: null,
  text: {
    value: '',
    alignToBottom: false
  },
  from: {color: '#FFEA82'},
  to: {color: '#ED6A5A'},
  // Set default step function for all animate calls
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
    var value = `${Math.round(bar.value() * 100)}`;
    if (value === 0) {
      bar.setText('');
    } else {
      bar.setText(value);
    }

    bar.text.style.color = state.color;
  }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

bar.animate(0.5);  // Number from 0.0 to 1.0

}

calProcess();
