// getting All required Elements

const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector(".search-input input");
const suggBox = document.querySelector(".autocom-box");

let suggestions = [];


// get all countries names and store him in  suggestions

async function getAllCountriesNames() {
    try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        countries = await response.json();
        countries.forEach(country => {
            suggestions.push(country.name.common);
        });
        suggestions = suggestions.sort();
    } catch (error) {
        console.log(error);
    }
}

console.log(suggestions);

getAllCountriesNames();

// if user press any key and release
inputBox.addEventListener('keyup', (e) => {
    let userData = e.target.value;
    let emptyArray = [];

    if (userData) {
        emptyArray = suggestions.filter((data) => {
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });
        console.log(emptyArray);
        emptyArray = emptyArray.map((data) => {
            data.split("").forEach((span) => {
                console.log(span);
            })
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