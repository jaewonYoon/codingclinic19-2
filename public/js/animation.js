const carousel_inner = document.querySelector('.carousel-item.item1');
const header = document.querySelector('header');
const text_box = document.querySelector('.carousel-item.item1 .text-box');
const t1 = new TimelineMax();
t1
.fromTo(
  carousel_inner,
  1,
  {height:"0px"},
  {height: '600px',ease:Power2.easeInOut}
)
.fromTo(
  carousel_inner,
  1,
  {width: '50%'},
  {width: '100%', ease:Power2.easeInOut}
)
.fromTo(
  text_box,
  1.0,
  {x: "200%"},
  {x: '0%', ease:Power2.easeInout},
  "-=1.9"
);
