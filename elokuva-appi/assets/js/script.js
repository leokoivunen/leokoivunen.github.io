// TMBD - Config
const API_KEY = "api_key=54cfa8fd3e538287147c85dbc892b4da";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
// TOP RATING - const API_URL = BASE_URL + "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

// Import GENRES
// const genres = require('./genres.json');
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

// Import HTML Elements into javascript
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("genres");
let selectedGenre = [];

// Trigger function
setGenre();
getMovies(API_URL);

// ===== Functions

function setGenre() {
  tagsEl.innerHTML = "";
  genres.forEach((genre) => {
    const tags = document.createElement("li");
    tags.classList.add("genre");
    tags.id = genre.id;
    tags.innerText = genre.name;
    tags.addEventListener("click", () => {
      if (selectedGenre.length === 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id === genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + "&with_genres=" + selectedGenre.join(","));
      highlightSelection();

    });

    tagsEl.append(tags);
  });
}

function highlightSelection() {
  const genres = document.querySelectorAll(".genre");
  genres.forEach(genre => {
    genre.classList.remove('highlight');
  })

  if (selectedGenre.length != 0) {
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
}

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}"/>

    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>

    <div class="overview">
      <h3>Overview</h3>
      ${overview};
    </div>

    `;

    main.appendChild(movieEl);
  });
}

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

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_URL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
