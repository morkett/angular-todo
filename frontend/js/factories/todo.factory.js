function TodoFactory(API_URL, $http) {
  return {
    //getAll no reserved word it is jus an object
    getAll: function () {
      return $http({
        method: 'GET',
        //use of back ticks for url
        url: `${API_URL}/todos`
      });
    },
    getOne: function (todoId) {
      return $http({
        method: 'GET',
        //use of back ticks for url
        url: `${API_URL}/todos/${todoId}`
      });
    },
    createOne: function(newTodo) {
      return $http({
        method: 'POST',
        url: `${API_URL}/todos`,
        data: newTodo
      });
    },
    deleteOne: function(todoId) {
      return $http({
        method: 'DELETE',
        url: `${API_URL}/todos/${todoId}`
      });
    },
    editOne: function(editedTodo) {
      return $http({
        method: 'PATCH',
        url: `${API_URL}/todos/${editedTodo._id}`,
        data: editedTodo
      });
    }
  };
}

angular
  .module('ToDoApp')
  .factory('TodoFactory', TodoFactory);
