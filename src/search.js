export const searcinghMovie = $searchInput => {
    const $movieCards = document.querySelectorAll('.movie-card');
    const searchValue = $searchInput.value.toLowerCase().replace(/\s/g, '');

    $movieCards.forEach(movie => {
        const $movieTitle = movie.querySelector('.movie-title').textContent.toLowerCase().replace(/\s/g, '');

        if ($movieTitle.includes(searchValue)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
};
