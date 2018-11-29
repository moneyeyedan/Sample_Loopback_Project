'use strict';

module.exports = function(Userdetail) {

    Userdetail.greet = function(msg, cb) {
        console.log(msg);
        Userdetail.find({where:{userauthId:msg.userauthId}},(err,data)=>{
            console.log(data);
            Userdetail.updateOrCreate({id:data[0].id,name:msg.name,age:msg.age,address:msg.address,mobileno:msg.mobileno,state:msg.state},(err,res)=>{
                console.log(res);
                var doc=JSON.stringify(res);
                cb(null, 'Greetings... ' + doc);
            })
                
            
        });
    }
    
      Userdetail.remoteMethod('greet', {
          http:{path:"/upt",verb:'post'},
            accepts: {arg: 'data', type: 'object',http:{source:'body'},required:true},
            description:'update user api',
            returns: {arg: 'greeting', type: 'json'}
      });

      
  

};
