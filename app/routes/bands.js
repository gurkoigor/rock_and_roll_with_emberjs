import Ember from 'ember';
//import Band from '../models/band';
//import Song from '../models/song';

//var blackDog = Song.create({
//  title: 'BlackDog',
//  band: 'Led Zeppelin',
//  rating: 3
//});
//
//var yellowLedbetter = Song.create({
//  title: 'Yellow Ledbetter',
//  band: 'Pearl Jam',
//  rating: 4
//});
//
//var daughter = Song.create({
//  title: 'Daughter',
//  band: 'Pearl Jam',
//  rating: 5
//});
//
//var pretender = Song.create({
//  title: 'The Pretender',
//  band: 'Foo Fighters',
//  rating: 2
//});
//
//var BandsCollection = Ember.Object.extend({
//  content: [],
//  sortProperties: ['name:desc'],
//  sortedContent: Ember.computed.sort('content', 'sortProperties')
//});
//
//var letZeppelin = Band.create({ name: "Led Zeppelin", songs: [blackDog] });
//var pearlJam = Band.create({ name: "Pearl Jam",
//  description: 'Pearl Jam is an American rock band, formed in Seattle, Washington in 1990',
//  songs: [daughter, yellowLedbetter] });
//var fooFighters = Band.create({ name: "Foo Fighters", songs: [pretender] });
//var noSongs = Band.create({ name: "No Songs" });
//
//var bands = BandsCollection.create();
//bands.get('content').pushObjects([letZeppelin, pearlJam, fooFighters, noSongs]);

export default Ember.Route.extend({
  model: function () {
    return this.store.findAll('band');
  },
  actions: {
    createBand: function () {
      var route = this;
      var controller = this.get('controller');

      //var band = Band.create({ name: name});
      var band = this.store.createRecord('band', controller.getProperties('name'));
      band.save().then(function () {
        controller.set('name', '');
        route.transitionTo('bands.band.songs', band)
      });

      //bands.get('content').pushObject(band);

      //this.get('controller').set('name', '');

      //this.transitionTo('bands.band.songs', band);
    },
    didTransition: function () {
      document.title = 'Bands - Rock & Roll';
    }
  }
});
