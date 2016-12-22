(function(){
    angular.module('tofi.bots')
        .controller('botsListCtrl', botsListCtrl);

    botsListCtrl.$inject = ['$scope', 'bots'];
    function botsListCtrl($scope, bots){
        var vm = this;

        bots.getAll()
            .then(function(response){
                $scope.bots = response;
            });
    }

})();