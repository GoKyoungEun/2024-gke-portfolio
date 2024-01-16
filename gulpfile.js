// require()함수는 모듈 이름을 인수로 사용하고 해당 모듈의 내보내기 객체를 반환
const gulp = require("gulp");
//build
const fileInclude = require("gulp-file-include");
// clean
const clean = require("gulp-clean");
// sass
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
// js
const babel = require("gulp-babel");
const minify = require("gulp-minify");
//서버
const connect = require('gulp-connect');

// 상수에 대문자를 사용하는 것이 일반적인 규칙, 상수는 한 번 정의하면 수정할 수 없는 값으로, 대문자로 정의하면 수정 가능한 일반 변수와 구분
// PATH코드의 경우 다양한 자산에 대한 경로를 포함하는 상수 개체입니다. 대문자를 사용하면 프로그램 실행 중에 이러한 경로를 수정해서는 안 된다는 점을 다른 개발자에게 분명히 알릴 수 있습니다.
const PATH = {
  ASSETS: {
    STYLE: "src/assets/scss",
    JS: "src/assets/js",
    HTML: "src",
    IMG: "src/assets/images",
  },
};

// clean
gulp.task("clean-js", function () {
  return gulp.src("dist/assets/js", { read: false }).pipe(clean());
});
gulp.task("clean-style", function () {
  return gulp.src("dist/assets/css", { read: false }).pipe(clean());
});
gulp.task("clean-html", function () {
  return gulp.src("dist/*.html", { read: false }).pipe(clean());
});
gulp.task("clean", gulp.parallel("clean-style", "clean-js", "clean-html"));

// build
gulp.task("html", () => {
  return gulp
    .src("./src/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./dist/"))
    .pipe(connect.reload());
});

gulp.task("scss", () => {
  return gulp
    .src(PATH.ASSETS.STYLE + "/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed", sourceMap: true }).on("error", sass.logError))
    .pipe(sourcemaps.write(".", { sourceRoot: "../../src" }))
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(connect.reload());
});

gulp.task("js", () => {
  return gulp
    .src(PATH.ASSETS.JS + "/**/*.js")
    .pipe(babel())
    .pipe(minify())
    .pipe(gulp.dest("./dist/assets/js"))
    .pipe(connect.reload());
});

gulp.task("images", () => {
  return import("gulp-imagemin").then(function (imagemin) {
    return gulp
      .src(PATH.ASSETS.IMG + "/**/*")
      .pipe(imagemin.default())
      .pipe(gulp.dest("./dist/assets/images"))
      .pipe(connect.reload());
  });
});

gulp.task("build", gulp.parallel("scss", "js", "html", "images"));


gulp.task("watch", () => {
  gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series("scss"));
  gulp.watch(PATH.ASSETS.JS + "/**/*.js", gulp.series("js"));
  gulp.watch(PATH.ASSETS.HTML + "/*.html", gulp.series("html"));
});

gulp.task('webserver', function(done) {
  connect.server({
    root: 'dist', // 서버의 루트 디렉토리
    livereload: true, // 라이브 리로드 활성화
    port: 8080 // 포트 설정
  });
  done();;
});

gulp.task('dev', gulp.series('webserver', 'watch'));
