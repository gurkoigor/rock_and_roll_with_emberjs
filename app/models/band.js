import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  language: DS.attr('string'),
  description: DS.attr(),
  songs: DS.hasMany('song'),
  slug: Ember.computed('name', function () {
    return this.get('name').dasherize();
  }),
  site: Ember.computed('slug', 'language', function () {
    console.log('Recomputing site');
    return 'http://bands.com/' + this.get('slug') + '.' + this.get('language');
  }),

  setupSongs: Ember.on('init', function () {
    if (!this.get('songs')) {
      this.set('songs', []);
    }
  })
});
