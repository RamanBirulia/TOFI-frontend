(function () {
    angular
        .module('tofi')
        .factory('timeService', timeFactory);

    timeFactory.$inject = ['$http', '$q'];
    function timeFactory($http, $q) {

        var time = {
            old: true,
            rateTime: 5000,
            dealTime: 5000
        };

        var timeObj =  {
            upRate:upRate,
            downRate:downRate,
            upDeal:upDeal,
            downDeal:downDeal,

            getRateTime: getRateTime,
            getDealTime: getDealTime,

            getTime: getTime,
            setTime: setTime
        };

        function upRate(){
            return $http.get('/api/variables/rate-interval/speedup')
                .then(function(response){
                    debugger;
                    time.rateTime = +response.data.value;
                    return time.rateTime;
                })
        }

        function downRate(){
            return $http.get('/api/variables/rate-interval/slowdown')
                .then(function(response){
                    time.rateTime = +response.data.value;
                    return time.rateTime;
                })
        }

        function upDeal(){
            return $http.get('/api/variables/deal-interval/speedup')
                .then(function(response){
                    time.dealTime = +response.data.value;
                    return time.dealTime;
                })
        }

        function downDeal(){
            return $http.get('/api/variables/deal-interval/slowdown')
                .then(function(response){
                    time.dealTime = +response.data.value;
                    return time.dealTime;
                })
        }

        function getTime(){
            if (time.old){
                return $q.all([timeObj.getRateTime(), timeObj.getDealTime()])
                    .then(function(response){
                        time.old = false;
                        return time;
                    });
            } else {
                return $q.when(time);
            }

        }

        function setTime(t){
            if (!time){
                time = {};
            }
            time.currentTime = t;
        }

        function getRateTime(){
            return $http.get('/api/variables/deal-interval')
                .then(function(response){
                    time.dealTime = response.data.value;
                    return time.dealTime;
                })
        }

        function getDealTime(){
            return $http.get('/api/variables/rate-interval')
                .then(function(response){
                    time.rateTime = response.data.value;
                    return time.rateTime;
                })
        }


        return timeObj;
    }
})();