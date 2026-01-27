const SHEET_ID = "1JbONtH3RWufz3RSgs3EnMV9cYd_37xwBOHgaU2y_yCs";
const API = `https://opensheet.elk.sh/${SHEET_ID}`;

async function fetchSheet(name){
  const res = await fetch(`${API}/${name}`);
  return await res.json();
}

/* -----------------------
   YOUTUBE THUMBNAIL AUTO
----------------------- */
function getYT(url){
  const reg=/(?:v=|\.be\/)([^&]+)/;
  return (url.match(reg)||[])[1];
}

function ytThumb(url){
  return `https://i.ytimg.com/vi/${getYT(url)}/maxresdefault.jpg`;
}

/* HERO SLIDER */
async function loadHero(){
  const data = await fetchSheet("HERO");
  const hero = document.getElementById("hero");

  let i=0;

  function show(){
    hero.style.backgroundImage=`url(${data[i].image})`;
    i=(i+1)%data.length;
  }

  show();
  setInterval(show,4000);
}

/* CARD LIST */
async function loadCards(sheet,id){
  const data = await fetchSheet(sheet);
  const box = document.getElementById(id);

  data.forEach((r,i)=>{
    const thumb = ytThumb(r.url);

    box.innerHTML+=`
    <a class="card" href="${r.url}" target="_blank" style="animation-delay:${i*.08}s">
      <img src="${thumb}">
      <div class="card-body">
        <h3>${r.title}</h3>
        <p>${r.desc||""}</p>
      </div>
    </a>
    `;
  });
}

/* EMBED */
async function loadEmbed(sheet,id){
  const data = await fetchSheet(sheet);
  const box = document.getElementById(id);

  data.forEach(r=>{
    box.innerHTML+=r.iframe;
  });
}

/* INIT */
loadHero();
loadCards("NOTICE","notice-list");
loadCards("YOUTUBE","youtube-list");
loadEmbed("SPOTIFY","spotify-list");
loadEmbed("APPLE","apple-list");
