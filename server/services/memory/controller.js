var snmp = require('snmp-native');

const getUsage = (req, res) => {
    var ip = req.params.ip;

    var session = new snmp.Session({ host: ip, community: 'public' });
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021, 4, 6, 0] }, function (error, varbinds) {
        if (error) {
            res.send('Erro ao obter memoria utilizada');
        } else {
            res.send(varbinds[0]);
        }
    });
}

const getTotal = (req, res) => {
    var ip = req.params.ip;

    var session = new snmp.Session({ host: ip, community: 'public' });
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021, 4, 5, 0] }, function (error, varbinds) {
        if (error) {
            res.send('Erro ao obter memoria utilizada');
        } else {
            res.send(varbinds[0]);
        }
    });
}

const getFree = (req, res) => {
    var ip = req.params.ip;

    var session = new snmp.Session({ host: ip, community: 'public' });
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021, 4, 11, 0] }, function (error, varbinds) {
        if (error) {
            res.send('Erro ao obter memoria utilizada');
        } else {
            res.send(varbinds[0]);
        }
    });
}

module.exports = {
    getUsage,
    getTotal,
    getFree
};