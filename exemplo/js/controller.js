var app = angular.module('app', ['typeahead']);

app.controller('indexController', function($scope){

    $scope.items = null;
    $scope.model = "";

    $scope.name = ''; // This will hold the selected item
    $scope.onItemSelected = function() { // this gets executed when an item is selected
        console.log('selected=' + $scope.name);
    };

});