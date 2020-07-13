const apiKey = '9DvIuvyE8561mkM4bQWmEuSVqh5EYPZX';


function fetchArticles(cityName) {
  fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${cityName}&api-key=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayArticles(data);
    })
    .catch(() => reportAboutError());
}


function enterCityName() {
  let cityName = this.event.target.previousElementSibling.firstElementChild.innerHTML;
  cityName = deleteMark(cityName, searchInput.value);

  searchInput.value = cityName.toUpperCase();
  suggestionsList.innerHTML = '';

  fetchArticles(cityName);
}


function deleteMark(str, value) {
  str = str.toLowerCase();
  value = value.toLowerCase();

  return str.split(`<mark>${value}</mark>`).join(value);
}


function displayArticles(data) {
  let articles = data.response.docs;

  articlesList.innerHTML = articles.map(article => {
    return `
        <li>
            <article>
              <h2 class="article-headline">${article.headline.main}</h2>
              <p class="article-abstract">${article.abstract}</p>
              <a href="${article.web_url}" class="article-link" target="_blank" rel="noopener">Read article</a>
            </article>
        </li>
    `
  }).join('');
}