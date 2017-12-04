var snmp = require('snmp-native');

const getUsage = (req, res) => {

    var ip = req.params.ip;
    var session = new snmp.Session({ host: ip, community: 'public' });
    session.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 2021, 9, 1, 8] }, function (error, varbinds) {
        if (error) {
            res.send(error);
        } else {
            res.send(varbinds);
        }
    });
}

const getFree = (req, res) => {
    var ip = req.params.ip;
    var session = new snmp.Session({ host: ip, community: 'public' });
    session.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 2021, 9, 1, 7] }, function (error, varbinds) {
        if (error) {
            res.send(error);
        } else {
            res.send(varbinds);
        }
    });
}

const getTotal = (req, res) => {
    var ip = req.params.ip;
    var session = new snmp.Session({ host: ip, community: 'public' });
    session.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 2021, 9, 1, 6] }, function (error, varbinds) {
        if (error) {
            res.send(error);
        } else {
            res.send(varbinds);
        }
    });
}

const getUsagePercent = (req, res) => {
    var ip = req.params.ip;
    var session = new snmp.Session({ host: ip, community: 'public' });
    session.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 2021, 9, 1, 9] }, function (error, varbinds) {
        if (error) {
            res.send(error);
        } else {
            res.send(varbinds);
        }
    });
}


const getInodesUsedPercent = (req, res) => {

    var ip = req.params.ip;
    var session = new snmp.Session({ host: ip, community: 'public' });
    session.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 2021, 9, 1, 10] }, function (error, varbinds) {
        if (error) {
            res.send(error);
        } else {
            res.send(varbinds[0]);
        }
    });
}



module.exports = {
    getUsage,
    getFree,
    getInodesUsedPercent,
    getTotal,
    getUsagePercent
};