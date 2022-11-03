const gulp = require("gulp");
const parser = require("yargs-parser");

const parsLen = process.argv.length - 1;
const dirName = `../${process.argv[parsLen]}/**`;

gulp.task("copy", function () {
  return gulp.src(dirName).pipe(gulp.dest("../vue-template/components/"));
});

gulp.task(
  "build",
  gulp.series("copy", (done) => done())
);
