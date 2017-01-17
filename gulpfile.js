/**
 * Created by Administrator on 2017/1/14.
 */

/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

// 引入包
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload; //每个任务的刷新

// 1. LESS编译 压缩  --合并没必要，一般预处理css都可以导包
gulp.task('style', function () {
    //这里是在执行style任务时自动执行的
    //!src/styles/_*.less' --> 不取以下划线“_”开头的less文件
    //_demo.less在app.less中已经通过引用包引用了
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
        .pipe(less())  // less --> css
        .pipe(cssnano())  //css压缩
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({
            stream: true
        }));
});

// 2. JS合并 压缩 混淆
gulp.task('script', function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))  //js合并
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
        .pipe(reload({
            stream: true
        }));
});

// 3. img复制
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({
            stream: true
        }));
});

// 4. html压缩
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true})) //去掉空白
        .pipe(htmlmin({removeComments: true})) //去掉注释
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

//
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: 'dist/'
        }
    }, function (err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);

});

