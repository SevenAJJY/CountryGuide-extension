let suggestions = [
    "Morocco",
    "India",
    "spain",
    "Germany",
    "Argentine",
    "Australia",
    "France",
    "Italie"
];

// getting All required Elements

const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector(".search-input input");
const suggBox = document.querySelector(".autocom-box");

// if user press any key and release
inputBox.addEventListener('keyup', (e) => {
    let userData = e.target.value;
    let emptyArray = [];

    if (userData) {
        emptyArray = suggestions.filter((data) => {
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add('active');
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll('li');
        allList.forEach((li) => {
            li.addEventListener('click', (e) => {
                selectUserData = e.target.textContent;
                inputBox.value = selectUserData;
                searchWrapper.classList.remove('active');
            })
        })
    } else {
        searchWrapper.classList.remove('active');
    }
});

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join("");
    }

    suggBox.innerHTML = listData;
}