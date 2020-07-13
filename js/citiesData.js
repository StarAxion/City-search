const searchInput = document.querySelector('.search');
const clearButton = document.querySelector('.clear-button');
const errorMessage = document.querySelector('.error-message');
const suggestionsList = document.querySelector('.suggestions');
const articlesList = document.querySelector('.articles');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];


fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data))
    .catch(() => reportAboutError());


function reportAboutError() {
    clearData();
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Oops! Something went wrong.';
}


function findMatches(cities, wordToMatch) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}


function displayData() {
    const result = findMatches(cities, this.value);
    articlesList.innerHTML = '';

    suggestionsList.innerHTML = result.map(place => {
        return `
            <li>
                <p>
                    <span id="city-name">${markValue(place.city, this.value)}</span>, ${markValue(place.state, this.value)}
                </p>
                <button type="button" class="search-form__button articles-button" onclick="enterCityName()" title="Search articles">A</button>
            </li>
        `
    }).join('');

    this.style.paddingRight = '40px';
    clearButton.style.display = 'block';

    if (this.value === '') clearData();
}

searchInput.addEventListener('keyup', displayData);


function markValue(str, value) {
    str = str.toLowerCase();
    value = value.toLowerCase();

    return str.split(value).join(`<mark>${value}</mark>`);
}


function clearData() {
    searchInput.value = '';
    searchInput.style.paddingRight = '20px';
    clearButton.style.display = 'none';
    suggestionsList.innerHTML = '';
    articlesList.innerHTML = '';
}

clearButton.addEventListener('click', clearData);