(function(){
    angular.module('tofi.trade')
        .controller('tradeCtrl', tradeCtrl);

    tradeCtrl.$inject = ['$scope', 'trader', 'messages', '$interval', 'timeService'];
    function tradeCtrl($scope, trader, messages, $interval, timeService){
        var ctrl = this;



        ctrl.addDollar = trader.addDollars;
        ctrl.addEuro = trader.addEuro;

        $scope.tab = 1;

        $scope.usd = {};
        $scope.eur = {};

        ctrl.changeTab = function(id){
            $scope.tab = id;
        };

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

        $scope.series = ['min deal', 'max deal', 'rate'];

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


        ctrl.buyUsd = function(){
            if (+$scope.usd.price && $scope.usd.price > 0 &&  +$scope.usd.amount && $scope.usd.amount > 0){
                trader.sell($scope.usd.price, $scope.usd.amount)
                    .then(function(response){
                        messages.success('Deal started successfully');
                    }, function(error){
                        messages.danger('Failed to start deal', error);
                    })
            } else {
                messages.danger('Invalid Price or amount');
            }
        };

        ctrl.buyEur = function(){
            if (+$scope.eur.price && $scope.eur.price > 0 &&  +$scope.eur.amount && $scope.eur.amount > 0){
                trader.buy($scope.eur.price, $scope.eur.amount)
                    .then(function(response){
                            messages.success('Deal started successfully');
                        }, function(error){
                        messages.danger('Failed to start deal', error);
                    })
            } else {
                messages.danger('Invalid Price or amount');
            }
        };

        ctrl.createAccounts = function(){
            trader.createAccounts()
                .then(function(response){
                    messages.success('Accounts created successfully');
                }, function(response){
                    messages.danger('Failed to create accounts', response);
                })
        };

        trader.resetNewClosedDeals();

        trader.getCurrentTraderAccounts()
            .then(function(data){
                $scope.tradeAccounts = data;
            });

        trader.getLastRate()
            .then(function(response){
                $scope.rateObj = response;
            });

        $scope.timeObj = timeService.getTime();
        $interval(updateRates, $scope.timeObj.rateTime);
        function updateRates(){
            trader.getRates()
                .then(function(response){
                    debugger;
                    $scope.labels = [];
                    $scope.data = [[],[],[]];
                    response.map(function(item){
                        $scope.labels.push(moment(item.date).subtract(3, 'hours'));
                        $scope.data[0].push(item.min);
                        $scope.data[1].push(item.max);
                        $scope.data[2].push(item.rate)
                    });
                }, function(erros){
                    debugger;
                })
        }
    }
})();