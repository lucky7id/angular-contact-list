import Fetcher from '../domain/fetcher';

// storing templates in simple functions allows for easy versioning and a/b testing
const contactListTemplate = () => {
    return `
        <div class="row">
            <div class="hero-search col-md-12">
                <input type="text" ng-model="$ctrl.search" class="form-control" placeholder="filter contacts...">
            </div>
        </div>
        <div class="row contact-list">
            <div ng-repeat="item in $ctrl.items | filter:$ctrl.search">
                <div class="col-md-3">
                    <div class="panel panel-default contact">
                        <div class="panel-body" style="background: url({{item.profile_image}}) 0% 0% / cover;">
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
