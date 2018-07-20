var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

var studentSchema = new Schema({
    name  : String,
    age   : String,
    school: {
        type: Schema.Types.ObjectId,
        ref : 'school'
    }
});
var schoolSchema = new Schema({
    name    : String,
    students: [
        {
            type: Schema.Types.ObjectId,
            ref : 'student'
        }
    ],
    city    : {
        type: Schema.Types.ObjectId,
        ref : 'city'
    }
});
var citySchema = new Schema({
    name  : String,
    school: [
        {
            type: Schema.Types.ObjectId,
            ref : 'school'
        }
    ]
});

var Student = mongoose.model('student', studentSchema);

var School = mongoose.model("school", schoolSchema);
var City = mongoose.model("city", citySchema);

// var city = new City({
//     name  : '北京',
//     school: []
// });
//
// city.save(function (err, city) {
//     var school = new School({
//         name    : 'Test',
//         students: [],
//         city    : city._id
//     });
//     school.save(function (err, school) {
//         var student = new Student({
//             name  : 'Tom',
//             age   : 20,
//             school: school._id
//         });
//         student.save();
//     });
// });


Student.find()
    .populate('school')
    .exec(function (err, data) {
        console.log(data[0]);
        console.log(data[0].name + '的学校是' + data[0].shcool.name );
        // var student3 = new Student({
        //     name  : 'LiLY',
        //     age   : 18,
        //     school: data[0].school._id
        // });
        //
        // student3.save();
    });

// School.findOne({name:"xxx"}).populate("students","name age").exec(function(err,school){
//     console.log(school);
//     console.log("============")
// })
//
//populate中第二个参数，只返回关联表中的字段
// Student.findOne({name: "Tom"}).populate("school", "name").exec(function (err, student) {
//     School.findOne({name: student.school.name}).populate("city").exec(function (err, school) {
//         console.log(student.name + '的学校是' + student.school.name + ',所在城市为：' + school.city.name);
//     })
// })

// School.find()
//     .exec(function (err, data) {
//         console.log(data)
//     })

// Student.findOne({name: 'Tom'})
//        .populate({
//            path: 'school',
//            populate: {path: 'city'}
//        })
//        .exec(function (err, data) {
//            console.log(data)
//           // console.log(data.name + ' 所在学校为：' + data.school.name + "，所在城市为：" + data.school.city.name);
// })


// // 定义学生模式
// var StudentSchema = new mongoose.Schema({
//     name   : String,
//     calzzID: {
//         type: mongoose.Schema.ObjectId,
//         ref : 'Clazz'   // clazz的Model名
//     }
// });
//
// // 连表查询方法
// StudentSchema.statics = {
//     findClazzNameByStudentId: function (studentId, callback) {
//         return this
//             .findOne({_id: studentId}).populate('clazzID')  // 关联查询
//             .exec(callback)
//     }
// };
//
//
// // 定义班级模式
// var ClazzSchema = new mongoose.Schema({
//     clazzName: String
// });
//
// // 模型
// var Student = mongoose.model('Student', StudentSchema);
// var Clazz = mongoose.model('Clazz', ClazzSchema);
//
//
// // 新建班级文档并保存
// var clazz = new Clazz(
//      {
//         clazzName:'体育9班'
//     }
//      );
//  clazz.save(function  (argument){
//      console.log('true');
//  });
//
// // 新建学生文档并保存
// var student = new Student({
//     name : '马冬梅',
//     clazzID : '56e1440f508c947b0f32c16b'  //体育3班的_id
// })
// student.save(function (err){
//     console.log('true');
// })


// Student.findClazzNameByStudentId('56e1446c64a8f59c0f866df3', function (err, student) {
//     if (err) console.log(err);
//     console.log(student.name + " 在的班级: " + student.clazzID.clazzName);
//     /*通过studentID查询到对应的学生对象，并通过关联属性clazzID获取到对应classID的班级对象，
// 通过对象的clazzName属性返回班级名称*/
// })

// var logger = require('morgan');
// if ('development' === app.get('env')) {
//     app.set('showStackError', true);          // 输出报错信息
//     // app.use(logger(':method :url :status'));  // 输出信息领域
//     app.locals.pretty = true;                 // 源代码格式化
//     mongoose.set('debug', true);              // 数据库报错信息
// }


// var personSchema = Schema({
//     _id: Schema.Types.ObjectId,
//     name: String,
//     age: Number,
//     stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });
//
// var storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });
//
// var Story = mongoose.model('Story', storySchema);
// var Person = mongoose.model('Person', personSchema);
//
// var author = new Person({
//     _id: new mongoose.Types.ObjectId(),
//     name: 'Ian Fleming',
//     age: 50
// });
//
// author.save(function (err) {
//     if (err) return handleError(err);
//
//     var story1 = new Story({
//         title: 'Casino Royale',
//         author: author._id    // assign the _id from the person
//     });
//
//     story1.save(function (err) {
//         if (err) return handleError(err);
//         // thats it!
//     });
// });
//
// // Story.
// // findOne({ title: 'Casino Royale' }).
// // populate('author').
// // exec(function (err, story) {
// //     if (err) return handleError(err);
// //     console.log('The author is %s', story.author.name);
// //     // prints "The author is Ian Fleming"
// // });

// Story.findOne({title: 'Casino Royale'}, function (error, story) {
//     if (error) {
//         return handleError(error);
//     }
//     story.author = author;
//     console.log(story.author.name); // prints "Ian Fleming"
// });