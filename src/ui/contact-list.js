import Fetcher from '../domain/fetcher';

const mock = [
    {
        name: 'something',
        id: 1,
        company_name: 'some company',
        phone: '1231231234'
    },{
        name: 'something',
        id: 2,
        company_name: 'some company',
        phone: '1231231234'
    }
]

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
        this.items = mock
    }
}

ContactList.$inject = ['$http', '$q']

const config = {
    template: contactListTemplate(),
    controller: ContactList
}



export default config;
