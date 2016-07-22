import angular from 'angular';
import ContactList from './ui/contact-list';
import Contact from './ui/components/contact';
import ListService from './domain/list-service';
import './assets/style.sass';

// bootstrap the app, and our components
angular.module('app', [])
    .service('listService', ListService)
    .component('contactList', ContactList)
    .component('contact', Contact)
