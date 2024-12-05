// Header.js
function loadHeader() {
    // 로그인 상태 확인 (예: localStorage를 사용해 로그인 여부 확인)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // 헤더가 들어갈 DOM 요소를 가져오기
    const headerContainer = document.getElementById("header");

    // 로그인 여부에 따라 다른 헤더를 로드
    if (isLoggedIn) {
        // 로그인 상태
        fetch('/src/main/omponent/Header_login.html')
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading Header_login.html:", error));
    } else {
        // 비로그인 상태
        fetch('/src/main/component/Header_guest.html')
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading Header_guest.html:", error));
    }
}

// 페이지 로드 시 헤더를 동적으로 로드
document.addEventListener("DOMContentLoaded", loadHeader);
