(function () {
    angular
        .module('tofi')
        .factory('timeService', timeFactory);

    timeFactory.$inject = ['$http', '$rootScope'];
    function timeFactory($http, $rootScope) {

        var time = {
            currentDate: null,
            rateTime: 10000,
            dealTime: 1000
        };

        return {
            upRate:upRate,
            downRate:downRate,
            upDeal:upDeal,
            downDeal:downDeal,

            getTime: getTime
        };

        function upRate(){
            $http.get('/api/variables/rate-interval/speedup')
                .then(function(response){
                    time.rateTime = +response.data.value;
                })
        }

        function downRate(){
            $http.get('/api/variables/rate-interval/slowdown')
                .then(function(response){
                    time.rateTime = +response.data.value;
                })
        }

        function upDeal(){
            return $http.get('/api/variables/deal-interval/speedup')
                .then(function(response){
                    time.dealTime = +response.data.value;
                })
        }

        function downDeal(){
            return $http.get('/api/variables/deal-interval/slowdown')
                .then(function(response){
                    time.dealTime = +response.data.value;
                })
        }

        function getTime(){
            return time;
        }
    }
})();