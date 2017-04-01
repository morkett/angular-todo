
function MainRouter ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/todos',
      templateUrl: '/states/home.html'
    })
    .state('new', {
      url: '/todos/new',
      templateUrl: '/states/new.html'
    })
    .state('edit', {
      url: '/todos/:todoId/edit',
      templateUrl: '/states/edit.html'
    })
    .state('show', {
      url: '/todos/:todoId',
      templateUrl: '/states/show.html'
    });





  $urlRouterProvider.otherwise('/todos');

}

angular
  .module('ToDoApp', ['ui.router'])
  .constant('API_URL', 'http://localhost:3000')
  .config(MainRouter);
