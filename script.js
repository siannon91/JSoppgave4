const movieContainer = document.querySelector("#movie-container"); 


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
];


for (let movie of movies) { 

  const card = document.createElement("div"); 
  card.classList.add("movie-card"); 

  const tittel = document.createElement("h3");
  tittel.classList.add("movie-tittel");
  tittel.textContent = movie.Tittel;

  const movieImage = document.createElement("img");
  movieImage.classList.add("movie-image");
  movieImage.src = movie.Bilde;
  movieImage.alt = movie.alt;

  card.append(tittel, movieImage);

  movieContainer.append(card);
}