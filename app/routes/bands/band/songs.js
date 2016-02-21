import Ember from 'ember';
import Song from '../../../models/song';
import wait from '../../../utils/wait';

export default Ember.Route.extend({
  model: function () {
    //return wait(this.modelFor('bands.band'), 500);
    return this.modelFor('bands.band');
  },

  actions: {
    createSong: function () {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');
      var title = controller.get('title');
      //var song = Song.create({ title: title, band: band });

      var song = this.store.createRecord('song', {
        title: title,
        band: band
      });

      song.save().then(function () {
        controller.set('title', '');
      });

      //band.get('songs').pushObject(song);

    },
    didTransition: function () {
      var band = this.modelFor('bands.band');
      document.title = `${band.get('name')} songs - Rock & Roll`;
    }
  }
});
