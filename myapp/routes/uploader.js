var express = require('express');
var multer  = require('multer');
var nodeUtil = require('util');
var underscore = require('underscore');
var vm = require('vm');
var fs = require('fs');
var PDFParser = require("pdf2json");
var router  = express.Router();
var done    = false
var jsonFiles = new Array();
var savedFiles = new Array();


// middleware specific to this router
router.use(multer({
  dest: './uploads/',
  limits: {
    files: 1
  },
 rename: function (fieldname, filename) {
    return encodeURIComponent(filename) + "_" + Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  savedFiles.push(file.fieldname);

  var pdfParser = new PDFParser();
  var pdfFilePath = "./" + file.fieldname;
  pdfParser.loadPDF(pdfFilePath);
  /*fs.readFile(pdfFilePath, function (err, pdfBuffer) {
      if (!err) {
        pdfParser.parseBuffer(pdfBuffer);
      }
  });*/
  done=true;
},
onParseEnd: function (req, next) {
  console.log('Form parsing completed at: ', new Date());

  // usage example: custom body parse
  //req.body = require('qs').parse(req.body);
  //console.log(req.body);

  // call the next middleware
  next();
},
onError: function (error, next) {
  console.log(error)
  next(error)
}
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('uploader', { uploader: 'File Upload' });
});

router.post('/pdfupload', function(req,res){
  console.log(req.body);
  var files = req.files.file;
  console.log("file posted");
  if (done === true){

    res.sendStatus(200);
  }
  if (Array.isArray(files)) {
    // response with multiple files (old form may send multiple files)
    console.log("Got " + files.length + " files");
  }
});

module.exports = router;
