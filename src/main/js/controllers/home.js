(function(){

    angular.module('tofi')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'trader'];
    function homeCtrl($scope, trader){

        $scope.labels = null;
        $scope.series = ['min deal', 'max deal', 'rate'];
        $scope.data = null;
        $scope.options = {
            animation: {
                duration: 0
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            millisecond:'D MMM',
                            second: 'D MMM',
                            minute: 'D MMM',
                            hour:'D MMM',
                            day:'D MMM',
                            week:'D MMM',
                            month:'D MMM',
                            quarter:'D MMM',
                            year:'D MMM'
                        }
                    }
                }]
            }
        };

        trader.getRates()
            .then(function(response){
                $scope.rateInfo = response;
            });

        $scope.$watch('rateInfo', onRateInfoUpdate, true);

        function onRateInfoUpdate(newVal){
            if (!newVal){return;}
            $scope.labels = [];
            $scope.data = [[], [], []];
            newVal.ratesArray.forEach(function(item){
                $scope.labels.push(moment(item.date));
                $scope.data[0].push(item.min);
                $scope.data[1].push(item.max);
                $scope.data[2].push(item.rate);
            })
        }

    }

})();