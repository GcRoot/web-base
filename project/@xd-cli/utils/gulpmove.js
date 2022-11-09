const fs = require("fs");
const gulp = require("gulp");

const parsLen = process.argv.length - 1;
const dirName = process.argv[parsLen].split(",").map((el) => {
  if (fs.statSync(el).isDirectory()) return `${el}/**`;
  return el;
});
// const dirName = `${process.argv[parsLen]}/**`;
console.log(dirName);
gulp.task("copy", function () {
  return gulp.src(dirName).pipe(gulp.dest("../vue-template/components/"));
});

gulp.task(
  "build",
  gulp.series("copy", (done) => done())
);
