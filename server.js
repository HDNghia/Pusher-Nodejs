var express = require('express');
var path = require('path');
const cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1570834",
    key: "1030ed55b990ceaff855",
    secret: "948bbfb4254a4e3cd4a3",
    cluster: "ap1"
    // encrypted: true
});

app.post('/comment', function (req, res) {
    console.log(req.body);
    var newComment = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    }
    // console.log("check pusher req: ", newComment)
    pusher.trigger('flash-comments', 'new_comment', newComment);
    res.json({ created: true });
});

module.exports = app;

app.listen(9000, function () {
    console.log('Example app listening on port 9000!')
});