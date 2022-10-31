const gulp = require("gulp");
const parser = require("yargs-parser");

// const pars = parser(process.argv);
// const dirName = `../${pars._[3]}/**`;

const parsLen = process.argv.length - 1;
const dirName = `../${process.argv[parsLen]}/**`;

gulp.task("copythemesrc", function () {
  return gulp.src(dirName).pipe(gulp.dest("../vue-template/components/"));
});

gulp.task(
  "build",
  gulp.series("copythemesrc", (done) => done())
);
