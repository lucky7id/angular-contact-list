import Fetcher from '../domain/fetcher';

// storing templates in simple functions allows for easy versioning and a/b testing
const contactListTemplate = () => {
    return `<div class="row" ng-repeat="item in $ctrl.items"><contact data="item"></contact></div>`
}

//extend the fetcher with view specifc routes, that way everything for this view is contained
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
        this.items = [1,2,3,4,5,6]
        console.log(this.fetcher);
    }
}

ContactList.$inject = ['$http', '$q']

const config = {
    template: contactListTemplate(),
    controller: ContactList
}

// once I have the contact component
// const innerComponentConfig = {
//     template: `<span>{{data}}</span>`,
//     bindings: {
//         data: '='
//     }
// }

export default config;
