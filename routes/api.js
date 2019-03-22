const path = require('path');
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;
var db_url = "mongodb://localhost:27017/";
var csp_evaluator = require("../controller/csp_evaluator.js")

var nonce;

router.get('/', function(req, res, next) {
	res.send("HELLO.");
});

router.get('/csp', function(req, res, next) {
	console.log("Getting csp of : "  + req.query.url);
	var url = req.query.url;
	
	if (url.endsWith("index.php"))
    url = url.substring(0, url.length - 9);
	if (url.endsWith("index.html"))
	    url =  url.substring(0, url.length - 10);

	MongoClient.connect(db_url, {useNewUrlParser: true}, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("csp").findOne({url: url})
	  .then((result)=>{	
	  		if (result){
	  			nonce = crypto.randomBytes(16).toString('base64');
	  			console.log("returning: " + result.csp.replace("{replaceme}", nonce))
	  			res.send("@@@" + result.csp.replace("{replaceme}", nonce));
	  		} else {
	  			res.send("@@@null");
	  		}
	  		db.close();
	  })
	});
});

router.get('/nonce', function(req, res, next) {
	res.send("@@@" + nonce);
});

router.get('/save_csp', function(req, res, next) {
	var data = {url: req.query.url, csp: req.query.policy};
	console.log("parameter url : "  + data.url);
	console.log("parameter policy : "  + data.csp);

	write_to_db(data);

	res.send("Done.");
});

router.get('/evaluator', function(req, res, next) {
	var csp = req.query.csp;
	console.log("parameter csp is : "  + csp);
	if (typeof csp == "undefined") 
		res.send("Warning: pass the policy in correct format: <br> .../api/evaluator?csp=YOUR-POLICY");
	else{
		console.log(csp)
		var findings = csp_evaluator.do_evaluation(csp);
		// console.log(findings)

		res.send(findings);
	}
});

function write_to_db(data){
	MongoClient.connect(db_url, {useNewUrlParser: true}, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  
	  dbo.collection("csp").findOne({url: data.url})
	  .then((res)=>{
	  		if (res) {
	  			if (res.csp != data.csp){ //do update
	  				dbo.collection("csp").updateOne({url: res.url}, 
	  							{$set:{csp: data.csp}}, function(err, res) {
					    if (err) throw err;
					    console.log("data updated.\n");
					    db.close();
					  });
	  			} else console.log("data exists, no change.\n");
	  		}
	  		else { // do insert
	  			dbo.collection("csp").insertOne(data, function(err, res) {
				    if (err) throw err;
				    console.log("data saved.\n"); 
		  		});
	  		}
	  		db.close()
	  });
	});
}
 
module.exports = router;

