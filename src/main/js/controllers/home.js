(function(){
    angular.module('tofi')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = [];
    function homeCtrl(){

        console.log('home! sweet home!');
    }

})();