(function(){
    angular.module('tofi.users', [])

    angular
        .module('tofi.users')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.users', {
                url: "/users",
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    hasPermissions: function (currentUser, $state, $timeout, $q) {
                        return currentUser.getCurrentUser()
                            .then(function(data){
                                if (data.role === 'admin'){
                                    return $q.when(true);
                                } else {
                                    $state.go('app.home');
                                    return $q.reject(false);
                                }
                            }, function(error){
                                return $q.reject(false);
                            })
                    }
                }
            })
            .state('app.users.list', {
                url: "/list",
                controller: 'userListCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/users/templates/list.html",
                resolve: {
                    allUsers: function(users){
                        return users.getAll();
                    }
                }
            })
            .state('app.users.add', {
                url: "/add",
                controller: 'userAddCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/users/templates/add.html"
            })
             .state('app.users.edit', {
                url: "/edit/:id",
                controller: 'userEditCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/users/templates/edit.html",
                resolve: {
                    entity: function(users, $stateParams){
                        return users.get($stateParams.id);
                    }
                }
            });
    }
})();