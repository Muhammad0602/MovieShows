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
const getComment = async (id) => {
  const link = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XtuVNngLWGIw29DM2WbT/comments?item_id=${id}`;
  const response = await fetch(link);
  const result = await response.json();
  return result;
};

const popup = async (event) => {
  const movieId = event.target.id;

  getMovie(movieId).then((res) => {
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
    getComment(movieId).then((res) => {
      let commentContainer = `
                        <div class="commentContainer">
                        <h2 class="commentsTitle">Comments (x)</h2>`;
      try {
        res.forEach((element) => {
          commentContainer += `<p>${element.creation_date}&nbsp &nbsp ${element.username}  : &nbsp &nbsp ${element.comment}`;
        });
      } catch (e) {
        commentContainer += '<p>No comments yet';
      }

      commentContainer += '</div>';
      pop.innerHTML += commentContainer;
      document.querySelector('.main').appendChild(pop);
      document.getElementById('popupClose').addEventListener('click', close);
    });
  });
};
export default popup;