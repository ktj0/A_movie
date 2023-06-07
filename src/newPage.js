import {respondApi} from './movie_posting.js';
import {comment} from './comment.js';
import {PostingCmt} from './comment.js';

const url = new URL(location.href);
const idParams = +url.searchParams.get('id');
const $div = document.querySelector('#div');

document.addEventListener('DOMContentLoaded', () => {
    movieInfo();
    PostingCmt();
    comment();
});

async function movieInfo() {
    const moviesInfo = await respondApi('ko-KR');

    const selectMovie = moviesInfo.find(movie => movie['id'] === idParams);
    alert(`id: ${idParams}`);

    $div.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${selectMovie['poster_path']}" id="img">
                    <p id="title">${selectMovie['title']}</p>
                    <p id="overview">${selectMovie['overview']}</p>
                    <p id="vote-avg">${selectMovie['vote_average']}</p>`;
}
