(function () {
    angular
        .module('tofi')
        .factory('timeService', timeFactory);

    timeFactory.$inject = ['$http', '$rootScope']
    function timeFactory($http, $rootScope) {

        var time = {
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
                    $rootScope.time = +response.data.value;
                })
        }

        function downRate(){
            $http.get('/api/variables/rate-interval/slowdown')
                .then(function(response){
                    $rootScope.time = +response.data.value;
                })
        }

        function upDeal(){
            return $http.get('/api/variables/deal-interval/speedup');
        }

        function downDeal(){
            return $http.get('/api/variables/deal-interval/slowdown');
        }

        function getTime(){
            return time;
        }
    }
})();