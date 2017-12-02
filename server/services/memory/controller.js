var snmp = require('snmp-native');
var snmp2 = require("net-snmp");


const getUsage = (req, res) => {

    console.log(req.params)
    var ip = req.params.ip;


    var session = new snmp.Session({ host: ip, community: 'public' });
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021, 4, 6, 0] }, function (error, varbinds) {
        if (error) {
            res.send('Erro ao obter memoria utilizada');
        } else {
            console.log('\asdawdasd', varbinds[0])
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
            res.send( varbinds[0] );
        }
    });

    // var oids = ["1.3.6.1.4.1.2021.4.6.0"];
    // var session = snmp2.createSession (ip, "public");
    // session.get (oids, function (error, varbinds) {
    //     if (error) {
    //         console.error (error);
    //     } else {
    //         for (var i = 0; i < varbinds.length; i++)
    //             if (snmp2.isVarbindError (varbinds[i]))
    //                 console.error (snmp2.varbindError (varbinds[i]))
    //             else {
    //                 console.log (varbinds[i].oid + " = " + varbinds[i].value);
    //                 console.log ("asdwasd = " + JSON.stringify(varbinds[i], undefined, 4));
    //                 res.send( {teste: varbinds[i].oid + " = " + varbinds[i].value, 'obj': varbinds[i]} )
    //             }
    //     }
    // });


}

module.exports = {
    getUsage,
};