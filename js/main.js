const info = document.getElementById('info');
const submit = document.getElementById('submit');
const search = document.getElementById('search');

const API_KEY = '5d4550f6155d44829cdc0a654eddaa0a';


const getNews = async (value) => {
    const API_URL = `https://newsapi.org/v2/everything?q=${value}&apiKey=${API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    // console.log(data);
    return data;
}

class News {
    constructor(data) {
        this.data = data;
        this.render();
    }

    render(){
        info.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('row','justify-content-center','mt-5','gap-5');
        this.data.articles.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card','col-4');
            card.style.width = '18rem';
            card.innerHTML = `
            <img class="img-fluid p-2" src="${item.urlToImage}" alt="...">
            <div class="card-body py-1">
                <div class="card-header bg-white text-end ">
                    <h4 class="card-title">${item.title}</h4>
                </div>
                <div class="card-main">
                    <div class="card-text border-bottom text-end">
                        <p>
                            ${item.description}
                        </p>
                    </div>
                </div>
                <div class="card-footer bg-white d-flex justify-content-end">
                    <div class="text-end bg-primary text-white date">
                        <h6 class="mt-2 mx-2 text-date">${item.publishedAt} :تاریخ انتشار</h6>
                    </div>
                </div>
            </div>
            `;
            div.appendChild(card);
        });

        info.appendChild(div);
        
    }

}



submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const value = search.value;
    if(value === ''){
        alert('لطفا متن را وارد کنید');
        return;
    }
    else{
        const data = await getNews(value);
        new News(data);
        console.log(data);
    }
});