// Store the results of the API in a service so it's available to any
// views that need it
export default class ListService {
    constructor() {
        console.log(arguments)
        this.items = [];
    }

    handle(data) {
        this.items = data;
    }
}
