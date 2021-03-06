import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('bands', function () {
    //this.route('band', { path: ':slug' }, function () {
    this.route('band', { path: ':id' }, function () {
      this.route('songs');
      this.route('albums');
      this.route('details');
    });
  });

  this.route('songs');
});

export default Router;
