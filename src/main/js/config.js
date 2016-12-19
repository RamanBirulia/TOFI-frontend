(function(){
    angular.module('tofi', [
        'ui.router',
        'tofi.trade',
        'tofi.users',
        'tofi.statistic',
        'tofi.bots',
        'chart.js']);

    angular
        .module('tofi')
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: "src/main/templates/basic.html",
                controller: "AppCtrl",
                controllerAs: "ctrl",
                resolve: {
                    isAuth: function(LocalStorage){
                        if(!!LocalStorage.retrieve('token')){
                            return true;
                        } else {
    //                      localStorage.store('redirectUrl', $location.path());
                            $timeout(function(){
                                $state.go('login');
                            });
                            return false;
                        }
                    }
                }
            });
         $stateProvider
                .state("login", {
                    url: "/login",
                    controller: 'loginCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: "src/main/templates/login.html"
                })
                .state("register", {
                    url: "/register",
                    controller: 'registerCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: "src/main/templates/register.html"
                });


        ['home', 'profile', 'about', 'time']
            .map(function(url){
                $stateProvider
                    .state("app." + url, {
                        url: "/" + url,
                        controller: url + 'Ctrl',
                        controllerAs: 'ctrl',
                        templateUrl: "src/main/templates/" + url + ".html"
                    })
            })
    }
})();