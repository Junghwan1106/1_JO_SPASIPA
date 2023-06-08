document.getElementById("form-box").addEventListener("submit", function (event) {
    const state = document.getElementById("state");
    event.preventDefault();
    if (state.getAttribute('state') == 0){
        alert("중복 확인을 먼저 실행해주세요");
        return;
    }
    console.log("@@@ submit");
    const userName = document.getElementById("user-name").value;
    const userPwd = document.getElementById("user-pwd").value;
    register(userName, userPwd);
});

document.getElementById("check_id_btn").addEventListener("click", function (event) {
    const name = document.getElementById("user-name").value;
    const state = document.getElementById("state");
    if (!name) return;
    $.ajax({
        type: "POST",
        url: "/api/register/usercheck",
        data: { id_give: name },
        success: function (response) {
            if (response['result'] == '0') {
                state.innerText = "사용 가능한 아이디입니다!";
                state.setAttribute('state', 1)
            } else {
                state.innerText = "다른 아이디를 사용해주세요!";
            }
        }
    })
});

function register(name, pwd) {
    $.ajax({
        type: "POST",
        url: "/api/register",
        data: { id_give: name, pw_give: pwd },
        success: function (response) {
            if (response['result'] == 'success') {
                alert('회원가입 완료! 로그인 해주세요^~^')
                window.location.href = '/login'
            } else {
                alert(response['msg'])
            }
        }
    })
}