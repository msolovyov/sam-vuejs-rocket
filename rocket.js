
const COUNTER_MAX = 10 ;

var rocket = new Vue({
  el: '#representation',
  ready() {

  },
  //model
  data: {
    model: {
      counter: COUNTER_MAX,
      started: false,
      launched: false,
      aborted: false
    }

  },

  //state
  computed: {
    stateReady: function() {
      return ((this.model.counter === COUNTER_MAX) && !this.model.started && !this.model.launched && !this.model.aborted);
    },
    stateCounting:  function() {
      return ((this.model.counter <= COUNTER_MAX) && (this.model.counter >= 0) && this.model.started &&  !this.model.launched && !this.model.aborted) ;
    },

    stateLaunched: function() {
      return ((this.model.counter == 0) && this.model.started && this.model.launched && !this.model.aborted) ;
    },

    stateAborted: function() {
      return (
        (  this.model.counter <= COUNTER_MAX) && (this.model.counter >= 0)
        && this.model.started && !this.model.launched && this.model.aborted ) ;
    }



  },
  //actions
  methods: {
    decrement: function () {
      setTimeout(function(){
        rocket.model.counter = rocket.model.counter - 1;
        rocket.present();
      }, 1000);

    },
    start() {
      rocket.model.started = true;
      rocket.present();
    },
    launch(){
      rocket.model.launched = true;
      rocket.present();
    },
    abort(){
      rocket.model.aborted = true;
      rocket.present();
    },
    present(){
      rocket.nextAction();
    },
    nextAction: function () {
      if ( rocket.stateCounting){
        if(rocket.model.counter > 0){
          rocket.decrement();
        }
        if (rocket.model.counter === 0) {
          rocket.launch();
        }
      }
    }

  }
});
