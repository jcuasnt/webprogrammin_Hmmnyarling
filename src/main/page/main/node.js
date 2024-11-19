// 가상의 백엔드에서 받아온 데이터 (예시)
const data = [
    {
        name: "아임 더 보스",
        players: "3~6명",
        time: "60m~",
        difficulty: 3, // 난이도 숫자
        genres: ["협상", "전략"],
        image: "placeholder.png", // 이미지 경로
        liked: true // 좋아요 여부
    },
    {
        name: "다른 게임",
        players: "2~4명",
        time: "30m~",
        difficulty: 4,
        genres: ["추리", "협력"],
        image: "placeholder.png",
        liked: false
    }
];

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
    data.forEach(cardData => {
        cardContainer.innerHTML += createCard(cardData);
    });
}

// 페이지 로드 시 실행
window.onload = function () {
    loadCards(data);
};
