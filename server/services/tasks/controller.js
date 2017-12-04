var snmp = require('snmp-native');

const getTotal = (req, res) => {

    var ip = req.params.ip;

    var session = new snmp.Session({ host: ip, community: 'public' });
    session.getSubtree({ oid: [1,3,6,1,4,1,2021,1,5] }, function (error, varbinds) {
        if (error) {
            res.send( error );   
        } else {
            
            res.send(varbinds);
        }
    });
}

module.exports = {
    getTotal,
};