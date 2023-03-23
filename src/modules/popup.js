const getMovie = async (id) => {
  const movieLink = `https://api.tvmaze.com/shows/${id}`;
  const response = await fetch(movieLink);
  const result = await response.json();
  return result;
};
const close = () => {
  const popup = document.getElementById('popup');
  document.querySelector('main').removeChild(popup);
};

const popup = async (event) => {
  getMovie(event.target.id).then((res) => {
    const pop = document.createElement('div');
    pop.classList.add('popup');
    pop.id = 'popup';
    pop.innerHTML = `
      <button id="popupClose" class="popupClose">X</button>
  <img src="${res.image.medium}" alt="${res.name}" class="popupImage">
  <h1 class="popupTitle">${res.name}</h1>
  <div class="popupDesc">
  <div>
  <div>Language: ${res.language}</div>
  <div>Date: ${res.premiered}</div>
  </div>
  <div>
  <div>rating: ${res.rating.average}</div>
  <div>status: ${res.status}</div>
  </div>
  </div>
  `;
    document.querySelector('.main').appendChild(pop);
    document.getElementById('popupClose').addEventListener('click', close);
  });
};
export default popup;