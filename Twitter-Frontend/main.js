const tweet = document.querySelector('#tweet');
const p = document.querySelector('p');

const limit = tweet.getAttribute('maxlength');

tweet.addEventListener('input', function() {

    p.innerHTML = `${tweet.value.length}`;

    let blackText // 0-114 characters
    let yellowText // 115 - 140 characters
    let redText // 140-1000 characters - requires unlocking limit function or something similar

    if (tweet.value.length > 114) {
        redText = document.getElementById("p1").style.color = "red";
    } else if (tweet.value.length < 115) {
        redText = document.getElementById("p1").style.color = "black";
    }
});