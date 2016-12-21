(function(){

    angular.module('tofi')
        .controller('timeCtrl', timeCtrl);

    timeCtrl.$inject = ['timeService', '$scope'];
    function timeCtrl(timeService, $scope){

        var vm = this;

        $scope.time = timeService.getTime();

        vm.upRate = timeService.upRate;
        vm.downRate = timeService.downRate;
        vm.upDeal = timeService.upDeal;
        vm.downDeal = timeService.downDeal;
    }

})();