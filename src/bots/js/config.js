(function(){
    angular.module('tofi.bots', []);

    angular
        .module('tofi.bots')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.bots', {
                abstract: true,
                template: '<ui-view/>',
                url: "/bots"
            });


        $stateProvider
            .state('app.bots.list', {
                url: "/list",
                controller: 'botsListCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/bots/templates/list.html"
            });

        $stateProvider
            .state('app.bots.add', {
                url: "/add",
                controller: 'botsAddCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/bots/templates/add.html"
            })

            .state('app.bots.view', {
                url: "/view/:login",
                controller: 'botsViewCtrl',
                controllerAs: 'ctrl',
                templateUrl: "src/bots/templates/view.html",
                resolve: {
                    entity: function(bots, $stateParams){
                        return bots.get($stateParams.login);
                    }
                }
            });

    }
})();