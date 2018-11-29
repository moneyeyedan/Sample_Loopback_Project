'use strict';

module.exports = function(Storedb) {
Storedb.remoteMethod('store',{
    http:{path:'/store/update'}
})
};
