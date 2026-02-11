gsap.registerPlugin(ScrollTrigger);

/* 네비 스크롤 축소 */
window.addEventListener("scroll",()=>{
document.querySelector("nav")
.classList.toggle("scrolled",window.scrollY>50);
});

/* Hero 패럴랙스 */
window.addEventListener("mousemove",(e)=>{
gsap.to(".hero img",{
x:(e.clientX-window.innerWidth/2)/30,
y:(e.clientY-window.innerHeight/2)/30,
duration:0.5
});
});

/* 서비스 애니메이션 */
gsap.utils.toArray(".service").forEach((el,i)=>{
gsap.to(el,{
opacity:1,
y:0,
duration:1,
delay:i*0.1,
scrollTrigger:{trigger:el,start:"top 85%"}
});
});

/* 포트폴리오 애니메이션 */
gsap.utils.toArray(".portfolio-card").forEach((el)=>{
gsap.to(el,{
opacity:1,
y:0,
duration:1,
scrollTrigger:{trigger:el,start:"top 85%"}
});
});

/* 모달 */
const modal=document.querySelector(".modal");
const modalIframe=modal.querySelector("iframe");

document.querySelectorAll(".portfolio-card").forEach(card=>{
card.addEventListener("click",()=>{
const videoId=card.dataset.video;
modal.style.display="flex";
modalIframe.src=
"https://player.vimeo.com/video/"+videoId+
"?autoplay=1&muted=1&title=0&byline=0&portrait=0&badge=0&controls=1&dnt=1";
});
});

modal.addEventListener("click",()=>{
modal.style.display="none";
modalIframe.src="";
});

/* 커스텀 커서 */
const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});
