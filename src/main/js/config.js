(function(){
    angular.module('tofi', [
        'ui.router',
        'tofi.users',
        'tofi.statistic']);

    angular
        .module('tofi')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/login");

        ['home', 'login', 'register', 'profile', 'about']
            .map(function(url){
                $stateProvider
                    .state(url, {
                        url: "/" + url,
                        controller: url + 'Ctrl',
                        controllerAs: 'ctrl',
                        templateUrl: "src/main/templates/" + url + ".html"
                    })
            })
    }
})();