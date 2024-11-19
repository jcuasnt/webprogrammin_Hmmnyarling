const filtersContainer = document.querySelector('.selected-filters');

function addToSelectedFilters(name, value, button) {
    if (findFilter(name, value)) return;
    filtersContainer.appendChild(createFilterButton(name, value, button));
}

function removeSelectedFilter(name, value) {
    const filterButton = findFilter(name, value);
    if (filterButton) filtersContainer.removeChild(filterButton);
}

function createFilterButton(name, value, button) {
    const filterButton = document.createElement('button');
    filterButton.textContent = `${name}: ${value}`;
    filterButton.className = 'filter-item';
    filterButton.dataset.name = name;
    filterButton.dataset.value = value;

    filterButton.addEventListener('click', () => {
        filtersContainer.removeChild(filterButton);
        resetButtonState(name, value, button);
    });

    return filterButton;
}

function findFilter(name, value) {
    return Array.from(filtersContainer.children).find(
        child => child.dataset.name === name && child.dataset.value === value
    );
}

function resetButtonState(name, value, button) {
    if (name === '난이도') {
        document.querySelectorAll('.difficulty img').forEach(star => {
            star.classList.remove('selected');
            star.src = `../asset/star/${star.dataset.value}star.png`;
        });
    } else if (['게임 시간', '장르'].includes(name)) {
        button?.classList.remove('selected');
    } else if (name === '인원 수') {
        document.querySelector('#num-people').value = '';
    }
}

function addToggleEvent(selector, name, valueAccessor) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('click', () => {
            const value = valueAccessor(element);
            element.classList.toggle('selected');
            if (element.classList.contains('selected')) {
                addToSelectedFilters(name, value, element);
            } else {
                removeSelectedFilter(name, value);
            }
        });
    });
}

document.getElementById('clear-filters').addEventListener('click', () => {
    Array.from(filtersContainer.children).forEach(child => {
        if (!child.id || child.id !== 'clear-filters') {
            filtersContainer.removeChild(child);
        }
    });

    document.querySelectorAll('.selected').forEach(element => element.classList.remove('selected'));

    document.querySelectorAll('.difficulty img').forEach(star => {
        star.src = `../asset/star/${star.dataset.value}star.png`;
    });

    document.querySelector('#num-people').value = '';
});


addToggleEvent('.difficulty img', '난이도', img => img.dataset.value);
addToggleEvent('.game-time button', '게임 시간', button => button.textContent);
addToggleEvent('.genres button', '장르', button => button.textContent);

document.querySelector('#num-people').addEventListener('change', event => {
    const value = event.target.value;
    value ? addToSelectedFilters('인원 수', value, event.target) : removeSelectedFilter('인원 수', value);
});

// toggleButton과 filters 요소 가져오기
const toggleButton = document.getElementById('toggleButton');
const filters = document.querySelector('.filters');

// 버튼 클릭 시 필터 숨기기/보이기
toggleButton.addEventListener('click', () => {
    filters.classList.toggle('hidden'); // 'hidden' 클래스를 추가/제거
    toggleButton.querySelector('img').src = filters.classList.contains('hidden')
        ? '../asset/down.png' // 아래로 향하는 아이콘
        : '../asset/up.png';  // 위로 향하는 아이콘
});


