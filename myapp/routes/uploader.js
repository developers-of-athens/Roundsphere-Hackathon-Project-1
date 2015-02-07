var express = require('express');
var multer  = require('multer');
var router  = express.Router();
var done    = false;

// middleware specific to this router
router.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('uploader', { uploader: 'File Upload' });
});

router.post('/pdfupload', function(req,res){
  console.log(req.body);
  var files = req.files.file;
  if (Array.isArray(files)) {
    // response with multiple files (old form may send multiple files)
    console.log("Got " + files.length + " files");
  }
  else {
    // dropzone will send multiple requests per default
    console.log("Got one file");
  }
  res.sendStatus(200);
})

module.exports = router;
