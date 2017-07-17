angular.module("messenger", [])

.controller("ChatCtrl", function($scope, $timeout) {

    var answer = function() {

        let getPhrase = function() {
            return Math.floor(Math.random() * (3 - 0)) + 0
        }
        let index = getPhrase()
        let text = $scope.phrases[index];
        let message = {
            author: "John Doe",
            date: new Date,
            text: text,
            class: "opponent"
        };
        $scope.messages.push(message);

    }



    $scope.phrases = [
        'Hi', 'How are you?', 'What is the purpose of your visit to the United States?'
    ]

    $scope.messages = []


    $scope.sendMessage = function() {
        if ($scope.text) {
            let sendData = {
                author: "Me",
                date: new Date,
                text: $scope.text,
                class: "my-message"
            }
            $scope.messages.push(sendData);
            $scope.text = '';
            $timeout(answer, 2000)
        }
    }

    $scope.popUp = function() {
        $scope.confirm = true;
    }

    $scope.export = () => {
        $scope.exports = true;
    }

    $scope.deleteMessage = function() {
        $scope.messages.splice(this.$index, 1);
    }

    $scope.deleteAll = function(param) {
        if (param) {
            $scope.messages = []
            $scope.confirm = false;
        } else {
            $scope.confirm = false;
        }

    }


});