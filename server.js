var snmp = require('snmp-native');
const express = require('express');

// var snmp = require('snmp-native');
const { memoryRouter } = require('./server/services/memory/router');

// var session = new snmp.Session();
var session = new snmp.Session({ host: 'localhost', community: 'public' });

session.get({ oid: [1,3,6,1,4,1,2021,4,11,0] }, function (error, varbinds) {
    if (error) {
        console.log('Fail :(');
    } else {
        console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
    }
});
////////////
// http://www.oid-info.com/


var app = express();

app.use(express.static(__dirname + '/public'));


app.use('/memory', memoryRouter);


app.listen(3000, () => {
    console.log(`Server listen on port 3000`);
});

