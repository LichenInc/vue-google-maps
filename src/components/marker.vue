/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

<script>

import _ from 'lodash';
import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';
import getPropsValuesMixin from '../utils/getPropsValuesMixin.js'
import Q from 'q';
import markerWithLabel from 'markerwithlabel'
import { loaded } from '../manager.js'
let MarkerWithLabel

loaded.then(() => { MarkerWithLabel = markerWithLabel(google.maps) })

const props = {
  animation: {
    twoWay: true,
    type: Number
  },
  attribution: {
    type: Object,
  },
  clickable: {
    type: Boolean,
    twoWay: true,
  default: true
  },
  cursor: {
    type: String,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    twoWay: true,
  default: false
  },
  icon: {
    type: Object,
    // twoWay: true
  },
  // label: {
  // },
  labelContent: {},
  labelAnchor: {},
  labelClass: {}, // the CSS class for the label
  labelInBackground: {},
  opacity: {
    type: Number,
  default: 1
  },
  place: {
    type: Object
  },
  position: {
    type: Object,
    twoWay: true,
  },
  shape: {
    type: Object,
    twoWay: true
  },
  title: {
    type: String,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  },
  visible: {
    twoWay: true,
    default: 'auto'
  }
}

const events = [
  'click',
  'rightclick',
  'dblclick',
  'drag',
  'dragstart',
  'dragend',
  'mouseup',
  'mousedown',
  'mouseover',
  'mouseout'
];

var container;

export default {
  mixins: [getPropsValuesMixin],
  props: props,

  created() {
    this.mapAvailableDefered = new Q.defer();
    this.mapAvailable = this.mapAvailableDefered.promise;
    this.destroyed = false;
  },

  attached() {
    if (this.visible === 'auto') {
      this.visible = true;
    }
  },

  ready () {
    this.$dispatch('register-marker', this);
  },

  detached() {
    if (this.visible === 'auto') {
      this.visible = false;
    }
  },

  destroyed() {
    this.destroyed = true;
    if (this.registrar === 'map' && this.markerObject) {
      this.markerObject.setMap(null);
    } else if (this.markerObject) {
      this.clusterObject.removeMarker(this.markerObject);
    }
  },

  methods: {
    createMarker (options, map) {
      if (!this.destroyed) {
        this.markerObject = new MarkerWithLabel(options);
        propsBinder(this, this.markerObject, props);
        eventsBinder(this, this.markerObject, events);
        this.mapAvailableDefered.resolve(map);
      }
    }
  },

  events: {
    'map-ready' (map) {
      this.registrar = 'map';
      this.mapObject = map;
      const options = _.clone(this.getPropsValues());
      options.map = this.mapObject;
      this.createMarker(options, map);
    },

    'cluster-ready' (cluster, map) {
      this.registrar = 'cluster';
      this.clusterObject = cluster;
      const options = _.clone(this.getPropsValues());
      this.createMarker(options, map);
      cluster.addMarker(this.markerObject);
    },

    'register-infoWindow' (infoWindow) {
      this.mapAvailable.then((map) => {
        infoWindow.$emit('marker-ready', this, map);
      });
    }
  }
}
</script>
