(function(){
    angular.module('tofi.users')
        .controller('userAddCtrl', addCtrl);

    addCtrl.$inject = ['$scope', '$http'];
    function addCtrl($scope, $http){
        var ctrl = this;

        $scope.entity = {};

        ctrl.submit = function(){

            $scope.entity.admin = true;

            $http.post('http://127.0.0.1:3000/api/register', $scope.entity)
                .then(function successCallback(response) {
                        debugger;
                    }, function errorCallback(response) {
                        debugger;
                    });

            console.info('%cSUBMIT', 'color:blue; font-size: 15px');
        }
    }

})();