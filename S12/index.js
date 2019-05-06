var express = require('express')
var app = express();
var path = require('path');
var Pusher = require('pusher');
var bodyParser = require('body-parser');
var pusher = new Pusher({
    appId: '501582'
    , key: '467957bb89d9c373c18f'
    , secret: '5ef08aa06d8b5fbb2fac'
    , cluster: 'us2'
    , encrypted: true
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/comment', function (req, res) {
    console.log(req.body);
    var newMessage = {
        name: req.body.name
        , message: req.body.message
    }
    pusher.trigger('my-channel', 'my-event', newMessage);
    res.json({
        created: true
    });
})
app.listen(3000)