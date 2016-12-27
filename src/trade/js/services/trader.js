(function () {
    angular
        .module('tofi.trade')
        .factory('trader', traderFactory);

    traderFactory.$inject = ['LocalStorage', 'currentUser', '$http', 'timeService', '$q', '$interval', '$timeout'];
    function traderFactory(LocalStorage, currentUser, $http, timeService, $q, $interval, $timeout) {

        var rates = null;

        var deals = null;

        var accounts = null;

        var updateRate = null;
        var updateDeal = null;

        var traderEntity =  {
            sell: sell,
            buy: buy,
            addDollars: addDollars,
            addEuro: addEuro,

            getRates: getRates,

            getDeals:getDeals,
            resetNewDeals: resetNewDeals,

            startUpdateRate:startUpdateRate,
            startUpdateDeals: startUpdateDeals,

            updateAccounts: updateAccounts,
            createAccounts: createAccounts,
            getCurrentTraderAccounts: getCurrentTraderAccounts,

            restartUpdateDeal:restartUpdateDeal,
            restartUpdateRate: restartUpdateRate,

            stopUpdate: stopUpdate
        };

        function sell(rate, units){
            return $http.post('/api/deals?token=' + LocalStorage.retrieve('token'),
            {
                side: 'SELL',
                sellPrice: rate,
                units: units
            })
            .then(function(data){
                traderEntity.updateAccounts();
                return data;
            }, function(response){
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
            .then(function(data){
                traderEntity.updateAccounts();
                return data;
            }, function(response){
                throw response.data.errors;
            })
        }

        function getCurrentTraderAccounts() {
            if (accounts){
                return $q.when(accounts);
            } else {
                return $http.get('/api/accounts/my?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        accounts = {
                            info: response.data.results
                        };
                        return accounts;
                    })
            }
        }

        function addDollars(){
            return $http.put('/api/accounts/my/' + accounts.info[0]._id + '?token=' + LocalStorage.retrieve('token'),
            {
                amount: 1000
            })
                .then(function(response){
                    traderEntity.updateAccounts();
                    return response;
                })
        }

        function addEuro(){
            return $http.put('/api/accounts/my/' + accounts.info[1]._id + '?token=' + LocalStorage.retrieve('token'),
            {
                amount: 1000
            }).then(function(response){
                traderEntity.updateAccounts();
                return response;
            })
        }

        function getDeals(){
            return $http.get('/api/deals/my?token=' + LocalStorage.retrieve('token'))
                .then(function(response){
                    if (!deals){
                        deals = {
                            myDeals: response.data.results,
                            newDealsCount: 0
                        };
                    } else {
                        deals.myDeals = response.data.results;
                    }
                    return deals;
                })
        }

        function createAccounts(){
            return $http.post('/api/accounts/my?token=' + LocalStorage.retrieve('token'),
            {
                amountUSD: 0,
                amountEUR: 0
            })
                .then(function(data){
                    traderEntity.updateAccounts();
                });
        }

        function getRates(){
            if (rates){
                return $q.when(rates);
            } else {
                return $http.get('/api/rates?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        rates = {};
                        rates.ratesArray = response.data.results;
                        rates.lastRate = {
                            rate: response.data.results[0].rate,
                            min: response.data.results[0].min,
                            max: response.data.results[0].max
                        };
                        timeService.setTime(response.data.results[0].date);
                        rates.ratesArray.forEach(function(item){
                            item.date = moment(item.date).subtract(3, 'hours');
                        });
                        return rates;
                    })
            }

        }

        function startUpdateDeals(){
            timeService.getTime()
                .then(function(response){
                    updateDeal = $interval(updateDeals, response.dealTime);
                });

            function updateDeals(){
                $http.get('/api/deals/closed/new?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        accounts.info = response.data.accounts;
                        deals.newDealsCount += response.data.count;
                    });
                // traderEntity.updateAccounts();
            }
        }

        function startUpdateRate(){
            timeService.getTime()
                .then(function(response){
                    updateRate = $interval(updateRates, response.rateTime/2);
                });

            function updateRates(){
                $http.get('/api/rates/last?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        timeService.setTime(response.data.date);
                        if (!rates.ratesArray[0].date.isSame(moment(response.data.date))){
                            response.data.date = moment(response.data.date).subtract(3, 'hours');
                            rates.ratesArray.unshift(response.data);
                            rates.ratesArray = rates.ratesArray.slice(0, 15);
                            rates.lastRate = response.data;
                        }
                    })
            }
        }

        function updateAccounts(){
            return $http.get('/api/accounts/my?token=' + LocalStorage.retrieve('token'))
                .then(function(response){
                    accounts.info = response.data.results;
                    return accounts;
                })
        }

        function restartUpdateDeal(newTime){
            $interval.cancel(updateDeal);
            updateDeal = $interval(updateDeals, newTime);

            function updateDeals(){
                $http.get('/api/deals/closed/new?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        accounts.info = response.data.accounts;
                        deals.newDealsCount += response.data.count;
                    });
            }
        }

        function restartUpdateRate(newTime){
            $interval.cancel(updateRate);
            updateRate = $interval(updateRates, newTime);

            function updateRates(){
                $http.get('/api/rates/last?token=' + LocalStorage.retrieve('token'))
                    .then(function(response){
                        timeService.setTime(response.data.date);
                        response.data.date = moment(response.data.date).subtract(3, 'hours');
                        rates.ratesArray.unshift(response.data);
                        rates.ratesArray = rates.ratesArray.slice(0, 15);
                        rates.lastRate = response.data;
                    })
            }
        }

        function stopUpdate(){
            $interval.cancel(updateRate);
            $interval.cancel(updateDeal);
            rates = null;
            deals = null;
            accounts = null;
        }



        function resetNewDeals(){
            if (deals){
                deals.newDealsCount = 0;
            }
        }

        return traderEntity;
    }
})();