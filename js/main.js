/**
 * Guide Country Extension
 * @author  yassine El hajjy (SevenAJJY) <yassine.elhajjy@gmail.com>
 * 
 * @see https://github.com/SevenAJJY
 */

// getting All required Elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector(".search-input input");
const suggBox = document.querySelector(".autocom-box");
const searchBtn = document.querySelector('.icon');
const resultBox = document.querySelector('.result');
const listInfo = resultBox.querySelector('.list-info');
const darkLightMode = document.querySelector('.dark-mode i');
const loader = document.querySelector('.loader');

/**
 * We will fetch all country names and store them in this empty array
 * @var array
 */
let suggestions = [];


/**
 * get all countries names and store him in  suggestions
 * @returns void
 */
async function getAllCountriesNames() {
    try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        countries = await response.json();
        countries.forEach(country => {
            suggestions.push(country.name.common);
        });
        // sorting countries a-z
        suggestions = suggestions.sort();
    } catch (error) {
        console.log(error);
    }
}

getAllCountriesNames();


// if user click on search button
searchBtn.addEventListener('click', getInfo);

function getInfo() {

    resultBox.innerHTML = "";
    searchWrapper.classList.remove('active');
    /**
     * show error if the user doesn't entered country name
     */
    if (inputBox.value.length != 0) {
        loader.classList.toggle('active');
        setTimeout(async() => {
            // validate country name entered by the user
            if (validateCountryName()) {
                loader.classList.toggle('active');
                let countryName = NameMatching();
                try {
                    let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
                    let countryInfo = await response.json();
                    showInfo(countryInfo);
                } catch (er) {
                    // throw Error('Sorry! no data for this country' + er);
                    resultBox.innerHTML = `<span class="error">Sorry! no data for this country</span>`;
                }
            } else {
                resultBox.innerHTML = `<span class="error">Please Entre a Valid Country Name!</span>`;
                loader.classList.toggle('active');
            }
        }, 2000);
    } else {
        resultBox.innerHTML = `<span class="error">The Input Field Cannot Be Empty!</span>`;
    }
}

/**
 * validate country name entered by the user
 * @returns {boolean}
 */
function validateCountryName() {
    // let res = suggestions.find((e) => e == inputBox.value);
    return suggestions.includes(NameMatching());

}

/**
 * Converts the first letter of the country name in the input string to uppercase. To match the names of countries during the search
 * @returns {string}
 */
function NameMatching() {
    let countryName = inputBox.value.charAt(0).toUpperCase() + inputBox.value.slice(1);
    return countryName;
}


/**
 * Show information in the Box Result
 * @param {object} country 
 * @returns {void}
 */
function showInfo(country) {
    let info = `
        <header>
            <p>Informations</p>
            <span class="clear-all" onclick="clearResult()">Clear</span>
        </header>

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
                <span>${
                    Object.values(country[0].languages)
                    .toString()
                    .split(',')
                    .join(', ')}</span>
            </li>
            
            <li>
                <i class="fa-solid fa-coins"></i>
                <span>Currencies:</span>
                <span>
                ${country[0].currencies[Object.keys(country[0].currencies)].name} - 
                ${Object.keys(country[0].currencies)[0]}</span>
            </li>
    </ul>
    `;

    resultBox.innerHTML = info;

}

/**
 * clear Box Result
 * @returns {boolean}
 */
function clearResult() {

    resultBox.innerHTML = "";
    inputBox.value = "";
    return true;
}


/**
 * if user press any key and release
 */
inputBox.addEventListener('keyup', (e) => {

    /**
     * User data
     */
    let userData = e.target.value;

    /**
     * An empty array in which we will store the countries names that match what the user entered
     */
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
                searchBtn.click();
            })
        })
    } else {
        searchWrapper.classList.remove('active');
    }

});


/**
 * show Suggestions (autocomplete)
 * @param {*} list 
 * @returns {void}
 */
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

/**
 * dark mode
 * @param {*} e 
 * @returns {void}
 */
const themeLightDark = (e) => {

    const themeDark = () => {
        if (localStorage.getItem('t_dark') !== 'false') {
            document.body.classList.add('t-dark');
        } else {
            document.body.classList.remove('t-dark');
        }
    }


    if (e.currentTarget.classList.contains('fa-sun')) {

        e.currentTarget.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('t_dark', true);
        themeDark();

    } else {

        e.currentTarget.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('t_dark', false);
        themeDark();

    }


    if (localStorage.getItem('t_dark') !== null) {
        themeDark();
    }
};


if (localStorage.getItem('t_dark') == 'true') {

    darkLightMode.classList.replace('fa-sun', 'fa-moon');
    document.body.classList.add('t-dark');

}


darkLightMode.addEventListener('click', (e) => themeLightDark(e));