let gulp = require('gulp');

function task(cb) {
    console.log('my first task completed!');
    cb(); // специальный коллбэк, о нем позже
}

function time(cb) {
    console.log(new Date());
    cb(); // специальный коллбэк, о нем позже
}

exports.time = time;

function taskD(cb) {
    console.log('taskD');
    cb();
}

function task1(cb) {
    console.log('task1');
    cb();
}

function task2(cb) {
    console.log('task2');
    cb();
}

exports.taskD = taskD;
exports.task1 = task1;
exports.task2 = task2;

function day(cb) {
    console.log(new Date().getDate());
    cb(); // специальный коллбэк, о нем позже
}
function month(cb) {
    console.log(new Date().getMonth() + 1);
    cb(); // специальный коллбэк, о нем позже
}
function year(cb) {
    console.log(new Date().getFullYear());
    cb(); // специальный коллбэк, о нем позже
}

exports.day = day;
exports.month = month;
exports.year = year;

function priv1(cb) {
    console.log('private 1')
    cb();
}
function priv2(cb) {
    console.log('private 2')
    cb();
}
function private(cb) {
    priv1(cb);
    priv2(cb);
    cb();
}

exports.private = private;


function priva1(cb) {
    console.log('Private 1 in Public 1')
    cb();
}
function priva2(cb) {
    console.log('Private 2 in Public 1')
    cb();
}

function priva3(cb) {
    console.log('Private 1 in Public 2')
    cb();
}

function priva4(cb) {
    console.log('Private 2 in Public 2')
    cb();
}

function public1(cb) {
    priva1(cb);
    priva2(cb);
    cb();
}
function public2(cb) {
    priva3(cb);
    priva4(cb);
    cb();
}
exports.public1 = public1;
exports.public2 = public2;


const { series } = require('gulp');
const { parallel } = require('gulp');

let a = 0;
function par1(cb) {
    a = 22;
    console.log(a);
    cb();
}
function par2(cb) {
    a = a - 10;
    console.log(a);
    cb();
}

function para(cb) {
    series(par1, par2);
    console.log(a)
    cb();
}

// exports.default = series(par1, par2);

exports.default = parallel(par1, par2);


function partest1(cb) {
    console.log('CA');
    cb();
}
function partest2(cb) {
    console.log('CA');
    cb();
}
function partest3(cb) {
    console.log('TЬ');
    cb();
}
function partest4(cb) {
    console.log('ПАСАСИ');
    cb();
}
exports.allpara = parallel(partest1, partest2, partest3)
exports.allparatwo = series(partest1, parallel(partest4, partest2), partest3)


// Сделайте три СSS файла. Сделайте три публичных задачи. Пусть каждая задача создает копию одного из наших файлов в заданной папке.

let { src, dest } = require('gulp');

function copyFile(cb) {
    return src('src/css/style1.css')
        .pipe(dest('dist'))
}

exports.copyFile = copyFile;

function copyFiles(cb) {
    let files = [
        'src/css/style1.css',
        'src/css/style2.css'
    ]

    return src(files)
        .pipe(dest('dist/css'))
}

exports.copyFiles = copyFiles;


// Минимизация файлов в Gulp
let cleanCSS = require('gulp-clean-css');

function miniCss(cb) {
    return src('src/css/*.css')
        .pipe(cleanCSS())
        .pipe(dest('dist/mincss'))
}

exports.mincss = miniCss;

// С помощью плагина gulp-uglify минимизируйте группу JavaScript файлов.
let uglify = require('gulp-uglify');

function minJs(cb) {
    return src('src/js/*.js')
        .pipe(uglify())
        .pipe(dest('dist/minjs'))
}
exports.minjs = minJs;

// Препроцессоры CSS в Gulp
let less = require('gulp-less');

function lesstocss(cb) {
    return src('src/css/*.css')
        .pipe(less())
        .pipe(dest('dist/css'))
}
exports.lesstocss = lesstocss;

// Препроцессоры SASS в Gulp

let sass = require('gulp-sass')(require('sass'));
// import dartSass from 'sass';
// import gulpSass from 'gulp-sass';

function sasscss(cb) {
    return src('src/css/*.scss')
        .pipe(sass())
        .pipe(dest('dist/scss'));
}
exports.sasscss = sasscss;


// function sassToMin(cb) {
//     return src('src/css/*.scss')
//         .pipe(sass())
//         .pipe(cleanCSS())
//         .pipe(dest('dist/mincss'))
// }

// exports.scss = sassToMin;

// Rename gulp

let rename = require('gulp-rename');


function toScssToMin(cb) {
    return src('src/css/*.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist/mincss'))
}

exports.scss = toScssToMin;

// Минимизируйте JavaScript файлы с помощью плагина gulp-uglify так, чтобы получившиеся файлы имели расширение .min.js.

function ToMinJs(cb) {
    return src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/minjs'))
}
exports.js = ToMinJs;


// ОБЪЕДИНЕНИЕ ФАЙЛОВ В ОДИН. Gulp concat. npm install gulp-concat --save-dev 
let concat = require('gulp-concat');

function oneCss(cb) {
    return src('src/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe(dest('dist/css'));
}

exports.oneCss = oneCss;

// Объедините несколько JavaScript файлов в один.

function oneJs(cb) {
    return src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js'))
}
exports.oneJs = oneJs;