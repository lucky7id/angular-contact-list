//abstract the angular http service so it can esily be swapped for window.fetch or any other http lib
class Fetcher {
    constructor(q, http) {
        // deps are listed without the '$' to indicate they are passed outside of angular context
        this.http = http;
        this.q = q;
    }

    fetch(config, success, fail) {
        // wrap the http call in q so
        if (!success || typeof success !== 'function') throw new Error('Fetcher.fetch requires a success callback function');

        return http(config).then(success, fail || this.fail);
    }

    //default fail handler if the calling view doesn't supply one
    fail(err) {
        console.log(err);
    }
}

export default Fetcher;
