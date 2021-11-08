const {dest, series, src, task, watch} = require("gulp"),
sass = require("gulp-sass")(require("sass")),
cssnano = require("gulp-cssnano"),
rename = require("gulp-rename"),
autoprefixer = require("gulp-autoprefixer"),
concat = require("gulp-concat"),
uglify = require("gulp-uglify"),
imagemin = require("gulp-imagemin"),
webserver = require("gulp-webserver"),
babel = require("gulp-babel");

function styles() {
    return src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(concat("style.css"))
        .pipe(dest("dist/css"));
};

function minify() {
    return src("dist/css/style.css")
    .pipe(autoprefixer({
        "overrideBrowserslist": [
            "> 1%",
            "last 2 versions",
            "ie >= 11"
        ]
    }))
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("dist/css"));
};

function javascript() {
    return src("src/js/**/*.js")
        .pipe(concat("scripts.js"))
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(dest("dist/js"));
        
};

function minifyJs() {
    return src("dist/js/scripts.js")
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(dest("dist/js"));
};

function optimizeImg() {
    return src("src/image/*.{jpg,png}")
        .pipe(imagemin([
            imagemin.mozjpeg({ quality:80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 2 })
        ]))
        .pipe(dest("dist/image"))
}

function launchServer() {
    return src("../reviews-frontend")
        .pipe(webserver({
            livereload: true,
            port: "4000",
            open: true
        }));
}

function watchTask() {
    watch("src/scss/**/*.scss", styles)
    watch("dist/css/style.css", minify)
    watch("src/js/**/*.js", javascript)
    watch("dist/js/scripts.js", minifyJs)
    watch("src/image/*.{jpg,png}", optimizeImg)
};

exports.default = series(
    styles,
    minify,
    javascript,
    minifyJs,
    optimizeImg,
    launchServer,
    watchTask
)



