"USE STRICT";
var app = angular.module('app', []);
app.controller('controller', function ($scope, $http, $httpParamSerializer, $window, $rootScope, $timeout, $filter) {

    moment.locale('pt-br');

    console.log('funcionando funcionando funcionando funcionando funcionando funcionando funcionando funcionando funcionando funcionando funcionando ')

    var baseUrl = 'http://localhost:3000';

    $scope.ip = "localhost";

    $scope.retornoList = [];

    $scope.getUsedRam = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getUsage/' + $scope.ip
        }).then(function (retorno) {
            console.log('Retorno', retorno)
            $scope.retornoList.push({
                time: moment().format('LTS'),
                content: 'Total de RAM usada: ' + retorno.data.value + " KB"
            })
        }, function (erro) {
        });
    }

    $scope.buscarMibs = function() {
        
    }

});
