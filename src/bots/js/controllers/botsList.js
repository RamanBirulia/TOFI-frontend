(function(){
    angular.module('tofi.bots')
        .controller('botsListCtrl', botsListCtrl);

        botsListCtrl.$inject = ['$scope', 'bots', 'messages', '$timeout'];
    function botsListCtrl($scope, bots, messages, $timeout){
        var vm = this;

        bots.getAll()
            .then(function(response){
                $scope.bots = response;
            });

        vm.createBot = function(){
            bots.create()
                .then(function(data){
                    messages.success('Bot will create in 10 seconds');
                    $timeout(function(){
                        bots.getAll()
                            .then(function(response){
                                $scope.bots = response;
                            });
                    }, 10000)

                }, function(data){
                    messages.danger('Fail to create bot');
                })
        }
    }

})();