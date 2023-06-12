import { ArticleItem } from '../../controller/controller';
import './news.css';

class News {
    draw(data: ArticleItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLMetaElement;

        news.forEach((item, idx) => {
            const newsClone = (newsItemTemp.content as unknown as HTMLElement).cloneNode(true) as HTMLElement;
            if (newsClone !== null) {
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem ) {
                   if(idx % 2) newsItem.classList.add('alt');
                }
                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo')  as HTMLMetaElement;
                if (newsMetaPhoto) {
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }
                const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                if (newsMetaAuthor) {
                    newsMetaAuthor.textContent = item.author || item.source.name;
                }
                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate) {
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }
                const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
                if (newsDescriptionTitle) {
                    newsDescriptionTitle.textContent = item.title;
                }
                const newsDescriptionSourse = newsClone.querySelector('.news__description-source');
                if (newsDescriptionSourse) {
                    newsDescriptionSourse.textContent = item.source.name;
                }
                const newsDescriptionContent = newsClone.querySelector('.news__description-content');
                if (newsDescriptionContent) {
                    newsDescriptionContent.textContent = item.description;
                }
                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if (newsReadMore) {
                    newsReadMore.setAttribute('href', item.url);
                }
            }
            fragment.append(newsClone);
        });
        const newsElem = document.querySelector('.news');
        if (newsElem) {
            newsElem.innerHTML = '';
            newsElem.appendChild(fragment);
        }
    }
}

export default News;
