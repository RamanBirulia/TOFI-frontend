(function () {
    angular
        .module('tofi.trade')
        .factory('trader', traderFactory);

    traderFactory.$inject = ['LocalStorage', 'currentUser', '$http']
    function traderFactory(LocalStorage, currentUser, $http) {

        var traderEntity =  {
            sell: sell,
            buy: buy,
            getInfo: getInfo,
            addDollars: addDollars,
            addEuro: addEuro
        };

        function sell(units, rate){
            return $http.post('/api/deals/?token=' + LocalStorage.retrieve('token'),
            {
                side: 'SELL',
                rate: rate,
                units: units
            })
        }

        function buy(units, rate){
            return $http.post('/api/deals/?token=' + LocalStorage.retrieve('token'),
            {
                side: 'BUY',
                rate: rate,
                units: units
            })
        }

        function getInfo() {
            return $http.get('/api/accounts/my?token=' + LocalStorage.retrieve('token'))
                .then(function(response){
                    currentUser.getCurrentUser()
                        .then(function(user){
                            user.dollars = response.data.results[0].amount;
                            user.euro = response.data.results[1].amount;
                            user.dollarsAccountId = response.data.results[0]._id;
                            user.euroAccountId = response.data.results[1]._id;
                        })
                }, function(){
                    debugger;
                })
        }

        function addDollars(){
            return currentUser.getCurrentUser()
                .then(function(data){
                    return $http.put('/api/accounts/my/' + data.dollarsAccountId + '?token=' + LocalStorage.retrieve('token'),
                    {
                        amount: 1000
                    })
                    .then(function(response){
                        traderEntity.getInfo();
                        return response.data;
                    })
                })

        }

        function addEuro(){
            return currentUser.getCurrentUser()
                .then(function(data){
                    return $http.put('/api/accounts/my/' + data.euroAccountId + '?token=' + LocalStorage.retrieve('token'),
                    {
                        amount: 1000
                    })
                    .then(function(response){
                        traderEntity.getInfo();
                        return response.data;
                    })
                })
        }

        return traderEntity;
    }
})();