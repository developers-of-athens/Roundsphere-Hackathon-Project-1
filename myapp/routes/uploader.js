var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('uploader', { uploader: 'File Upload' });
});

router.post('/pdfupload', function(req,res){
  console.log(req.body);
  res.send('File uploaded.');
})

module.exports = router;
