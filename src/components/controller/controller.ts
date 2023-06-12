import AppLoader from './appLoader';

export type Source = {
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
    category: string;
};
export type SourceData = {
    status: string;
    sources: Source[];
};
export type ArticleItem = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Pick<Source, 'id' | 'name'>;
    title: string;
    url: string;
    urlToImage: string;
};
export type Article = {
    articles: ArticleItem[];
    status: string;
    totalResults: number;
};

class AppController extends AppLoader {
    getSources(callback: (data: SourceData) => void) {
        super.getResp<SourceData>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: Article) => void) {

        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId =  (e.target as HTMLElement)?.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<Article>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;