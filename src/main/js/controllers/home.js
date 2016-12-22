(function(){

    angular.module('tofi')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$http', 'currentUser', '$scope', 'messages', '$interval'];
    function homeCtrl($http, currentUser, $scope, messages, $interval){

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
              }]
            }
        };


        $interval(function(){
            $scope.labels  = $scope.labels.slice(1).concat([moment($scope.labels[$scope.labels.length-1]).add(1, 'days')]);
            $scope.data[0]  = $scope.data[0].slice(1).concat(Math.random());
        }, 2000);
    }

})();