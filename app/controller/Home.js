var express = require('express'),
	path	= require('path');

var router = express.Router();

router.get('/', function(req, res, next) {
	
	





	//never delete this line
	next();
})


//never delete this line, this line need it to call html file with the same name of the controller
router.all('*',(req, res, next)=>{
	res.render(/.+(?=\.\w?)/.exec(path.basename(__filename))[0].toLowerCase())
})

module.exports = router;