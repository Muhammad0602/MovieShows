const getMovie = async (id) => {
  const movieLink = `https://api.tvmaze.com/shows/${id}`;
  const response = await fetch(movieLink);
  const result = await response.json();
  return result;
};
const close = () => {
  const popup = document.getElementById('popup');
  document.querySelector('main').removeChild(popup);
  document.querySelector('body').style.overflowY = 'scroll';
};
const getComment = async (id) => {
  const link = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XtuVNngLWGIw29DM2WbT/comments?item_id=${id}`;
  const response = await fetch(link);
  const result = await response.json();
  return result;
};
export const commentCount = (comments) => {
  if (comments) {
    if (comments.length > 0) {
      return comments.length;
    }
    return 0;
  }
  return 0;
};
const commentCounter = async (id) => {
  const counter = document.getElementById('commentTitle');
  getComment(id).then((res) => {
    counter.innerText = `Comments (${commentCount(res)})`;
  });
};
const showComment = async (id) => {
  getComment(id).then((res) => {
    let commentContainer = '';
    try {
      res.forEach((element) => {
        commentContainer += `<p class="userComment">${element.creation_date}&nbsp &nbsp ${element.username}  : &nbsp &nbsp ${element.comment}`;
      });
    } catch (e) {
      commentContainer += '<p>No comments yet</p>';
    }
    document.getElementById('commentBody').innerHTML = commentContainer;
  });
};
const addComment = async (id) => {
  const formName = document.getElementById('formName');
  const formComment = document.getElementById('formComment');
  const link = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XtuVNngLWGIw29DM2WbT/comments';
  const body = {
    item_id: id,
    username: formName.value,
    comment: formComment.value,
  };
  await fetch(link, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  formName.value = '';
  formComment.value = '';
  showComment(id).then(() => {
    commentCounter(id);
  });
};

const popup = async (event) => {
  const movieId = event.target.id;
  const pop = document.createElement('div');
  getMovie(movieId).then((res) => {
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
                        <div class="commentContainer" id="commentContainer">
                        <h2 class="commentsTitle" id="commentTitle">Comments (x)</h2>
                        <div id="commentBody">`;
      try {
        res.forEach((element) => {
          commentContainer += `<p class="userComment">${element.creation_date}&nbsp &nbsp ${element.username}  : &nbsp &nbsp ${element.comment}`;
        });
      } catch (e) {
        commentContainer += '<p>No comments yet';
      }

      commentContainer += '</div></div>';
      pop.innerHTML += commentContainer;

      const commentForm = `
            <div class="commentFormContainer">
            <h3 class="commentFormTitle">Add a comment</h3>
            <form class="commentForm">
            <input type="text" id="formName" required placeholder="your name" autocomplete='off'>
           <textarea id="formComment" required placeholder="your comment"></textarea>
           <button type="button" id="commentFormButton">comment</button>
           </form>
            </div>
            `;
      pop.innerHTML += commentForm;

      document.querySelector('.main').appendChild(pop);
      document.getElementById('popupClose').addEventListener('click', close);
      commentCounter(movieId);
      document.getElementById('commentFormButton').addEventListener('click', () => { addComment(movieId); });
      document.querySelector('body').style.overflowY = 'hidden';
    });
  });
};
export default popup;