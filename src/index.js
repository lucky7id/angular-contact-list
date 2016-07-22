import angular from 'angular';
import ContactList from './ui/contact-list';
import Contact from './ui/components/contact.js';
angular.module('app', [])
    .component('contactList', ContactList)
    .component('contact', Contact)
