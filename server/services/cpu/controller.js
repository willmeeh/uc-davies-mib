var snmp = require('snmp-native');

const getContextCounter = (req, res) => {

    var ip = req.params.ip;

    var session = new snmp.Session({ host: ip, community: 'public' });
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021, 11, 60, 0] }, function (error, varbinds) {
        if (error) {
            res.send(error);
        } else {
            res.send(varbinds[0]);
        }
    });
}

module.exports = {
    getContextCounter,
};