"USE STRICT";
var app = angular.module('app', []);
app.controller('controller', function ($scope, $http, $httpParamSerializer, $window, $rootScope, $timeout, $filter) {

    moment.locale('pt-br');

    var baseUrl = 'http://localhost:3000';

    $scope.init = function () {
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
            label: 'Espaço total',
            fn: $scope.pusTotalDisk
        }, {
            label: 'Porcentagem de inodes utilizado',
            fn: $scope.pushInodesDisk
        }];

        $scope.tasksOptions = [{
            label: 'Tabela de processos',
            fn: $scope.pushFreeDisk
        }, {
            label: 'Quantidade de processos',
            fn: $scope.pushTotalTasks
        }];

        $scope.cpuOptions = [{
            label: 'Trocas de contexto(Contador)',
            fn: $scope.pushContextCounterTasks
        }];
    }

    $scope.bytesToSize = function (size) {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    $scope.limparRetornos = function () {
        $scope.retornoList = [];
    }


    $scope.pushContextCounterTasks = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/cpu/getContextCounter/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data.value) {
                $scope.retornoList.push({
                    time: moment().format('LTS'),
                    content: ' Trocas de contexto: ' + retorno.data.value + " (Counter32)"
                })
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Espaço livre: Erro nenhuma resposta de  " + $scope.ip
                });
            }
        }, function (erro) {
        });
    }

    $scope.pushFreeDisk = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/disk/getFree/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data instanceof Array) {
                var espacoLivre = 0;
                angular.forEach(retorno.data, function (retornoOid) {
                    espacoLivre += retornoOid.value;
                });

                var obj = {
                    time: moment().format('LTS'),
                    content: ' Espaço livre: ' + $scope.bytesToSize(espacoLivre * 1024)
                }

                $http({
                    method: 'GET',
                    url: baseUrl + '/disk/getUsagePercent/' + $scope.ip
                }).then(function (retorno) {
                    var porcentagemEspacoLivre = 0;
                    angular.forEach(retorno.data, function (valor) {
                        porcentagemEspacoLivre += valor.value;
                    })
                    obj.content += " | " + (100 - porcentagemEspacoLivre) + " %"
                    $scope.retornoList.push(obj)
                }, function (erro) {
                    $scope.retornoList.push(obj)
                });
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Espaço livre: Erro nenhuma resposta de  " + $scope.ip
                });
            }
        }, function (erro) {
        });
    }

    $scope.pushUsedDisk = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/disk/getUsage/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data instanceof Array) {
                var espacoUsado = 0;
                angular.forEach(retorno.data, function (retornoOid) {
                    espacoUsado += retornoOid.value;
                });

                var obj = {
                    time: moment().format('LTS'),
                    content: ' Espaço usado: ' + $scope.bytesToSize(espacoUsado * 1024)
                }

                $http({
                    method: 'GET',
                    url: baseUrl + '/disk/getUsagePercent/' + $scope.ip
                }).then(function (retorno) {
                    var porcentagemEspacoUsado = 0;
                    angular.forEach(retorno.data, function (valor) {
                        porcentagemEspacoUsado += valor.value;
                    })
                    obj.content += " | " + porcentagemEspacoUsado + " %"
                    $scope.retornoList.push(obj)
                }, function (erro) {
                    $scope.retornoList.push(obj)
                });
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Espaço usado: Erro nenhuma resposta de  " + $scope.ip
                });
            }
        }, function (erro) {
            $scope.retornoList.push(obj)
        });
    }

    $scope.pusTotalDisk = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/disk/getTotal/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data instanceof Array) {
                var espacoTotal = 0;
                angular.forEach(retorno.data, function (retornoOid) {
                    espacoTotal += retornoOid.value;
                });
                $scope.retornoList.push({
                    time: moment().format('LTS'),
                    content: ' Espaço total: ' + $scope.bytesToSize(espacoTotal * 1024)
                })
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Espaço total: Erro nenhuma resposta de  " + $scope.ip
                });
            }
        }, function (erro) {
        });
    }

    $scope.pushInodesDisk = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/disk/getInodesUsedPercent/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data.value !== undefined) {
                $scope.retornoList.push({
                    time: moment().format('LTS'),
                    content: ' Porcentagem de inodes utilizado: ' + retorno.data.value + "%"
                })
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Porcentagem de inodes utilizado: Erro nenhuma resposta de " + $scope.ip
                });
            }
        }, function (erro) {
        });
    }

    $scope.pushUsedRam = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getUsage/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data.value) {
                $scope.retornoList.push({
                    time: moment().format('LTS'),
                    content: ' Total de RAM usada: ' + $scope.bytesToSize(retorno.data.value * 1024)
                })
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Total de RAM usada: Erro, nenhuma resposta de " + $scope.ip
                });
            }
        }, function (erro) {
        });
    }

    $scope.pushTotalRam = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getTotal/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data.value) {
                $scope.retornoList.push({
                    time: moment().format('LTS'),
                    content: ' Total de RAM: ' + $scope.bytesToSize(retorno.data.value * 1024)
                })
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Total de RAM: Erro nenhuma resposta de " + $scope.ip
                });
            }
        }, function (erro) {
        });
    }

    $scope.pushFreeRam = function () {
        $http({
            method: 'GET',
            url: baseUrl + '/memory/getFree/' + $scope.ip
        }).then(function (retorno) {
            if (retorno.data.value) {
                $scope.retornoList.push({
                    time: moment().format('LTS'),
                    content: ' Total de RAM disponível: ' + $scope.bytesToSize(retorno.data.value * 1024)
                })
            } else {
                $scope.retornoList.push({
                    isError: true,
                    time: moment().format('LTS'),
                    content: " Total de RAM disponível : Erro, nenhuma resposta de " + $scope.ip
                });
            }
        }, function (erro) {
        });
    }

    $scope.searchMibs = function () {
        angular.forEach($scope.memorySelectedOptions, function (value) {
            value !== 'Nenhum' && $scope.memoryOptions[parseInt(value)].fn && $scope.memoryOptions[parseInt(value)].fn();
        });
        angular.forEach($scope.diskSelectedOptions, function (value) {
            value !== 'Nenhum' && $scope.diskOptions[parseInt(value)].fn && $scope.diskOptions[parseInt(value)].fn();
        });
        angular.forEach($scope.taskSelectedOptions, function (value) {
            value !== 'Nenhum' && $scope.tasksOptions[parseInt(value)].fn && $scope.tasksOptions[parseInt(value)].fn();
        });
        angular.forEach($scope.cpuSelectedOptions, function (value) {
            value !== 'Nenhum' && $scope.cpuOptions[parseInt(value)].fn && $scope.cpuOptions[parseInt(value)].fn();
        });
    }

});
