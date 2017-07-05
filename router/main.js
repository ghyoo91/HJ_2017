require('date-utils');

module.exports = function(app, device){

  //just for git push test
  app.get('/test', function(req, res){
    var ret = "testsample23";
    res.json(ret);
    var t = ret;
  });

  app.get('/', function(req, res){
    var session = req.session;

    res.render('index', {
      title: "Index page",
      length: 5,
      name: session.name,
      username: session.username
    });
  });

  app.get('/devices', function(req, res){
    device.find({},{ "user.password" : false }, function(err, result){
      if(err){
        return res.status(500).send({ error : "Database Connection Fail" });
      }
      res.json(result);
    });
  });

  app.get('/amimaster/:userNo', function(req, res){
    if(req.params.userNo === "nt11253"){
      res.json({ master : "Yes" });
    }
    else{
      res.json({ master : "No" });
    }
  });

  app.get('/devices/:userNo', function(req, res){
    device.find({
      user:{
        $elemMatch:{
          "userNo" : req.params.userNo
        } } },
        { "user" :{ $elemMatch:{ "userNo" : req.params.userNo } }, "user.password" : false}, function(err, result){
          if(err){
            return res.status(500).send({ error : "Database Connection Fail" });
          }
          if(result.length === 0){
            return res.status(404).send({ error : "userNo not found" });
          }
          res.json(result);
        });
  });

  app.get('/login/:userNo/:password', function(req, res){
    device.find({
      user:{
        $elemMatch:{
          "userNo" : req.params.userNo,
          "password" : req.params.password
        } } },
        { "userNo" : true, "username" : true }, function(err, result){
          if(err){
            return res.status(500).send({ error : "Database Connection Fail" });
          }
          if(result.length === 0){
            return res.status(404).send({ error : "userNo not found / wrong password" });
          }
          res.json(result);
        });
  });

  app.get('/devices/check/:deviceNo', function(req, res){
    device.find({
      "deviceNo" : req.params.deviceNo
    }, function(err, result){
      if(err){
        return res.status(500).send({ error : "Database Connection Fail" });
      }
      //Check DB Validity
      if(result.length === 0){
        res.json({ valid : "false" });
      }
      else{
        res.json({ valid : "true" });
      }
    });
  });

  app.put('/rent', function(req, res){
    //check req validity
    if(!(req.body.userNo && req.body.deviceNo)){
      var result = {};
      result.success= 0;
      result.error = "invalid request";
      res.json(result);
      return;
    }

    device.findOne({
      user:{
        $elemMatch:{
          "userNo" : req.body.userNo
        } } }, function(err, next){
          if(err){
            return res.status(500).json({ error: "Database Connection Fail" });
          }
          var newDate = new Date();
          newDate = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
          //check admin
          if(req.body.userNo === "nt11253"){
            device.update({
              "deviceNo" : req.body.deviceNo
            },{ $set:{
                rent : 0,
                regDate : newDate,
                user : next.user
              } }, function(err, output){
                if(!output.n){
                  return res.status(404).json({ error: "userNo not found / deviceNo not found" });
                }
                res.json({ "message" : "information updated" });
              });
          }
          else{
            device.update({
              "deviceNo" : req.body.deviceNo
            },{ $set:{
                rent : 1,
                regDate : newDate,
                user: next.user
              } }, function(err, output){
                if(!output.n){
                  return res.status(404).json({ error: "userNo not found / deviceNo not found" });
                }
                res.json({ "message" : "information updated" });
              });
          }
      }); //findOne end
  }); //put end
}; //router end


/*
insert >> save
select >> find
update >> update
delete >> remove

show dbs
db
show collections

http 실패, 성공 코드 추가할것.
200(성공)과 500(실패)만 사용하지 말것.

get/post 터널링 조심(get은 get만, post는 post만)
http://myweb/users?method=update&id=terry
////////////////////
login logout 부분

app.get('/login/:username/:password', function(req, res){
    var sess;
    sess = req.session;

    fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
        var users = JSON.parse(data);
        var username = req.params.username;
        var password = req.params.password;
        var result = {};
        if(!users[username]){
            // USERNAME NOT FOUND
            result["success"] = 0;
            result["error"] = "not found";
            res.json(result);
            return;
        }

        if(users[username]["password"] == password){
            result["success"] = 1;
            sess.username = username;
            sess.name = users[username]["name"];
            res.json(result);

        }else{
            result["success"] = 0;
            result["error"] = "incorrect";
            res.json(result);
        }
    })
});

app.get('/logout', function(req, res){
sess = req.session;
if(sess.username){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
}else{
    res.redirect('/');
}
});

////////////////////////////////////////////////////////////////
상세 api부분
     app.post('/addUser/:username', function(req, res){
        var result = {  };
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if(!(req.body.password && req.body.name)){
          result.success= 0;
          result.error = "invalid request";
          res.json(result);
          return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
          var users = JSON.parse(data);
          //ducplication check
          if(users[username]){
            result.success = 0;
            result.error = "duplicate";
            res.json(result);
            return;
          }
          // ADD TO DATA
          users[username] = req.body;

          // SAVE DATA
          fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data){
            result = {"success": 1};
            res.json(result);
          });
        });//readFile end
      });//post end

      app.delete('/deleteUser/:username', function(req, res){
        var result = {};
        var username = req.params.username;

        //LOAD DATA
        fs.readFile( __dirname+ "/../data/user.json", 'utf8',  function(err, data){
          var users = JSON.parse(data);

          //NOT FOUND
          if(!users[username]){
            result.success = 0;
            result.error = "NOT FOUND";
            res.json(result);
            return;
          }

          delete users[username];

          fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data){
            result = {"success": 1};
            res.json(result);
            return;
          });
        });
      });
};*/
