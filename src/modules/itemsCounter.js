const itemsNumber = () => {
  const moviesNumber = document.querySelectorAll('.movie');
  const count = moviesNumber.length;
  return count;
};

export default itemsNumber;