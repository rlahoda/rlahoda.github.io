const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
// const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const twig = require("gulp-twig");
const data = require("gulp-data");
const fs = require("fs");
const path = require("path");
const twigMarkdown = require("twig-markdown");
const twig1 = require("twig");
twig1.extend(twigMarkdown);

const concat = require("gulp-concat");
const minify = require("gulp-minify");

const paths = {
  assets: {
    src: "./dev/assets/**/*.*",
    dest: "build/assets"
  },
  scripts: {
    src: "./dev/scripts/**/*.*",
    dest: "build/scripts"
  },
  vendor: {
    src: "./dev/vendor/**/*.*",
    dest: "build/vendor"
  },
  templates: {
    src: "./dev/templates/**/*.*"
  },
  twig: {
    src: "./dev/templates/blog/**/*.twig",
    dest: "build/blog"
  }
}

const startBrowserSync = (done) => {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  done();
}

// generic copy function
const copy = (source, target) =>
  src(source).pipe(dest(target));

const copyAssets = () => copy(paths.assets.src, paths.assets.dest)

// Concatenate JS files into a single file and minify
const concatJS = () => {
  return (
    src("./dev/scripts/*.js")
    .pipe(concat("scripts.js"))
    .pipe(minify())
    .pipe(dest("./build/scripts"))
  )
}
const copyJS = () => copy(paths.scripts.src, paths.scripts.dest)

const copyVendor = () => copy(paths.vendor.src, paths.vendor.dest)

// SCSS compile
const scss = () => {
  return (
    src("./dev/scss/**/*.scss")
      .pipe(sass())
      .on("error", sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(dest("build/css"))
  );
}

const processJS = () => series(
  concatJS,
  copyJS,
  reload,
)


const compileBlog = () => {
 return src(paths.twig.src)
    .pipe(twig())
    .pipe(dest(paths.twig.dest));
}

const compilePages = () => {
return src("dev/templates/*.twig")
    .pipe(
      data(function(file) {
        return JSON.parse(
          fs.readFileSync("dev/templates/" + path.basename(file.path) + ".json")
        );
      })
    )
    .pipe(twig())
    .pipe(dest("./build/"))
    .pipe(dest("./"));
}

// Browsersync reload
const reload =(done) => {
  browserSync.reload();
  done();
}

const processTwig = () => series(
  compileBlog,
  compilePages
)

const watchTwig = () => watch("dev/templates/**/*.twig", { ignoreInitial: false }, processTwig)
const watchJson = () => watch("dev/templates/**/*.json", { ignoreInitial: false }, processTwig)
const watchMarkdown = () => watch("dev/templates/**/*.md", { ignoreInitial: false }, processTwig)
const watchScss = () => watch("dev/scss/**/*.scss", { ignoreInitial: false }, scss);
const watchJS = () => watch("dev/scripts/**/*.js", { ignoreInitial: false }, processJS);
const watchHtml = () => watch("build/**/*.html", reload);

// Exports
exports.build = series(
  scss,
  copyAssets,
  concatJS,
  copyVendor,
  compileBlog,
  compilePages,
)

exports.default = series(
    exports.build,
    startBrowserSync,
    parallel(
      watchTwig,
      watchScss,
      watchJS,
      watchHtml,
      watchJson,
      watchMarkdown,
    )
  );