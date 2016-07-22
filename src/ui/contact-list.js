import Fetcher from '../domain/fetcher';

// storing templates in simple functions allows for easy versioning and a/b testing
const contactListTemplate = () => {
    return `
        <div class="row">
            <div ng-repeat="item in $ctrl.items">
                <div class= "col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <contact data="item"></contact>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

//extend the fetcher with view specifc routes, that way everything for this view is contained
class ContactListFetcher extends Fetcher {
    constructor(http, q, listService) {
        super(http, q);
        this.listService = listService;
    }

    getContactList() {
        const config = {
            url: 'https://candidate-test.herokuapp.com/contacts',
            method: 'GET'
        }

        return this.fetch(config, result => {
            this.listService.handle(result.data);

            return result.data;
        });
    }
}

// let controllers get the deps they need to bootstrap necessary services
class ContactList {
    constructor($http, $q, listService) {
        this.fetcher = new ContactListFetcher($http, $q, listService);
        this.list = listService;
        this.items = [];
        this.boot();
    }

    boot() {
        this.fetcher.getContactList().then(data => {
            this.items = data
        })
    }
}

ContactList.$inject = ['$http', '$q', 'listService']

const config = {
    template: contactListTemplate(),
    controller: ContactList
}



export default config;
