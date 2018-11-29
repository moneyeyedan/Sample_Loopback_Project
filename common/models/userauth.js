'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = function(Userauth) {
    Userauth.observe('before save', function updateTimestamp(ctx, next) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(ctx.instance.password, salt, function(err, hash) {
                console.log(hash)
                ctx.instance.password = hash;
                next();
            });
        });
        
    });
    // Userauth.observe('after save', function updateTimestamp(ctx, next) {
    //     console.log(ctx.instance.id)
    //     const userDetails=Userauth.app.models.Userdetail;
    //     next();
    //     userDetails.create({userauthId:ctx.instance.id},function(err,res){
    //         console.log(res);
    //     });
        
    // });
    Userauth.observe('after save', function(ctx,next) {
        const userdetail = Userauth.app.models.Userdetail;
        const store= Userauth.app.models.Storedb;
        console.log(ctx.instance.id);       
        userdetail.create({
          userauthId: ctx.instance.id
        }, (err, instance) => {
            if(err){
                console.log(err);
            }
          console.log(instance);
          
        });
        store.create({userauthId:ctx.instance.id},(err,instan)=>{
            if(err){
                console.log(err);
            }
            console.log(instan);
        })
        next();
    });
    Userauth.login = function(data,cb){
        Userauth.find({where:{email:data.email}},(err,res)=>{
         console.log(res);
             if(res.length>0){
                bcrypt.compare(data.password,res[0].password).then(resp=>{
                    if(resp){
                       let response={
                           'status':true,
                           'data':res[0],
                           'msg':'login success'
                       }
                       cb(null,response)
                    }else{
                       let response={
                           'status':false,
                           'msg':'password invalid'
                       }
                       cb(null,response);
                    }
                    
                })
             }else{
                let response={
                    'status':false,
                    'msg':'email is invalid'
                }
                 cb(null,response)
             }
             
         
        })
    }
    Userauth.remoteMethod('login',{
        http:{path:"/login",verb:'post'},
        accepts:{arg:'data',type:'object',http:{source:'body'}},
        description:'login user',
        returns: {arg:'data',type:'string'}
    })
};
