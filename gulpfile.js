const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require("gulp-sourcemaps");
const cleanCss = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

const config = {
    input: {
        scssPath: "data/scss/**/*.scss",
        html: "*.html",
        scriptPath: "data/js/script.js"
    },
    output: {
        cssNameDev: "style.css",
        cssNameProd: "style.min.css",
        cssPath: "data/css/"
    }
};

gulp.task("scssProd", function() {
    return gulp.src(config.input.scssPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            flexbox: true,
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest(config.output.cssPath))
});
gulp.task("scssDev", function() {
    return gulp.src(config.input.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            flexbox: true,
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.cssPath))
        .pipe(browserSync.stream());
});
gulp.task("serv", function() {
    browserSync.init({
        server: true
    });
    gulp.watch(config.input.scssPath, ["scssDev"]);
    gulp.watch(config.input.html).on("change", browserSync.reload);
    gulp.watch(config.input.scriptPath).on("change", browserSync.reload);
});
gulp.task("default", ["scssDev", "serv"]);