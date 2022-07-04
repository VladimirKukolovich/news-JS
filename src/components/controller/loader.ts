interface IgetResp {
    endpoint: string;
    options?: { sources?: string };
}
class Loader {
    baseLink: string;
    options: { apiKey: string };
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: IgetResp,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: { apiKey: string }, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        const keys = Object.keys(urlOptions) as Array<keyof { apiKey: string }>;
        keys.forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: (x: T) => void, options = {}) {
        fetch(this.makeUrl(options as never, endpoint), { method })
            .then(this.errorHandler)
            .then((res:Response) => res.json())
            .then(callback)
            .catch((err) => console.error(err));
    }
}

export default Loader;
