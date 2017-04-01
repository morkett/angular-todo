//params are what we are injecting into controller - can pass things into the controller via dependency injection
function TodoController($state, $stateParams, TodoFactory){
  var controller = this;

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

  controller.getTodo = function(){
    // $stateParams is like req.params - it finds the thing after the colon eg todo factory line 15
    var todoId = $stateParams.todoId;

    TodoFactory.getOne(todoId).then(
      function success(response) {
        console.log('todo:',response);
        controller.selectedTodo = response.data;
      },
      function error(error) {
        console.warn('Error getting todo:',error);
      }
    );
  };

  controller.deleteTodo = function(todoId) {
    TodoFactory.deleteOne(todoId).then(
      function success(response) {
        console.log('deleted:', response);
      },
      function error (error) {
        console.warn('Error deleting todo', error);
      }
    );
  };

  controller.editTodo = function(todoId) {
    $state.go('edit', { todoId: todoId });
  };

  controller.updateTodo = function () {
    TodoFactory.editOne(controller.selectedTodo.todo).then(
     function success(response) {
       controller.changeState();
       console.log('todo updated:', response);
     },
     function error(error) {
       console.warn('Error updating todo:', error);
     }
   );
  };

  controller.addTodo = function(){
    console.log('addTodo()');
    //need to save it or when we refresh it will dissapear. need to make an API call like below.
    TodoFactory.createOne(controller.newTodo).then(
      function success(response) {

        //redirects to another state
        console.log('Created new todo: ', response);
        controller.reloadState();
        $state.go('home');
      },
      function error(error) {
        console.warn('Error creating todo:',error);
      }
    );
  };

//CHANGE STATE AND RELOADS DATA
  controller.changeState = function () {
    $state.transitionTo('home');
    controller.reloadState();
  };

  function init() {
    console.log(controller);
    controller.selectedTodo = undefined;

    controller.allTodos = [];
    controller.newTodo = {};

    controller.reloadState();
  }

  init();
}

// TodoController.$inject = ['TodoFactory'];

angular
  .module('ToDoApp')
  .controller('TodoController', TodoController);
