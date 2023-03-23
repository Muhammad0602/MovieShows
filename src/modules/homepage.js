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
        // postLikes(film.show.id)
      const movie = document.createElement('div');
      movie.id = `a${index}`;
      movie.classList.add('movie');
      movie.innerHTML = `
        <img src="${film.show.image.medium}" alt="${film.show.name}">
        <h3>${film.show.name}</h3>
        <div class="btn-container">
            <button class="heart">
              <i class="far fa-heart fa-2x"></i>
            </button>  
            <p>${index} likes</p>    
            <button class="btn">Comment</button> 
        </div>       
`;
      container.appendChild(movie);
    });
    document.querySelector('.main').appendChild(container);
  });
};

export default render;