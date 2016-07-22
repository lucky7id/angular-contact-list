//abstract the angular http service so it can esily be swapped for window.fetch or any other http lib
class Fetcher {
    constructor(http, q) {
        // deps are listed without the '$' to indicate they are not passed via
        // Angular's DI
        this.http = http;
        this.q = q;
    }

    fetch(config, success, fail) {
        // we do actually need to know how to handle a success call
        if (!success || typeof success !== 'function') {
            throw new Error('Fetcher.fetch requires a success callback function');
        }

        return this.http(config).then(success, fail || this.fail);
    }

    //default fail handler if the calling view doesn't supply one
    fail(err) {
        console.log(err);
    }
}

export default Fetcher;
