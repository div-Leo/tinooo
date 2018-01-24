import { TweenMax, Elastic } from 'gsap';

export default {
 dropDown(target, number) {
  return TweenMax.to(target, 0.5, {
   height: number
  });
 },
 dropUp(target) {
  return TweenMax.to(target, 0.5, {
   height: 20
  });
 },
 turnArrow(target, num) {
  return TweenMax.to(target, 0.5, {
   transform: `rotateZ(${num}deg)`
  });
 },
 shakeModal(target) {
  return TweenMax.to(target, 0.06, { x: '+=6', yoyo: true, repeat: 5 });
 },
 dotDrop(target) {
  return TweenMax.staggerFrom(
   target,
   1.8,
   {
    top: -50,
    ease: Elastic.easeOut.config(0.9, 0.5),
    delay: 0.6
   },
   0.3
  );
 },
 sideBarOpen(target) {
  return TweenMax.from(target, 1, {
   width: 0
  });
 }
};
