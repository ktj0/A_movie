const $txt = document.querySelector('#txt');
const $form = document.querySelector('#form');
const $reset = document.querySelector('#reset');
const $id = document.querySelector('#id');
const $pwd = document.querySelector('#pwd');
const $allReset = document.querySelector('#all-reset');
const $form2 = document.querySelector('#form2');
const $cmt = document.querySelector('#cmt');

const url = new URL(location.href);
const idParams = +url.searchParams.get('id');

export const comment = async () => {
    $reset.addEventListener('click', () => {
        localStorage.removeItem('id');
        localStorage.removeItem('pwd');

        window.location.reload();
    });

    $allReset.addEventListener('click', () => {
        localStorage.clear();
    });

    $form.addEventListener('submit', e => {
        e.preventDefault();

        localStorage.setItem('id', $id.value);
        localStorage.setItem('pwd', $pwd.value);

        $id.value = '';
        $pwd.value = '';
        $form.style.display = 'none';
    });

    $txt.addEventListener('click', () => {
        if (!localStorage.getItem('id')) {
            $form.style.display = 'block';
        } else {
            $txt.removeAttribute('readonly');
        }
    });

    $form2.addEventListener('submit', e => {
        e.preventDefault();

        const cmtSto = Object.keys(localStorage)
            .filter(item => !isNaN(item))
            .sort((a, b) => b - a);
        let priKey = 0;

        if (!cmtSto.includes('1')) {
            priKey = 1;
        } else {
            priKey = +cmtSto[0] + 1;
        }

        const obj = {
            priKey: priKey,
            userId: localStorage.getItem('id'),
            cmt: $txt.value,
            movieId: idParams
        };

        localStorage.setItem(priKey, JSON.stringify(obj));

        window.location.reload();
    });

    $cmt.addEventListener('click', e => {
        if (e.target.textContent === '삭제') {
            if (e.target.parentNode.querySelector('.user-id').textContent !== localStorage.getItem('id')) {
                alert('아이디가 일치하지 않습니다.');
            } else {
                if (confirm('댓글을 정말로 삭제하시겠습니까?')) {
                    localStorage.removeItem(e.target.parentNode.id);

                    window.location.reload();
                }
            }
        } else if (e.target.textContent === '수정') {
            if (e.target.parentNode.querySelector('.user-id').textContent !== localStorage.getItem('id')) {
                alert('아이디가 일치하지 않습니다.');
            } else {
                const cmtReview = e.target.parentNode.querySelector('.cmt-review');

                cmtReview.removeAttribute('readonly');
                cmtReview.style.border = '1px solid';
                cmtReview.select();
                e.target.innerText = '등록';
            }
        } else if (e.target.textContent === '등록') {
            if (confirm('댓글을 정말로 수정하시겠습니까?')) {
                const key = e.target.parentNode.id;
                const mdfSto = {
                    priKey: JSON.parse(localStorage.getItem(key))['priKey'],
                    userId: JSON.parse(localStorage.getItem(key))['userId'],
                    cmt: e.target.parentNode.querySelector('.cmt-review').value,
                    movieId: JSON.parse(localStorage.getItem(key))['movieId']
                };

                localStorage.setItem(key, JSON.stringify(mdfSto));

                window.location.reload();
            } else {
                window.location.reload();
            }
        }
    });
};

export function PostingCmt() {
    const cmtSto = Object.keys(localStorage)
        .filter(item => !isNaN(item))
        .sort((a, b) => b - a);

    if (!localStorage['id']) {
        $reset.style.display = 'none';
    } else {
        $reset.style.display = 'blaock';
    }

    $cmt.innerHTML = cmtSto
        .map(item => {
            const priKey = JSON.parse(localStorage.getItem(item))['priKey'];
            const userId = JSON.parse(localStorage.getItem(item))['userId'];
            const cmt = JSON.parse(localStorage.getItem(item))['cmt'];
            const movieId = JSON.parse(localStorage.getItem(item))['movieId'];

            if (movieId === idParams) {
                return `<li id="${priKey}" class="cmt-li">
                            <p class="user-id">${userId}</p>
                            <textarea class="cmt-review" cols="50" rows="5" readonly>${cmt}</textarea><br>
                            <button>수정</button>
                            <button>삭제</button>
                        </li>`;
            }
        })
        .join('');
}
