const useCheckSavedFilm = () => {

  const checkSaved = (movies, movie) => {
    if (movies) {
      return movies.find((item) => {
        return item.movieId === movie.id;
      });
    }
  };

  return { checkSaved };
};

export default useCheckSavedFilm;
