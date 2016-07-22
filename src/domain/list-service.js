// Store the results of the API in a service so it's available to any
// views that need it
export default class ListService {
    constructor() {
        this.items = [];
    }

    // add an interface so the calling service does not need to know
    // how data is stored in this service
    handle(data) {
        this.items = data;
    }
}
