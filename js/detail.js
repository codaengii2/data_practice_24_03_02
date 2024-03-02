const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");
let movies = [];
let baseUrl = new URL(`https://api.themoviedb.org/3/movie`);
let movieList = [];

const wrapEl = document.querySelector(".wrap");
const FULL_HEART = '<i class="fa-solid fa-heart full_heart"></i>';
const EMPTY_HEART = '<i class="fa-regular fa-heart empty_heart"></i>';
const heartHandler = (e) => {
  // console.log(e.target.parentNode);//부모로 접근하여 하트를 클릭 / 내용은 innerHTML로 넣기
  const heartEl = e.target.parentNode;
  const deepHeart = e.target.classList.contains("fa-regular");
  const notHeart = e.target.classList.contains("fa-solid");

  if (deepHeart) {
    heartEl.innerHTML = FULL_HEART;
    movieList.push(movieId);

    console.log(movieList);
  } else if (notHeart) {
    heartEl.innerHTML = EMPTY_HEART;
    for (let i = 0; i < movieList.length; i++) {
      if (movieList[i] === movieId) {
        movieList.splice(i, 1);
        i--;
      }
    }
  }
};
wrapEl.addEventListener("click", heartHandler);

const detailRender = async (movieId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
      },
    };
    baseUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&page=1`;
    const data = await fetch(baseUrl, options).then((response) =>
      response.json()
    );
    console.log(data);
    movies = data;
    const detailHTML = `
          <div class="moiveImg">
            <img
              src="https://image.tmdb.org/t/p/original${movies.backdrop_path}"
              alt=""
            />
            <div class="background"></div>
            <div class="imgBottom">
              <div class="titleWrap">
                <h1 id="movie-title">${movies.title}</h1>
                <p id="movie-year">${movies.release_date}</p>
                <p id="movie-v"><i class="fa-solid fa-star"></i>${movies.vote_average.toFixed(
                  1
                )}</p>
                <div class="deepWrap">
                <div class="deepBtn"><i class="fa-regular fa-heart"></i></div>
                <p>찜하기</p>
              </div>
                <div id="detail-description">
                  <h5>작품정보</h5>
                  <p>${movies.overview}</p>
                </div>
              </div>
              <div class="posterWrap">
              <img src="https://image.tmdb.org/t/p/w500${
                movies.poster_path
              }" alt="">
            </div>
            </div>
          </div>
          </div>`;
    console.log(detailWrap);
    detailWrap.innerHTML = detailHTML;
    console.log(detailWrap);
  } catch (error) {
    console.log(error);
  }
};

detailRender(movieId);
