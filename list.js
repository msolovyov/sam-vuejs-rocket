
/*global Vue*/



var app = new Vue({
  el: '#representation',
  ready () {

  },

  data: {
    // input field view binding
    itemV: {name :'', description : ''},

    // model
    items: [
      { name: 'Item 1 name',
        description: 'Item 1 description'
      }
    ],
    openedEditor: false,
    editingIndex: false


  },

  // state
  computed: {
    stateReady: function () {
      return true;
    },
    stateAdding () {
      return (!this.openedEditor)
    },
    stateEditing () {
      return (this.openedEditor)
    }

  },

  methods: {
    modelPresent (data) {
      data = data || {} ;
      // if (data.item !== undefined ) {
      if (data.name !== undefined && data.description !== undefined) {
        // adding item
        if (data.deleteAtIndex === undefined && data.openedEditor === false ) {
          this.items.push({name :data.name, description : data.description});
          this.itemV = {name :'', description : ''};
        }

        // start editing
        if (data.openedEditor === true && data.index !== undefined) {
          this.openedEditor = data.openedEditor;

          //populate view fields with item data that we decided to edit
          this.itemV = {name :data.name, description : data.description};

          // save the index for if we decide to save
          this.editingIndex = data.index;

        }
        // saving edited  item
        if (data.openedEditor === true && data.index === undefined) {

          this.items[this.editingIndex].name = data.name;
          this.items[this.editingIndex].description = data.description;

          // reset to adding state
          this.editingIndex = false;
          this.openedEditor = false;
          this.itemV = {name :'', description : ''};
        }


      }

      // canceling edit
      if (data.canceledEdit === true) {
        this.openedEditor = false;
        this.itemV = {name :'', description : ''};
        this.editingIndex = false;
      }

      // removing item
      if (data.deletedItemIndex !== undefined) {
        this.items.splice(data.deletedItemIndex, 1);
      }

      app.nextAction();
    },

    // view helper methods, called from the view they get data from the view and pass it to the appropriate action
    add () {
      var data = this.formFields();
      actions.add(data)
    },
    edit (index) {
      // grab the item to display it in the edit fields
      item = this.items[index];
      actions.edit({name: item.name, description: item.description,index: index});
    },
    save () {

      var data = this.formFields();
      actions.save(data);
    },
    delete (index) {

      actions.delete({deletedItemIndex: index})
    },
    cancel() {
      actions.cancel({});
    },


    nextAction: function () {

    },

    formFields(data) {
      data = data || {} ;
      data.name = document.getElementById('name').value;
      data.description = document.getElementById('description').value;
      return data
    }

  }
});




var actions = {} ;

actions.edit = function(data, present) {
    present = present || app.modelPresent ;
    data.openedEditor = true;

    present(data) ;
    return false ;
} ;

actions.add = function(data, present) {
  present = present || app.modelPresent ;

  data.openedEditor = false;
  present(data) ;
  return false ;
};

actions.save = function(data, present) {
    present = present || app.modelPresent ;

    data.openedEditor = true;
    present(data) ;
    return false ;
} ;

actions.delete = function(data, present) {
    present = present || app.modelPresent ;
    present(data) ;
    return false ;
} ;

actions.cancel = function(data, present) {
    present = present || app.modelPresent ;
    data.canceledEdit = true;
    present(data) ;
    return false ;
} ;
