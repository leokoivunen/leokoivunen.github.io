// TMBD API - Asetukset
const API_KEY = "api_key=54cfa8fd3e538287147c85dbc892b4da"; // API AVAIN joka tarvitaan elokuvien json tiedoston hakemiseen
const BASE_URL = "https://api.themoviedb.org/3"; // tarvitaan siihen että ohjelma osaa löytää json tiedoston
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY; // yhdistetään BASE URL + "kategoria" + API avain yhdeksi muuttujaksi

const IMG_URL = "https://image.tmdb.org/t/p/w500"; // IMG URL-osoite kuvien hakemiseen
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY; // Hakemisto-URL siihen että voimme kirjottaa teksti laatikkoon elokuvan mitä haemme

// LOG
console.log("")
console.log("API avain:", API_KEY)
console.log("BASE url:", BASE_URL)
console.log("API url:", API_URL)
console.log("IMG url:", IMG_URL)
console.log("SEARCH url:", SEARCH_URL)
console.log("")

// Luodaan HTML elementeille omat muuttujat
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("genres");

// Luodaan genre muuttuja joka sisältää genrejen kopioimani json datan
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

console.log("Genres sisältää alkioita: ", genres.length)
console.log("")

// Esittellään ja alustetaan selectedGenre muuttuja Array
let selectedGenre = [];

console.log("Valitut genret alkioina:", selectedGenre.length)
console.log("Valitut genret:", selectedGenre)
console.log("")


// Kutsutaan funktiota
setGenre();

// Kutsutaan funktiota API_URL kanssa
getMovies(API_URL);
console.log("")
console.log("Haetaan elokuvia: ", API_URL)
console.log("")

// Luodaan functio setGenre
function setGenre() {
  // asetetaan genres tyhjäksi
  tagsEl.innerHTML = "";
  console.log("Genres: ", tagsEl)

  // Mennään läpi genres muuttuja ja käytetään array funktiota
  // Luodaan tässä uusi muuttuja nimeltä genre
  genres.forEach((genre) => {
    console.log("Genre: ", genre)

    // Luodaan uusi muuttuja tags joka luo elementin <li></li>
    const tags = document.createElement("li");
    console.log("Luodaan lista elementti: ", tags)

    // Lisätään <li class="genre"></li> elementtiin tyyli
    tags.classList.add("genre");
    console.log("Annetaan listalle classList genre: ", tags)

    // Tags hakee id:tä genres datasta ja = genre.id joka on meidän listan id
    tags.id = genre.id;
    console.log("Tags hakee id:tä listalle: ", tags)

    // Tulostetaan listan id joka antaa meille genres id numerot
    // console.log(tags.id = genre.id)

    // Tagsin nimike on genren annettu nimi
    tags.innerText = genre.name;
    console.log("Listan nimike on genren annettu nimi: ", tags)

    // Lisätän eventlistener eventti painallukseen
    tags.addEventListener("click", () => {
      console.log("Valittu genre: ", tags)
      // Jos meidän genren alkiot on 0 niin sittn ...
      if (selectedGenre.length === 0) {
        // Puskemme genren id joka jatkaa alkioita eteenpäin aina kun genre on valittu
        selectedGenre.push(genre.id);
        console.log("Pusketaan selectedGenre alkioon: ", selectedGenre)
      }
      // Muuten
      else {
        // Jos meidän valittu genre eli array jonka sisällä on alkioita sisältää valmiiks jo genren ideen niin...
        if (selectedGenre.includes(genre.id)) {
          console.log("Jos selectedGenre sisältää: ", selectedGenre)
          // Käydään genre uusiksi läpi functiolla ja haetaan id, index
          selectedGenre.forEach((id, idx) => {
           console.log("Haetaan id ja index: ", selectedGenre)
            // Jos genre on jo valittu ja sen id on sama kuin genren id niin
            if (id === genre.id) {
              // positionissa index poistamme 1 alkion
              selectedGenre.splice(idx, 1);
            }
          });
        }
        // Muuten
        else {
          // Pusketaan alkioihin genren id joka on tässä tapauksessa elokuvan id
          selectedGenre.push(genre.id);
          console.log("Pusketaan alkioihin genren id: ", selectedGenre)
        }
      }
      // console.log(selectedGenre);
      // haetaan elokuvia getMovies funktiolla
      getMovies(API_URL + "&with_genres=" + selectedGenre.join(",")); // lisätään alkioiden väliin ,

      // kutsutaan funktiota joka vaihtaa värin buttonista
      highlightSelection();
    });

    // Kerrotaan javascriptille että näyttää meidän genren tagit
    tagsEl.append(tags);
  });
}

// Luodaan funktio
function highlightSelection() {
  // Luodaan uusi muuttuja joka hakee kaikkea html:stä jossa on genre class
  const genres = document.querySelectorAll(".genre");

  // Mennään vielä kerran genres läpi forEach funktiolla
  genres.forEach((genre) => {
    // Poistetaan genren classlist
    genre.classList.remove("highlight"); // joka on keltainen väri
    console.log("Poistetaan classlist listasta: ", genre)
  });

  // Jos selectedGenre eli alkioiden pituus ei ole = 0
  if (selectedGenre.length != 0) {
    // Niin sitten mennään forEah funktiolla ja haetaan id:tä
    selectedGenre.forEach((id) => {
      // Luodaan uusi muuttuja joka on id
      const highlightedTag = document.getElementById(id);

      // Lisätään classlist id:seen
      highlightedTag.classList.add("highlight"); // joka on keltainen väri
      console.log("Lisätään classlist listaan: ", highlightedTag)
    });
  }
}

// luodaan funktio ja asetetaan parametriksi url
function getMovies(url) {
  // fetchataan meidän API | url on fetchin parameter jota se tarvitsee
  let response = fetch(url)
    // console.log("API Response: ", response)

    // fetch(url)
    //   .then(response => {
    //     console.log("Try")
    //   })
    //   .catch(error => {
    //     console.log("Catch")
    //   })

    // Haetaan tietoa

    // res = response
    // Serveri vastaa meille: 200 OK / 400 Not found!
    .then((res) => res.json())
    .then((data) => {
      // kutsutaan funktiota ja annetaan paremetriksi data jonka haimme json filusta
      showMovies(data.results);
      console.log(data)
    });
}

// Luodaan funktio jonka parameter on data
function showMovies(data) {
  // tyhjennetään elokuvat kohta
  main.innerHTML = "";

  // mennään data foreach loop movie läpi ja näin me generoidaan elokuvat
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = 
    `
    <img src="${IMG_URL + poster_path}" alt="${title}"/>

    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>

    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>

    `;

    // kutsutaan metodia appendChild joka näyttää elokuvat eli <div></div>
    main.appendChild(movieEl);
  });
}

// luodaan funktio joka hakee värit ratingin perusteella
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// onSearch click
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Luodaan muuttuja jolle annetaan searchin arvo
  const searchTerm = search.value;

  // jos searchTerm on tosi niin
  if (searchTerm) {
    // Kutsutaan functio joka hakee url avulla 
    getMovies(SEARCH_URL + "&query=" + searchTerm); // /search/movie?&query=&
  } else {
    getMovies(API_URL);
  }
});
