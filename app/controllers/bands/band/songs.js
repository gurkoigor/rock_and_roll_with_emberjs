import Ember from 'ember';
import {capitalize} from '../../../helpers/capitalize';
import {capitalize as capitalizeWord} from '../../../helpers/capitalize';

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's'
  },
  sortBy: 'ratingDesc',
  sortProperties: Ember.computed('sortBy', function () {
    var options = {
      "ratingDesc": "rating:desc, title:asc",
      "ratingAsc": "rating:asc, title:asc",
      "titleDesc": "title:desc",
      "titleAsc": "title:asc"
    };

    return options[this.get('sortBy')].split(',');
  }),

  searchTerm: '',

  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function () {
    var searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model.songs').filter(function (song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

  noSongs: Ember.computed('model.songs.length', function () {
    return Ember.isEmpty(this.get('model.songs'));
  }),

  songCreationStarted: false,

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function () {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  newSongPlaceholder: Ember.computed('model.name', function () {
    var bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
  }),

  actions: {
    updateRating: function (params) {
      var song = params.item;
      var rating = params.rating;

      if (song.get('rating') === rating) {
        rating = 0;
      }
      song.set('rating', rating);
      song.save();
    },
    enableSongCreation: function () {
      this.set('songCreationStarted', true);
    },
    didTransition: function () {
      var band = this.modelFor('bands.band');
      var name = capitalizeWord(band.get('name'));
      document.title = `${name} songs - Rock & Roll`;
    }
  }
});
