const movieContainer = document.querySelector("#movie-container"); 
const randomButton = document.querySelector("#random-button");
const selectedMovieContainer = document.querySelector("#selected-movie-container");
const titleInput = document.querySelector("#title-input");
const addButton = document.querySelector("#add-button");
const resetButton = document.querySelector("#reset-button");



const movies = [ 
  { 
    Tittel: "Star Wars",
    Bilde: "./images/Star Wars.jpg",
    alt: "a Star Wars movie poster", 
    Sjanger: "Science fiction / Fantasy / Eventyr / Action", 
    Utgivelserår: "1999", 
    Lengde: "2 t. 13 min.", 
    Språk: "Engelsk", 
  },

  { 
    Tittel: "Lord of the Rings",
    Bilde: "./images/Lord of the Rings.jpg",
    alt: "a Lord of the rings movie poster", 
    Sjanger: "Episk fantasy / Eventyr / Action", 
    Utgivelserår: "2001", 
    Lengde: "2 t. 58 min.", 
    Språk: "Engelsk", 
  },

  { 
    Tittel: "Titanic",
    Bilde: "./images/Titanic.jpg",
    alt: "Titanic movie poster", 
    Sjanger: "Romantisk drama / Katastrofe, Thriller", 
    Utgivelserår: "1997", 
    Lengde: "3 t. 14 min.", 
    Språk: "Engelsk", 
  },

  { 
    Tittel: "Hokus Pokus",
    Bilde: "./images/Hocus Pocus.jpg",
    alt: "Hocus Pocus movie poster", 
    Sjanger: "Kommedie / Fantasie / Halloween", 
    Utgivelserår: "1993", 
    Lengde: "1 t. 36 min.", 
    Språk: "Engelsk", 
  },

  { 
    Tittel: "Pulp Fiction",
    Bilde: "./images/Pulp Fiction.jpg",
    alt: "Pulp Fiction movie poster", 
    Sjanger: "Gangsterfilm / Svart Komedie / Actionthriller", 
    Utgivelserår: "1994", 
    Lengde: "2 t. 34 min.", 
    Språk: "Engelsk", 
  },
];

const initialMovies = [...movies];

// Oppretter beholderen for filmkortet
function createMovieCard(movie, isDetailed = true) { 

    const card = document.createElement("div"); 
    card.classList.add("movie-card"); 

    const tittel = document.createElement("h3");
    tittel.classList.add("movie-tittel");
    tittel.textContent = movie.Tittel;

    const movieImage = document.createElement("img");
    movieImage.classList.add("movie-image");
    movieImage.src = movie.Bilde;
    movieImage.alt = movie.alt;

    // Hvis kortet brukes i tilfeldig-seksjonen, vis kun tittel og bilde
    if (!isDetailed) {
        card.append(tittel, movieImage);
        return card;
    }

    const movieSjanger = document.createElement("p"); 
    movieSjanger.textContent = movie.Sjanger; 
    movieSjanger.classList.add("movie-sjanger"); 

    const movieÅr = document.createElement("p"); 
    movieÅr.textContent = movie.Utgivelserår; 
    movieÅr.classList.add("movie-år");

    const movieLengde = document.createElement("p"); 
    movieLengde.textContent = movie.Lengde; 
    movieLengde.classList.add("movie-lengde");

    const movieSpråk = document.createElement("p"); 
    movieSpråk.textContent = movie.Språk; 
    movieSpråk.classList.add("movie-språk");

    // Knapp for å slette filmen
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Slett";
    deleteButton.classList.add("delete-button");

    // Fjerner fra DOM og oppdaterer array
    deleteButton.addEventListener("click", () => {
        card.remove();

        // Søker gjennom array for å fjerne filmen fra datastrukture
        for (let i = 0; i < movies.length; i++) {
        if (movies[i].Tittel === movie.Tittel) {
            movies.splice(i, 1);
            break;
        }
      }
    });

    // Tilsetter alle elementene på kortet
    card.append(tittel, movieImage, movieSjanger, movieÅr, movieLengde, movieSpråk, deleteButton);

    return card;
}

for (let movie of movies) { 
    const card = createMovieCard(movie);
    movieContainer.append(card);
}

// Funksjon for å velge og vise en tilfeldig film fra array
function getRandomMovie() {
    selectedMovieContainer.innerHTML = "";

    // Genererer en tilfeldig indeks basert på gjeldende antall filmer
    const randomIndex = Math.floor(Math.random() * movies.length);
    const selectedMovie = movies[randomIndex];

    const randomCard = createMovieCard(selectedMovie, false);
    selectedMovieContainer.append(randomCard);

    randomButton.textContent = "Velg en annen film!";
}


// Funksjon for å tilsette en ny film skrevet inn av brukeren.
function addMovie() {
    const userTitle = titleInput.value.trim();
    // Sjekker at input-feltet ikke er tomt
    if (userTitle === "") {
        alert("Vennligst skriv inn en filmtittel!");
        return;
    }

    // Oppretter et nytt filmokort
    const newMovie = {
        Tittel: userTitle,
        Bilde: "./images/cinema.jpg",
        alt: "ciak and pop corn with yellow background",
    };

    movies.push(newMovie);

    const newCard = createMovieCard(newMovie);
    movieContainer.append(newCard);

    // Tømmer input-feltet
    titleInput.value = "";

}

// Funksjon for å tilbakestille film samlingen
function resetCollection() {
    // Sletter eksisterende elementer fra DOM
    movieContainer.innerHTML = "";
    selectedMovieContainer.innerHTML = "";

    randomButton.textContent = "Velg en tilfeldig film!";

    // Nullstiller arrayet og fyller det på nytt med startfilmene
    movies.length = 0;
    movies.push(...initialMovies);

    // Tegner alle filmkort på nytt
    for (let movie of movies) {
        const card = createMovieCard(movie);
        movieContainer.append(card);
    }

}

randomButton.addEventListener("click", getRandomMovie);
addButton.addEventListener("click", addMovie);
resetButton.addEventListener("click", resetCollection);