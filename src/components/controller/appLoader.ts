import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '45b992c1dd7046e0bd8277d02846bc29', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
