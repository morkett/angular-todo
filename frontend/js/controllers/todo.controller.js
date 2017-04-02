function TodoController($state, $stateParams, TodoFactory){
  var controller = this;

//RELOAD STATE
  controller.reloadState = function(){
    TodoFactory.getAll().then(
      //success and error are no reserved words. they can be anything or not there
      function success(response) {
        controller.allTodos = response.data;
      },
      function error (error) {
        console.warn('Error getting todos:', error);
      }
    );
  };

  //CHANGE STATE AND RELOADS DATA
  controller.changeState = function () {
    $state.transitionTo('home');
    controller.reloadState();
  };

  ////////////////////////
  // getOneTodo
  ////////////////////////

  controller.getTodo = function(){
    var todoId = $stateParams.todoId;

    TodoFactory.getOne(todoId).then(
      function success(response){
        console.log('todo: ',response);
        controller.selectedTodo = response.data;
      },
      function error(error){
        console.warn('Error getting todos: ', error);
      }
    );
  };

  controller.editTodo = function(todoId) {
    $state.go('edit', {todoId: todoId});
  };

  controller.updateTodo = function() {
    TodoFactory.editOne(controller.selectedTodo.todo).then(
      function success(response){
        controller.changeState();
        console.log('todo update: ', response);
      },
      function error (error) {
        console.warn('Error Updating: ',error);
      }
    );
  }

  controller.addTodo = function(){
    TodoFactory.createOne(controller.newTodo).then(
      function success (response){
        controller.changeState();
        console.log('Created new Todo: ',response);
      },
      function error (error){
        console.warn('Error creating new Todo: ', error);
      }
    );
  }

  controller.deleteTodo = function(todoId){
    TodoFactory.deleteOne(todoId).then(
      function success(response){
        controller.changeState();
        console.log('Deleted Todo: ',success);
      },
      function error (error) {
        console.warn('Could not delete todo: ',error);
      }
    );
  }



  function init() {
    console.log(controller);
    controller.allTodos = [];
    controller.selectedTodo = undefined;
    controller.reloadState();
  }


  init();
}



angular
  .module('ToDoApp')
  .controller('TodoController', TodoController);
