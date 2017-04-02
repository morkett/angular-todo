function TodoFactory(API_URL, $http) {
  return {
    getAll: function() {
      return $http({
        method: 'GET',
        url: `${API_URL}/todos`
      });
    },

    getOne: function(todoId) {
      return $http({
        method: 'GET',
        url: `${API_URL}/todos/${todoId}`
      });
    },

    editOne: function(editedTodo) {
      return $http({
        method: 'PATCH',
        url: `${API_URL}/todos/${editedTodo._id}`,
        data: editedTodo
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
    }


  };
}

angular
.module('ToDoApp')
.factory('TodoFactory',TodoFactory);
