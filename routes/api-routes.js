
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

//encrypt function from crypto
function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}



// Requiring our models for syncing
var db = require("../models");







// Routes =============================================================


// Syncing our sequelize models and then starting our express app
db.sequelize.sync()

//==================================================
//Get route to pull the information for all colleges
//==================================================
module.exports = function(app) {
//sql query for search
app.post("/api/college", function(req, res) {

	var state = req.body.state
	var admit = req.body.admit
	var tuition = req.body.tuition


	db.College.findAll({
		where: {
			State: {
				$like: state
			},
			Admission: {
				$between: admit
			},
			Tuition_In: {
				$lte: tuition
			}},
		limit: 20})
	.then(function(result) {
		return res.json(result);
	});


});

//check if user already exist -- sends response
app.post("/user/create", function(req, res) {

	db.Login.findAll({
		where: {
			name: {
				$like: req.body.name
			}
		}
	}).then(function(results){
		if (results.length > 0) {
			return res.json({msg: "user already exist"})
	}
	else {
		db.Login.create({
			name: req.body.name,
			hashPw: encrypt(req.body.password)
		}).then(function(data) {
			return res.json({msg: "user created",
		id: data.id,
	name: data.name})
		})
	}

	})
});



//pull hashed pw from db by username -- if it matches encrypted login pw return positive response
app.post("/user/login", function(req, res) {

	db.Login.findAll({
		where: {
			name: {
				$like: req.body.name
			}
		}
	}).then(function(results){
		attempt = encrypt(req.body.password)
		unhash = results[0].hashPw

		if (attempt === unhash) {
			return res.json({id: results[0].id,
					name: results[0].name
		})
	}
	else {
		return res.json({msg: "bad pw/username"})
	}

})
});

//send fav college update -- only if user doesnt already have 5 faves
app.post("/myCollege/add", function(req,res) {
	db.myCollege.findAll({
		where: {
			user_id: req.body.user_id
		}
		}).then(function(results){
			if (results.length === 5){
				return res.json({msg:"list is full"})
			} 
			else {
				db.myCollege.create({
					user_id: req.body.user_id,
					college_id: req.body.college_id
				}).then(function(data){
					return res.json({data})
				})
			}
	
})

})

//retrieve fav colleges of user by user id
app.get("/myCollege/:id",function(req,res)  {
	userId = req.params.id;
	colleges = [];

	db.myCollege.findAll({
		where: {
			user_id: userId
		}
	}).then(function(data){
		for (i in data) {
			colleges.push(data[i].college_id)
		}
		db.College.findAll({
			where: {
				id: {
					$in: colleges
					
				}
				}}).then(function(data){
				return res.json(data)
			})
	
})

})



}
















