const API_KEY = "d36a45f065a04d9f820bbe3d07401c71";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);

}

function bindData(articles){
   const cardsContainer = document.getElementById("cards-container");
   const newsCardTemplate = document.getElementById("template-news-card");



   cardsContainer.innerHTML = "";


   articles.forEach(articles => {
    if(!articles.urlToImage) return ;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, articles);
    cardsContainer.appendChild(cardClone);
   });

}


function fillDataInCard(cardClone, articles){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");


    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;
    
    const date = new Date(articles.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `$(articles.source.name) . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(articles.url, "_blank");
    });
}

let curSelectedNv = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNv?.classList.remove('active');
    curSelectedNv = navItem;
    curSelectedNv.classList.add('active');
    
}