(function(){

    angular.module('tofi')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$http', 'currentUser', '$scope'];
    function homeCtrl($http, currentUser, $scope){

        $scope.currentUser = currentUser;

        $scope.currentUser = {
            name: 'RAMAN',
            surname: 'Birulia'
        }
    }

})();