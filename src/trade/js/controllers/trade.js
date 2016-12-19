(function(){
    angular.module('tofi.trade')
        .controller('tradeCtrl', tradeCtrl);

    tradeCtrl.$inject = ['$scope', 'trader', 'messages'];
    function tradeCtrl($scope, trader, messages){
        var ctrl = this;

        ctrl.addDollar = trader.addDollars;
        ctrl.addEuro = trader.addEuro;

        $scope.tab = 1;

        $scope.usd = {};
        $scope.eur = {};

        ctrl.changeTab = function(id){
            $scope.tab = id;
        }

        function newDate(days) {
          return moment().add(days, 'd');
        }


        $scope.labels = [
            moment("20110210", "YYYYMMDD"),
            moment("20110211", "YYYYMMDD"),
            moment("20110212", "YYYYMMDD"),
            moment("20110213", "YYYYMMDD"),
            moment("20110214", "YYYYMMDD"),
            moment("20110215", "YYYYMMDD"),
            moment("20110216", "YYYYMMDD"),
            moment("20110217", "YYYYMMDD"),
            moment("20110218", "YYYYMMDD"),
            moment("20110219", "YYYYMMDD"),
            moment("20110220", "YYYYMMDD"),
            moment("20110221", "YYYYMMDD")
       ];

        $scope.series = ['$'];

        $scope.data = [
            [1, 1, 0.9, 1, 1, 0.9, 1, 1, 0.9, 0.9, 1, 1]
        ];

        $scope.options = {
            animation: {
                duration: 0
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    hour: 'L'
                  }
                }
              }],
            }
        }


        ctrl.buyUsd = function(){
            trader.buy(usd.price, usd.mount)
                .then(function(response){
                    messages.success('Deal started successfully');
                })
        };

        ctrl.buyEur = function(){
            trader.buy(eur.price, eur.mount);
        }

    }
})();