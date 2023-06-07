import {postingMovie} from './movie_posting.js';
import {searcinghMovie} from './search.js';

postingMovie();

const $searchForm = document.querySelector('#search-form');
const $searchInput = document.querySelector('#search-input');

$searchForm.addEventListener('submit', event => {
    event.preventDefault();

    searcinghMovie($searchInput);
});

const $cardList = document.querySelector('#card-list');

$cardList.addEventListener('click', event => {
    if (event.target === $cardList) {
        return;
    }
    if (event.target.matches('.movie-card')) {
        window.open(`newPage.html?id=${event.target.id}`);
    } else {
        window.open(`newPage.html?id=${event.target.parentNode.id}`);
    }
});
