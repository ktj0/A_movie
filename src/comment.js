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

        if (!$id.value && !$pwd.value) {
            // 비어있다면 alert창 출력
            alert('ID와 PW를 입력해주세요.');
        } else if ($id.value === ' ') {
            alert('ID를 입력해주세요.');
        } else if (!$pwd.value) {
            alert('PW를 입력해주세요.');
        } else {
            // ID와 PW값이 '' 비어있지않다면 setItem
            localStorage.setItem('id', $id.value);
            localStorage.setItem('pwd', $pwd.value);

            $id.value = '';
            $pwd.value = '';
            $form.style.display = 'none';
        }
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

        if ($txt.value === '') {
            // 비어있다면 alert창 출력
            alert('댓글을 입력해주세요');
        } else {
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
        }
    });

    let duplicationCheck = true;
    $cmt.addEventListener('click', e => {
        if (e.target.className === 'del') {
            if (e.target.parentNode.querySelector('.user-id').textContent !== localStorage.getItem('id')) {
                alert('아이디가 일치하지 않습니다.');
            } else {
                if (confirm('댓글을 정말로 삭제하시겠습니까?')) {
                    localStorage.removeItem(e.target.parentNode.id);

                    window.location.reload();
                }
            }
        } else if (e.target.className === 'mdf' && duplicationCheck) {
            if (e.target.parentNode.querySelector('.user-id').textContent !== localStorage.getItem('id')) {
                alert('아이디가 일치하지 않습니다.');
            } else {
                const cmtReview = e.target.parentNode.querySelector('.cmt-review');

                cmtReview.removeAttribute('readonly');
                cmtReview.style.border = '1px solid';
                cmtReview.select();
                e.target.innerText = '등록';

                duplicationCheck = false;
            }
        } else if (e.target.className === 'mdf' && !duplicationCheck) {
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
            }
        }
    });
};

export async function PostingCmt() {
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
                            <button class="mdf">수정</button>
                            <button class="del">삭제</button>
                        </li>`;
            }
        })
        .join('');
}
