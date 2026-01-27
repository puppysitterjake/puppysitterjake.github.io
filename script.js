const SHEET_ID = "1JbONtH3RWufz3RSgs3EnMV9cYd_37xwBOHgaU2y_yCs";

const heroAPI    = `https://opensheet.elk.sh/${SHEET_ID}/HERO`;
const noticeAPI  = `https://opensheet.elk.sh/${SHEET_ID}/NOTICE`;
const youtubeAPI = `https://opensheet.elk.sh/${SHEET_ID}/YOUTUBE`;
const spotifyAPI = `https://opensheet.elk.sh/${SHEET_ID}/SPOTIFY`;
const appleAPI   = `https://opensheet.elk.sh/${SHEET_ID}/APPLE`;
const ytmAPI     = `https://opensheet.elk.sh/${SHEET_ID}/YTMUSIC`;

loadHero();
loadNotice();
loadYoutube();
loadEmbed(spotifyAPI,"spotifyBoard");
loadEmbed(appleAPI,"appleBoard");
loadYTMusic();   // NEW



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



// ================= YOUTUBE THUMB =================

function getYoutubeID(link){
  if(!link) return "";

  const reg=/(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const m=link.match(reg);
  return m?m[1]:"";
}

function getYoutubeThumb(link){
  const id=getYoutubeID(link);

  if(!id){
    return "https://via.placeholder.com/480x360?text=No+Thumbnail";
  }

  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}



// ================= NOTICE =================

function loadNotice(){
  fetch(noticeAPI)
  .then(r=>r.json())
  .then(data=>{

    const box=document.getElementById("noticeBoard");

    data.forEach(row=>{
      const thumb=getYoutubeThumb(row.url);
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
      const thumb=getYoutubeThumb(row.url);
      box.innerHTML+=card(thumb,row.title,"",row.url);
    });

    reveal();
  });
}



// ================= YTMUSIC (NO EMBED) =================

function loadYTMusic(){
  fetch(ytmAPI)
  .then(r=>r.json())
  .then(data=>{

    const box=document.getElementById("ytmusicBoard");

    data.forEach(row=>{
      const img=row.image || "https://via.placeholder.com/480x360?text=YouTube+Music";

      box.innerHTML+=card(img,row.title,"Open in YouTube Music",row.url);
    });

    reveal();
  });
}



// ================= EMBED (spotify/apple) =================

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



// ================= CARD =================

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



// ================= SLIDER =================

function startSlider(){
  const slides=document.querySelectorAll(".slide");
  if(!slides.length) return;

  let index=0;

  slides[0].classList.add("active");

  setInterval(()=>{
    slides[index].classList.remove("active");
    index=(index+1)%slides.length;
    slides[index].classList.add("active");
  },4000);
}



// ================= ANIMATION =================

function reveal(){
  const els=document.querySelectorAll(".reveal");

  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("show");
      }
    });
  });

  els.forEach(el=>obs.observe(el));
}
