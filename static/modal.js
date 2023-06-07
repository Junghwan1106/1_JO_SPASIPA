// 모달 열기
function openModal(e) {
    const url = e.id;
    const queryString = new URL(url).search;
    const params = new URLSearchParams(queryString);

    // 쿼리 파라미터의 값 가져오기
    const queryValue = params.get("v");
    
    document.getElementById("myIframe").src=`https://www.youtube.com/embed/${queryValue}`;
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// 모달 닫기
function closeModal(e) {
    let modal = document.getElementById("myModal");
    document.getElementById("myIframe").src = document.getElementById("myIframe").src + "?enablejsapi=1&version=3&playerapiid=ytplayer";
    modal.style.display = "none";
}

// 사용자가 모달 외부를 클릭하면 모달이 닫히도록 설정
window.onclick = function (event) {
    let modal = document.getElementById("myModal");
    if (event.target == modal) {
        document.getElementById("myIframe").src = document.getElementById("myIframe").src + "?enablejsapi=1&version=3&playerapiid=ytplayer";
        modal.style.display = "none";
    }
}