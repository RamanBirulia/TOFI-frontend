(function () {
    angular
        .module('tofi')
        .factory('messages', messagesFactory);

    messagesFactory.$inject = ['$timeout'];
    function messagesFactory($timeout) {

        var allMessages = {
            danger: [],
            success: [],
            info: [],
            warning: []
        };

        return {
            danger: danger,
            success: success,
            info: info,
            warning: warning,
            getAllMessageInfo: get,
            remove: remove
        };

        function get(){
            return allMessages;
        }

        function remove(type, errorMessage){
            var index = allMessages[type].indexOf(errorMessage);
                if (index > -1){
                    allMessages[type].splice(index, 1);
                }
        }


        function danger(message, errorObject) {
            showMessage('danger', message, errorObject);
        }
        function success(message) {
            showMessage('success', message);
        }
        function info(message) {
            showMessage('info', message);
        }
        function warning(message) {
            showMessage('warning', message);
        }

        function showMessage(type, message, errorObject){

            var errorMessage = {
                title:message,
                body: []
            };
            if (errorObject){
                Object.keys(errorObject).map(function(objectKey, index) {
                    errorMessage.body.push(errorObject[objectKey]);
                });
            }
            allMessages[type].push(errorMessage);
            $timeout(function(errorMessage){
               remove(type, errorMessage);
            }, 3000, true, errorMessage)
        }
    }
})();