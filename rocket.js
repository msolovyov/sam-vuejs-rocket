
/*global Vue*/

const COUNTER_MAX = 10;

var rocket = new Vue({
  el: '#representation',
  ready () {

  },
  // model
  data: {
    model: {
      counter: COUNTER_MAX,
      started: false,
      launched: false,
      aborted: false
    }

  },

  // state
  computed: {
    stateReady: function () {
      return ((this.model.counter === COUNTER_MAX) && !this.model.started && !this.model.launched && !this.model.aborted);
    },
    stateCounting: function () {
      return ((this.model.counter <= COUNTER_MAX) && (this.model.counter >= 0) && this.model.started && !this.model.launched && !this.model.aborted);
    },

    stateLaunched: function () {
      return ((this.model.counter === 0) && this.model.started && this.model.launched && !this.model.aborted);
    },

    stateAborted: function () {
      return (
        (this.model.counter <= COUNTER_MAX) && (this.model.counter >= 0) && this.model.started && !this.model.launched && this.model.aborted);
    }

  },

  methods: {
    modelPresent (data) {
      if (this.stateCounting) {
        if (this.model.counter === 0) {
          this.model.launched = data.launched || false ;
        } else {
          this.model.aborted = data.aborted || false ;
          if (data.counter !== undefined) { this.model.counter = data.counter ; }
        }
      } else {
        if (this.stateReady) {
          this.model.started = data.started || false ;
        }
      }
      rocket.nextAction();
    },

    start () {
      actions.start({});
    },
    abort() {
      actions.abort({});
    },

    nextAction: function () {
      if (rocket.stateCounting) {
        if (rocket.model.counter > 0) {
          actions.decrement({counter: this.model.counter},this.modelPresent) ;
        }
        if (rocket.model.counter === 0) {
          actions.launch({},this.modelPresent) ;
        }
      }
    }

  }
});


var actions = {} ;

actions.start = function(data, present) {
	present = present || rocket.modelPresent ;
	data.started = true ;
	present(data) ;
	return false ;
}

actions.decrement = function(data, present) {
	present = present || rocket.modelPresent ;
	data = data || {} ;
	data.counter = data.counter || 10 ;
	var d = data ;
	var p = present ;
	setTimeout(function() {
		d.counter = d.counter - 1 ;
		p(d) ;
	}, 1000) ;
}

actions.launch = function(data, present) {
	present = present || rocket.modelPresent ;
	data.launched = true ;
	present(data) ;
}

actions.abort = function(data, present) {
	present = present || rocket.modelPresent ;
	data.aborted = true ;
	present(data) ;
	return false ;
}
