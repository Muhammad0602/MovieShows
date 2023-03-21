const movieUrl = "https://api.tvmaze.com/search/shows?q=fbi";
const movieUrl1 = "https://api.tvmaze.com/search/shows?q=hero";

const container = document.createElement('div');
container.classList.add('main-container');
const container1 = document.createElement('div');

const getMovies = async() => {
    const response = await fetch(movieUrl);
    const result = await response.json();
    return result;
}

// Create a movie

const render = async() => {
    getMovies().then(res => {
         res.forEach((film, index) => {
         const movie = document.createElement('div');
         movie.id = `a${index}`;
         movie.classList.add('movie');
         movie.innerHTML = `
        <img src="${film.show.image.medium}" alt="${film.show.name}">
        <h3>${film.show.name}</h3>
        <div class="btn-container">
            <button class="heart"><i class="far fa-heart fa-2x"></i></button>        
            <button class="btn">Comment</button> 
        </div>       
`
container.appendChild(movie);
}); 
document.body.appendChild(container);
    });    
}

const getMovies1 = async() => {
    const response = await fetch(movieUrl1);
    const result = await response.json();
    return result;
}

// Create a movie

const render1 = async() => {
    getMovies1().then(res => {
         res.forEach(film => {
         const movie = document.createElement('div');
         movie.innerHTML = `
        <img src="${film.show.image.medium}" alt="${film.show.name}">
        <h4>${film.show.name}<h4>
        <button><i class="far fa-heart"></i></button>        
        <button>Comment</button>        
`
container1.appendChild(movie);
}); 
document.body.appendChild(container1);
    });    
};

export {render};