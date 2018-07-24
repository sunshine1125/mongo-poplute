var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/table');

var teamA = new Schema({
    teamId: Number
});

var teamB = new Schema({
    title : String,
    teamId: Number
});

teamA.virtual('title', {
    ref         : 'B',
    localField  : 'teamId',
    foreignField: 'teamId',
    justOne     : true
});

var A = mongoose.model('A', teamA);
var B = mongoose.model('B', teamB);

A.find({})
    .populate('title')
    .exec(function (err, data) {
        data.map(function(item) {
            console.log(item.title)
        })
    });


// for(var i = 0; i < 5; i++) {
//     var aa = new A({
//         teamId : i
//     });
//     aa.save();
// }
//
// var arr = ['tom', 'tina', 'allen', 'sara', 'jordon'];
// for (var i = 0; i < arr.length; i++) {
//     var bb = new B({
//         title : arr[i],
//         teamId: i
//     })
//     bb.save();
// }