const itemsNumber = () => {
  // const moviesNumber = document.getElementsByClassName('movie');
  const moviesNumber = document.querySelectorAll('.movie');
  const count = moviesNumber.length;
  return count;
};

export default itemsNumber;