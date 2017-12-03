"USE STRICT";
var app = angular.module('app', []);
app.controller('controller', function ($scope, $http, $httpParamSerializer, $window, $rootScope, $timeout, $filter) {

    moment.locale('pt-br');

    var baseUrl = 'http://localhost:3000';

    $scope.init = function() {
        $scope.ip = "localhost";
        $scope.retornoList = [];
    
        $scope.memorySelectedOptions = [];
        $scope.taskSelectedOptions = [];
        $scope.diskSelectedOptions = [];
        $scope.cpuSelectedOptions = [];

        $scope.memoryOptions = [{
            label: 'Total de RAM',
            fn: $scope.pushTotalRam
        }, {
            label: 'Total de RAM usada',
            fn: $scope.pushUsedRam
        }, {
            label: 'Total de RAM disponível',
            fn: $scope.pushFreeRam
        }];

        $scope.diskOptions = [{
            label: 'Espaço livre',
            fn: $scope.pushFreeDisk
        }, {
            label: 'Espaço usado',
            fn: $scope.pushUsedDisk
        }, {
            label: 'Porcentagem de inodes usados',
            fn: $scope.pushInodesDisk
        }];
    }

    $scope.bytesToSize = function (size) {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    $scope.limparRetornos = function() {
        $scope.retornoList = [];
    }

    $scope.pushFreeDisk = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getUsage/' + $scope.ip
        }).then(function (retorno) {
            $scope.retornoList.push({
                time: moment().format('LTS'),
                content: ' Total de RAM usada: ' + $scope.bytesToSize(retorno.data.value * 1024)
            })
        }, function (erro) {
        });
    }

    $scope.pushUsedDisk = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getUsage/' + $scope.ip
        }).then(function (retorno) {
            $scope.retornoList.push({
                time: moment().format('LTS'),
                content: ' Total de RAM usada: ' + $scope.bytesToSize(retorno.data.value * 1024)
            })
        }, function (erro) {
        });
    }

    $scope.pushInodesDisk = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getUsage/' + $scope.ip
        }).then(function (retorno) {
            $scope.retornoList.push({
                time: moment().format('LTS'),
                content: ' Total de RAM usada: ' + $scope.bytesToSize(retorno.data.value * 1024)
            })
        }, function (erro) {
        });
    }

    $scope.pushUsedRam = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getUsage/' + $scope.ip
        }).then(function (retorno) {
            $scope.retornoList.push({
                time: moment().format('LTS'),
                content: ' Total de RAM usada: ' + $scope.bytesToSize(retorno.data.value * 1024)
            })
        }, function (erro) {
        });
    }

    $scope.pushTotalRam = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getTotal/' + $scope.ip
        }).then(function (retorno) {
            $scope.retornoList.push({
                time: moment().format('LTS'),
                content: ' Total de RAM: ' + $scope.bytesToSize(retorno.data.value * 1024)
            })
        }, function (erro) {
        });
    }

    $scope.pushFreeRam = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getFree/' + $scope.ip
        }).then(function (retorno) {
            $scope.retornoList.push({
                time: moment().format('LTS'),
                content: ' Total de RAM disponível: ' + $scope.bytesToSize(retorno.data.value * 1024)
            })
        }, function (erro) {
        });
    }

    $scope.searchMibs = function() {
        angular.forEach($scope.memorySelectedOptions, function (value) {
            $scope.memoryOptions[parseInt(value)].fn && $scope.memoryOptions[parseInt(value)].fn();
        });
        angular.forEach($scope.diskSelectedOptions, function (value) {
            $scope.diskOptions[parseInt(value)].fn && $scope.diskOptions[parseInt(value)].fn();
        });
    }

});
