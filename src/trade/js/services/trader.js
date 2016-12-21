(function () {
    angular
        .module('tofi.trade')
        .factory('trader', traderFactory);

    traderFactory.$inject = ['LocalStorage', 'currentUser', '$http', 'timeService', '$q'];
    function traderFactory(LocalStorage, currentUser, $http, timeService, $q) {

        var closedDeals = {
            showNotifications: true,
            count: 0
        };

        var currentTrader = null;

        var traderEntity =  {
            sell: sell,
            buy: buy,
            addDollars: addDollars,
            addEuro: addEuro,

            getRates: getRates,
            getLastRate: getLastRate,
            getDeals:getDeals,
            getNewClosedDeal:getNewClosedDeal,

            resetNewClosedDeals: resetNewClosedDeals,

            createAccounts: createAccounts,
            getCurrentTraderAccounts: getCurrentTraderAccounts,
            updateCurrentTrader:updateCurrentTrader
        };

        function sell(rate, units){
            return $http.post('/api/deals?token=' + LocalStorage.retrieve('token'),
            {
                side: 'SELL',
                sellPrice: rate,
                units: units
            })
            .then(null, function(response){
                throw response.data.errors;
            })
        }

        function buy(rate, units){
            return $http.post('/api/deals?token=' + LocalStorage.retrieve('token'),
            {
                side: 'BUY',
                buyPrice: rate,
                units: units
            })
            .then(null, function(response){
                throw response.data.errors;
            })
        }

        function getCurrentTraderAccounts() {
            if (currentTrader){
                return $q.when(currentTrader);
            } else {
                return traderEntity.updateCurrentTrader();
            }

        }

        function updateCurrentTrader(){
            return $http.get('/api/accounts/my?token=' + LocalStorage.retrieve('token'))
                .then(function(response){
                    if (!currentTrader){
                        currentTrader = response.data.results;
                    } else {
                        currentTrader[0] = response.data.results[0];
                        currentTrader[1] = response.data.results[1];
                    }
                    return currentTrader;
                }, function(){
                    debugger;
                })
        }



        function addDollars(){
            return $http.put('/api/accounts/my/' + currentTrader[0]._id + '?token=' + LocalStorage.retrieve('token'),
            {
                amount: 1000
            })
            .then(function(response){
                traderEntity.updateCurrentTrader();
                return response.data;
            })

        }

        function addEuro(){
            return $http.put('/api/accounts/my/' + currentTrader[1]._id + '?token=' + LocalStorage.retrieve('token'),
            {
                amount: 1000
            })
            .then(function(response){
                traderEntity.updateCurrentTrader();
                return response.data;
            })
        }


        function getNewClosedDeal(){
            return $http.get('/api/deals/closed/new?token=' + LocalStorage.retrieve('token'))
                .then(function(response){
                    closedDeals.count += response.data.count;
                    return response.data;
                })
        }

        function getDeals(){
            return $http.get('/api/deals/my?token=' + LocalStorage.retrieve('token'))
                .then(function(response){
                    return response.data;
                }, function(response){
                    debugger;
                    throw response.data.errors;
                })
        }

        function getLastRate(){
            return $http.get('/api/rates/last?token=' + LocalStorage.retrieve('token'))
                .then(function(response){
                    var time = timeService.getTime();
                    time.currentDate = response.data.date;
                    return response.data;
                })
        }

        function resetNewClosedDeals(){
            closedDeals.count = 0;
        }

        function createAccounts(){
            return $http.post('/api/accounts/my?token=' + LocalStorage.retrieve('token'),
            {
                amountUSD: 0,
                amountEUR: 0
            })
            .then(function(response){
                debugger;
                traderEntity.updateCurrentTrader();
                return response.data;
            }, function(response){
                debugger;
                response.data.errors;
            })
        }

        function getRates(){
            return $http.get('/api/rates?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        return response.data.results;
                    }, function(errors){
                        debugger;
                    })
        }

        return traderEntity;
    }
})();