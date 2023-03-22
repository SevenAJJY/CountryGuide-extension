// getting All required Elements

const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector(".search-input input");
const suggBox = document.querySelector(".autocom-box");
const searchBtn = document.querySelector('.icon');
const resultBox = document.querySelector('.result');
const listInfo = resultBox.querySelector('.list-info');

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

getAllCountriesNames();


// if user click on search button
searchBtn.addEventListener('click', getInfo);

async function getInfo() {
    let countryName = inputBox.value;
    try {
        let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        let countryInfo = await response.json();
        showInfo(countryInfo);
    } catch (er) {
        console.log(er);
    }
}

function showInfo(country) {
    let info = `
        <img src="${country[0].flags.svg}" class="flag-img" />
        <h2>${country[0].name.common}</h2>
        <ul class="list-info">
            <li>
                <i class="fa-solid fa-flag"></i>
                <span>Native Name:</span>
                <span>${country[0].name.common}</span>
            </li>
            <li>
                <i class="fa-solid fa-landmark-flag"></i>
                <span>Capital:</span>
                <span>${country[0].capital[0]}</span>
            </li>
            <li>
                <i class="fa-solid fa-people-group"></i>
                <span>Population:</span>
                <span>${country[0].population}</span>
            </li>
            <li>
                <i class="fa-solid fa-globe"></i>
                <span>Region:</span>
                <span>${country[0].region}</span>
            </li>
            <li>
                <i class="fa-solid fa-earth-africa"></i>
                <span>Sub-region:</span>
                <span>${country[0].subregion}</span>
            </li>
            <li>
                <i class="fa-solid fa-language"></i>
                <span>Languages:</span>
                <span>${Object.values(country[0].languages)
                    .toString()
                    .split(',')
                    .join(', ')}</span>
            </li>
            <li>
                <i class="fa-solid fa-coins"></i>
                <span>Currencies:</span>
                <span>${country[0].currencies[Object.keys(country[0].currencies)].name} - ${Object.keys(country[0].currencies)[0]}</span>
            </li>
    </ul>
    `;

    resultBox.innerHTML = info;
}

// if user press any key and release
inputBox.addEventListener('keyup', (e) => {
    let userData = e.target.value;
    let emptyArray = [];

    if (userData) {
        emptyArray = suggestions.filter((data) => {
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });

        emptyArray = emptyArray.map((i) => {
            data = `<strong style="color:var(--main-color)">${i.substr(0, userData.length)}</strong>`;
            data += i.substr(userData.length);
            return data
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