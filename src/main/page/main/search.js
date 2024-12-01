// 검색 및 필터링 함수
function filterData(data, searchText, filters) {
    return data.filter(item => {
        // 검색어 필터링 (게임 이름에 포함 여부 확인)
        const matchesSearch = searchText === '' || item.name.includes(searchText);

        // 필터 조건 확인
        const matchesPeople = !filters.numPeople || item.players.includes(filters.numPeople);
        const matchesDifficulty = !filters.difficulty || item.difficulty === Number(filters.difficulty);
        const matchesGenres = !filters.genres.length || filters.genres.every(genre => item.genres.includes(genre));
        const matchesTime = !filters.gameTime || item.time === filters.gameTime;

        // 모든 조건을 만족하는 경우만 반환
        return matchesSearch && matchesPeople && matchesDifficulty && matchesGenres && matchesTime;
    });
}

// UI에서 필터 조건 가져오기
function getFilters() {
    const numPeople = document.querySelector('#num-people').value;
    const difficulty = document.querySelector('.difficulty img.selected')?.dataset.value || '';
    const gameTime = document.querySelector('.game-time button.selected')?.textContent || '';
    const genres = Array.from(document.querySelectorAll('.genres button.selected')).map(btn => btn.textContent);

    return { numPeople, difficulty, gameTime, genres };
}

// 검색 결과 업데이트
function updateResults() {
    const searchText = document.querySelector('#search-text input').value.trim();
    const filters = getFilters();

    // 필터링된 데이터
    const filteredData = filterData(data, searchText, filters);

    // 결과 카드 다시 로드
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // 기존 카드 제거
    filteredData.forEach(cardData => {
        cardContainer.innerHTML += createCard(cardData);
    });
}

// 이벤트 핸들러 등록
document.querySelector('#search-text input').addEventListener('input', updateResults); // 검색어 입력 시
document.querySelectorAll('.filter, .game-time button, .genres button, .difficulty img').forEach(element => {
    element.addEventListener('click', updateResults); // 필터 조건 변경 시
});
document.querySelector('#num-people').addEventListener('change', updateResults); // 인원 수 입력 시
