let movies = [];
let baseUrl = new URL(`https://api.themoviedb.org/3/movie`);

const getMovieData = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
      },
    };
    baseUrl = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;

    const data = await fetch(baseUrl, options).then((response) =>
      response.json()
    );
    console.log(data.results);
    movies = data.results;
    render();
  } catch (error) {
    console.log(error);
  }
};

const toDetail = (movieId) => {
  window.location.href = `detail.html?movieId=${movieId}`;
};

const render = () => {
  const movieHTML = movies
    .map(
      (movie) =>
        ` <div id="aaa" onClick="toDetail(${movie.id})"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" /></div> `
    )
    .join("");

  document.querySelector(".category-movie").innerHTML = movieHTML;
};

getMovieData();
