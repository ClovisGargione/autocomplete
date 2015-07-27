var typeAhead = angular.module('typeahead', []);

typeAhead.service('typeAheadService', function($http) {
    this.busca = function(urlBusca){
        return $http.get(urlBusca);
    };
});

typeAhead.controller('typeAheadController', function($scope, typeAheadService){

 $scope.disparaBuscaRapida = function(selected){
        typeAheadService.busca($scope.url)
            .success(function(data){
                $scope.selected = selected;
                $scope.items = data;
            })
            .error(function(data, status){

            });
    };

    $scope.disparaBusca = function($event){
        if($event.which != 38 && $event.which != 40){
            if($event.which == 13){
                $scope.disparaBuscaRapida(true);

            }else{
                $scope.disparaBuscaRapida(false);
            };
        }
    };

});


typeAhead.directive('autocomplete', function($timeout){
    return{
      restrict:"AEC",
      scope:{
          url: "@",
          title: "@",
          subtitle: "@",
          image:"@",
          model:"=",
          items:"=",
          onSelect:"&"
      },
      link: function(scope, elem, attrs) {
          scope.current = 0;
          scope.selected = true; // hides the list initially

          scope.isCurrent = function(index) {
              return scope.current == index;
          };
          scope.setCurrent = function(index) {
              scope.current = index;
          };

          scope.handleSelection = function(selectedItem) {
              scope.model = selectedItem;
              scope.current = 0;
              scope.selected = true;
              $timeout(function() {
                  scope.onSelect();
              }, 200);
          };

      },
      templateUrl: 'libs/typeahead/template/buscarapida.html',
      controller:'typeAheadController'
    };
});

