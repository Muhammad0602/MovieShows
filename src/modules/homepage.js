import popup from './popup.js';

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

  //  console.log(likes);
  getMovies().then((res) => {
    res.forEach((film, index) => {
      const movie = document.createElement('div');
      movie.id = `a${index}`;
      movie.classList.add('movie');

      // Getting the item with the needed it
      const foundFilm = likes.find((like) => parseInt(like.item_id) === film.show.id);

      movie.innerHTML = `
        <img src="${film.show.image.medium}" alt="${film.show.name}">
        <h3>${film.show.name}</h3>
        <div class="btn-container">
            <button class="heart" id=${film.show.id}>
              <i class="far fa-heart fa-2x"></i>
            </button>  
            <p>${foundFilm.likes}</p>
            <button class="btn btnComment" id="${film.show.id}">Comment</button> 
        </div>       
`;
      container.appendChild(movie);
    });
    document.querySelector('.main').appendChild(container);

    const btnComments = document.querySelectorAll('.btnComment');
    btnComments.forEach((comment) => {
      comment.addEventListener('click', popup);
    });

    const btnLikes = document.querySelectorAll('.heart');
    btnLikes.forEach((like) => {
      like.addEventListener('click', () => {
        postLikes(like.id);
      });
    });
  });
};

export default render;