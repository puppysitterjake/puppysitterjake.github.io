const SHEET_ID = "1JbONtH3RWufz3RSgs3EnMV9cYd_37xwBOHgaU2y_yCs";

const heroAPI    = `https://opensheet.elk.sh/${SHEET_ID}/HERO`;
const noticeAPI  = `https://opensheet.elk.sh/${SHEET_ID}/NOTICE`;
const youtubeAPI = `https://opensheet.elk.sh/${SHEET_ID}/YOUTUBE`;
const spotifyAPI = `https://opensheet.elk.sh/${SHEET_ID}/SPOTIFY`;
const appleAPI   = `https://opensheet.elk.sh/${SHEET_ID}/APPLE`;
const ytmAPI     = `https://opensheet.elk.sh/${SHEET_ID}/YTMUSIC`;


// load all
loadHero();
loadNotice();
loadYoutube();
loadEmbed(spotifyAPI,"spotifyBoard");
loadEmbed(appleAPI,"appleBoard");
loadEmbed(ytmAPI,"ytmusicBoard");



// ================= HERO =================

function loadHero(){
  fetch(heroAPI)
  .then(r=>r.json())
  .then(data=>{

    const slider=document.getElementById("slider");

    data.forEach(row=>{
      slider.innerHTML+=`
        <div class="slide">
          <img src="${row.image}">
        </div>
      `;
    });

    startSlider();
  });
}



// ================= NOTICE =================

function loadNotice(){
  fetch(noticeAPI)
  .then(r=>r.json())
  .then(data=>{

    const box=document.getElementById("noticeBoard");

    data.forEach(row=>{
      const id=getYoutubeID(row.url);
      const thumb=`https://img.youtube.com/vi/${id}/hqdefault.jpg`;

      box.innerHTML+=card(thumb,row.title,row.desc,row.url);
    });

    reveal();
  });
}



// ================= YOUTUBE =================

function loadYoutube(){
  fetch(youtubeAPI)
  .then(r=>r.json())
  .then(data=>{

    const box=document.getElementById("youtubeBoard");

    data.forEach(row=>{
      const id=getYoutubeID(row.url);
      const thumb=`https://img.youtube.com/vi/${id}/hqdefault.jpg`;

      box.innerHTML+=card(thumb,row.title,"",row.url);
    });

    reveal();
  });
}



// ================= EMBED =================

function loadEmbed(api,target){
  fetch(api)
  .then(r=>r.json())
  .then(data=>{

    const box=document.getElementById(target);

    data.forEach(row=>{
      box.innerHTML+=`
        <div class="card reveal">${row.embed}</div>
      `;
    });

    reveal();
  });
}



// ================= COMPONENTS =================

function card(img,title,desc,link){
  return `
    <a class="card reveal" href="${link}" target="_blank">
      <img src="${img}">
      <div class="card-body">
        <h3>${title}</h3>
        <p>${desc||""}</p>
      </div>
    </a>
  `;
}



function getYoutubeID(link){
  const reg=/(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/;
  const m=link.match(reg);
  return m?m[1]:"";
}



// ================= SLIDER =================

function startSlider(){

  const slides=document.querySelectorAll(".slide");
  if(!slides.length) return;

  let index=0;

  slides[0].classList.add("active");

  const dots=document.createElement("div");
  dots.className="dots";

  slides.forEach((_,i)=>{
    const d=document.createElement("div");
    d.className="dot";
    d.onclick=()=>show(i);
    dots.appendChild(d);
  });

  document.getElementById("slider").appendChild(dots);

  function show(i){
    slides.forEach(s=>s.classList.remove("active"));
    dots.children[index].classList.remove("active");

    slides[i].classList.add("active");
    dots.children[i].classList.add("active");

    index=i;
  }

  setInterval(()=>show((index+1)%slides.length),4000);

  show(0);
}



// ================= SCROLL ANIMATION =================

function reveal(){
  const els=document.querySelectorAll(".reveal");

  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("show");
      }
    });
  },{threshold:.15});

  els.forEach(el=>obs.observe(el));
}
