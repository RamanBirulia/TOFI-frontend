(function(){
    angular.module('tofi.bots')
        .controller('botsAddCtrl', botsAddCtrl);

    botsAddCtrl.$inject = ['$scope', 'bots', 'messages', '$state'];
    function botsAddCtrl($scope, bots, messages, $state){
        var ctrl = this;

        ctrl.submit = function(){
            bots.create($scope.entity)
                .then(function(response){
                    messages.success('New bot created successfully');
                    $state.go('app.bots.list');
                })
        }
    }

})();