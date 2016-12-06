(function(){
    angular.module('tofi.users')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

//        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('users', {
                url: "/users",
                abstract: true
            })
            .state('users.list', {
                url: "/users",
                controller: 'userListCtrl',
                controllerAs: 'ctrl',
                templateUrl: "/frontend/templates/users/list.html"
            })

            .state('state2', {
                url: "/state2",
                templateUrl: "partials/state2.html"
            })
            .state('state2.list', {
                url: "/list",
                templateUrl: "partials/state2.list.html",
                controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
                }
            });
    }
})();