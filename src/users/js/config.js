(function(){
    angular.module('tofi.users', [])

    angular
        .module('tofi.users')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: "/users",
                template: '<ui-view/>',
                abstract: true
            })
            .state('users.list', {
                url: "/list",
                controller: 'userListCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/users/templates/list.html"
            })
            .state('users.add', {
                url: "/add",
                controller: 'userAddCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/users/templates/add.html"
            })
             .state('users.edit', {
                url: "/edit",
                controller: 'userEditCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/users/templates/edit.html"
            });
    }
})();