(function(){
    angular.module('tofi.bots')
        .controller('botsViewCtrl', botsViewCtrl);

    botsViewCtrl.$inject = ['$scope', '$state', 'entity'];
    function botsViewCtrl($scope, $state, entity){
        var ctrl = this;
        $scope.entity = entity;
    }

})();