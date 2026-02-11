document.querySelectorAll(".portfolio-card").forEach(card=>{
card.addEventListener("click",()=>{
const videoId=card.dataset.video;
modal.style.display="flex";
modalIframe.src=
"https://player.vimeo.com/video/"+videoId+
"?autoplay=1&muted=1&title=0&byline=0&portrait=0&badge=0&controls=1&dnt=1";
});
});
