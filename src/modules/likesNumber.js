// const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
// const appApiId = 'RvKFUHQpEg8QWSncxLCl';
const postLikes = async (id) => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/RvKFUHQpEg8QWSncxLCl/likes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: id,
      }),
    },
  );
  const data = await response.text();
  return data;
};

const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/RvKFUHQpEg8QWSncxLCl/likes');
  const data = await response.json();
  return data;
};

export { postLikes, getLikes };