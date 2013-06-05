var express = require('express')
  , http = require('http')
  , Pusher = require('pusher')
  , creds = require('./creds')
  , app = express();

app.configure(function(){
  app.use(express.bodyParser());
});

var pusher = new Pusher({
  appId: creds.APP_ID,
  key: creds.KEY,
  secret: creds.SECRET
});

app.post('/sms', function(req, res){
  pusher.trigger('test_channel', 'my_event', {
    "body": req.body.Body, "from": req.body.From });
  res.send('<Response></Response>');
});

http.createServer(app).listen(process.env.PORT || 3000);
