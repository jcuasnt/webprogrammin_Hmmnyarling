// 가상의 백엔드에서 받아온 데이터 (예시)
const data = []; // 즐겨찾기 없음 테스트


// 난이도에 따라 별점 이미지를 반환하는 함수
function generateStarImage(difficulty) {
    return `<img src="../../asset/star/${difficulty}star.png" alt="${difficulty} stars" class="star-image">`;
}

// 좋아요 상태에 따라 하트 이미지를 반환하는 함수
function generateHeartImage(isLiked) {
    const heartPath = isLiked ? "../../asset/full_heart_resized.png" : "../../asset/null_heart_resized.png";
    return `<img src="${heartPath}" alt="${isLiked ? '좋아요' : '좋아요 안 함'}" class="heart_image">`;
}

// 카드 생성 함수
function createCard(cardData) {
    return `
        <div class="card">
            <div class="card-image">
                <img src="${cardData.image}" alt="${cardData.name}" />
            </div>
            <div class="card-content">
                <h3>${cardData.name}</h3>
                <p>${cardData.players}</p>
                <p>${cardData.time}</p>
                <div class="stars">
                    ${generateStarImage(cardData.difficulty)}
                </div>
                <div class="tags">
                    ${cardData.genres.map(genre => `<span class="tag">${genre}</span>`).join("")}
                </div>
            </div>
            <div class="card-like">
                ${generateHeartImage(cardData.liked)}
            </div>
        </div>
    `;
}


// 데이터를 기반으로 카드 추가
function loadCards(data) {
    const cardContainer = document.getElementById("cardContainer");

    if (data.length === 0) {
        cardContainer.innerHTML = `
            <div class="empty-message" style="text-align: center;">
                <br>
                아직 즐겨찾기로 설정된 보드게임이 없어요<br />
                자주 하는 게임을 즐겨찾기에 추가해 보세요!
            </div>
        `;
        return;
    }

    const cardsHTML = data.map(cardData => createCard(cardData)).join("");
    cardContainer.innerHTML = cardsHTML;
}

// 페이지 로드 시 실행
window.onload = function () {
    loadCards(data);
};
