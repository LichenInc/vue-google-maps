/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

<template>
<div class="vue-map-container">
  <div class="vue-map"></div>
  <slot></slot>
</div>
</template>

<script>
import Q from 'q';
import _ from 'lodash';

import {loaded} from '../manager.js';
import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';
import getPropsMixin from '../utils/getPropsValuesMixin.js'

const props = {
  center: {
    required: true,
    twoWay: true,
    type: Object
  },
  zoom: {
    required: false,
    twoWay: true,
    type: Number
  },
  heading: {
    twoWay: true,
    type: Number
  },
  mapTypeId: {
    twoWay: true,
    type: String
  },
  bounds: {
    type: Object,
    twoWay: true,
  },
  options: {
    twoWay: false,
    type: Object,
    default () {return {}}
  }
};

const events = [
  'click',
  'dblclick',
  'rightclick',
  'mousemove',
  'mouseout',
  'mouseover',
  'drag',
  'dragend',
  'dragstart',
  'idle',
  'resize',
  'tilesloaded',
  'bounds_changed',
  'zoom_changed'
];

const callableMethods = [
  'panBy',
  'panTo',
  'panToBounds',
  'fitBounds'
];

const methods = {};

const registerChild = function (child, type) {
    this.mapCreated.then((map) => {
      this.$emit('ready', map);
      child.$emit('map-ready', map);
    }, (error) => {
      throw error;
    });
}

const eventListeners = {
  'register-marker': registerChild,
  'register-cluster': registerChild,
  'register-infoWindow': registerChild,
  'register-polyline': registerChild,
  'register-polygon': registerChild,
  'register-circle': registerChild,
  'register-rectangle': registerChild,
  'g-bounds_changed' () {
    this.bounds=this.mapObject.getBounds();
  },
  'g-fitBounds' (bounds) {
    if (this.mapObject && bounds) {
      this.mapObject.fitBounds
    }
  },
  'g-resize-map' () {
    var center = this.mapObject.getCenter();
    google.maps.event.trigger(this.mapObject, 'resize');
    this.mapObject.setCenter(center);
  }
}

_.each(callableMethods, function (methodName) {
   const applier= function() {
    if(this.mapObject) {
      this.mapObject[methodName].apply(this.mapObject, arguments);
    }
  }
  eventListeners['g-' + methodName] = applier;
  methods[methodName] = applier;
});

export default {
  mixins: [getPropsMixin],
  props: props,
  replace:false, // necessary for css styles
  created() {
    this.mapCreatedDefered = new Q.defer();
    this.mapCreated = this.mapCreatedDefered.promise;
  },
  ready () {
    loaded.then(() => {
      // getting the DOM element where to create the map
      const element = this.$el.getElementsByClassName('vue-map')[0];

      // creating the map
      const copiedData = _.clone(this.getPropsValues());
      delete copiedData.options;
      const options = _.clone(this.options);
      _.assign(options, copiedData);
      this.mapObject = new google.maps.Map(element, options);

      // we con't want to bind props because it's a kind of "computed" property
      const boundProps = _.clone(props);
      delete boundProps.bounds;
      //binding properties (two and one way)
      propsBinder(this, this.mapObject, boundProps);

      //binding events
      eventsBinder(this, this.mapObject, events);

      // update the bounds
      this.$emit('g-bounds_changed');

      // wait before google maps has loaded the map to avoid bug with info windows
      this.$once('g-bounds_changed', () => {
        // The map is now created
        this.mapCreatedDefered.resolve(this.mapObject);
      });
    }, (error) => {
      throw error;
    });
  },
  events: eventListeners,
  methods: methods
}
</script>

<style lang="less">

.full() {
  width: 100%;
  height:100%;
}

.vue-map-container {
  .full();
  .vue-map {
    .full();
  }
}

</style>
