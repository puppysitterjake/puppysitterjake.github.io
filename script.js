// =====================
// CONFIG
// =====================

const SHEET_ID = "1JbONtH3RWufz3RSgs3EnMV9cYd_37xwBOHgaU2y_yCs";
const SHEET_NAME = "CONTENT";

const API = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

const slider = document.getElementById("slider");
const board = document.getElementById("noticeBoard");


// =====================
// LOAD DATA
// =====================

fetch(API)
  .then(res => res.json())
  .then(data => {

    data.forEach(row => {

      const type = (row.type || "").toLowerCase();
      const title = row.title || "";
      const url = row.url || "";
      const desc = row.desc || "";


      // ========= HERO =========
      if(type === "hero"){
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.innerHTML = `<img src="${url}">`;
        slider.appendChild(slide);
      }


      // ========= NOTICE (youtube thumbnail auto) =========
      else if(type === "notice"){
        const id = getYoutubeID(url);
        const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

        board.innerHTML += `
          <a class="card" href="${url}" target="_blank">
            <img src="${thumb}">
            <div class="card-body">
              <h3>${title}</h3>
              <p>${desc}</p>
            </div>
          </a>
        `;
      }


      // ========= SPOTIFY (iframe directly) =========
      else if(type === "spotify"){
        board.innerHTML += `
          <div class="card">
            ${url}
          </div>
        `;
      }


      // ========= APPLE / ANY EMBED =========
      else if(type === "apple" || type === "embed"){
        board.innerHTML += `
          <div class="card">
            ${url}
          </div>
        `;
      }

    });

    startSlider();

  });


// =====================
// YOUTUBE HELPER
// =====================

function getYoutubeID(link){
  const reg = /(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/;
  const match = link.match(reg);
  return match ? match[1] : "";
}


// =====================
// SIMPLE SLIDER
// =====================

function startSlider(){
  const slides = document.querySelectorAll(".slide");
  let i = 0;

  slides[0].style.display = "block";

  setInterval(()=>{
    slides.forEach(s => s.style.display="none");
    slides[i].style.display="block";
    i = (i+1) % slides.length;
  },3000);
}
