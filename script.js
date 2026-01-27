const SHEET =
  "https://opensheet.elk.sh/1JbONtH3RWufz3RSgs3EnMV9cYd_37xwBOHgaU2y_yCs/CONTENT";

fetch(SHEET)
  .then(res => res.json())
  .then(rows => {

    rows.forEach(row => {

      const type = row.type?.toLowerCase();
      const title = row.title;
      const content = row.content || row.link || row.embed || row.url;

      // HERO
      if(type === "hero"){
        const hero = document.getElementById("hero");
        hero.innerText = title;
        hero.style.backgroundImage =
          `url(https://images.unsplash.com/photo-1517849845537-4d257902454a)`;
      }

      // ABOUT
      if(type === "about"){
        document.getElementById("about").innerHTML =
          `<h2>${title}</h2>`;
      }

      // YOUTUBE
      if(type === "youtube"){
        document.getElementById("youtube").innerHTML += `
          <iframe src="https://www.youtube.com/embed/${content}"
          allowfullscreen></iframe>`;
      }

      // SPOTIFY
      if(type === "spotify"){
        document.getElementById("spotify").innerHTML += `
          <iframe src="https://open.spotify.com/embed/playlist/${content}">
          </iframe>`;
      }

      // APPLE (iframe nguyên)
      if(type === "apple"){
        document.getElementById("apple").innerHTML += content;
      }

    });

  });
