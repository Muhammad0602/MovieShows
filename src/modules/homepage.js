import popup from './popup.js';
import itemsNumber from './itemsCounter.js';

const movieUrl = 'https://api.tvmaze.com/search/shows?q=fbi';
const container = document.createElement('div');
container.classList.add('main-container');

const getMovies = async () => {
  const response = await fetch(movieUrl);
  const result = await response.json();
  return result;
};

// Create a movie

const render = async (getLikes, postLikes) => {
  const likes = await getLikes();

  getMovies().then((res) => {
    res.forEach((film, index) => {
      const movie = document.createElement('div');
      movie.id = `a${index}`;
      movie.classList.add('movie');

      // Getting the item with the needed it
      const foundFilm = likes.find((like) => parseInt(like.item_id, 10) === film.show.id);
      const likesCount = foundFilm && foundFilm.likes ? foundFilm.likes : 0;

      movie.innerHTML = `
        <img src="${film.show.image.medium}" alt="${film.show.name}">
        <h3>${film.show.name}</h3>
        <div class="btn-container">
            <button class="heart" id=${film.show.id}>
              <i class="far fa-heart fa-2x"></i>
            </button>  
            <p>${likesCount}</p>
            <button class="btn btnComment" id="${film.show.id}">Comment</button> 
        </div>       
`;
      container.appendChild(movie);
    });
    document.querySelector('.main').appendChild(container);

    const moviesNumber = itemsNumber();
    const movieLi = document.querySelector('.movie-li');
    movieLi.innerHTML = `Movies (${moviesNumber})`;

    const btnComments = document.querySelectorAll('.btnComment');
    btnComments.forEach((comment) => {
      comment.addEventListener('click', popup);
    });

    const btnLikes = document.querySelectorAll('.heart');
    btnLikes.forEach((like) => {
      like.addEventListener('click', () => {
        postLikes(like.id)
          .catch(() => {
            const pTag = like.nextElementSibling;
            pTag.textContent = parseInt(pTag.textContent, 10) - 1;
          });
        const pTag = like.nextElementSibling;
        pTag.textContent = parseInt(pTag.textContent, 10) + 1;
      });
    });
  });
};

export default render;