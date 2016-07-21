import Fetcher from '../domain/fetcher';

// storing templates in simple functions allows for easy versioning and a/b testing
const contactListTemplate = () => {
    return `<div>lol</div>`
}

class ContactListFetcher extends Fetcher {
    constructor(http, q, listService) {
        super(http, q);
        this.listService = listService;
    }

    getContactList() {
        const config = {
            route: 'public/contacts',
            method: 'GET'
        }

        this.fetch(config, result => {
            listService.handle(result);
        });
    }
}

// let controllers get the deps they need to bootstrap necessary services
class ContactList {
    constructor($http, $q) {
        this.fetcher = new ContactListFetcher($http, $q)

        console.log(this.fetcher);
    }
}

ContactList.$inject = ['$http', '$q']

const config = {
    template: contactListTemplate(),
    controller: ContactList
}

export default config;
