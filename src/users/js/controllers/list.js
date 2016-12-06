(function(){
    angular.module('tofi.users')
        .controller('userListCtrl', listCtrl);

    listCtrl.$inject = [];
    function listCtrl(){
        console.log('%cololo', 'color: blue; font-size: 17px');
    }

})();