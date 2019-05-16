/**
 * Exia
 * gulpfile.js
 *
 * @version 0.4.1
 * @author Pedro Britto <pedroivobritto@gmail.com>
 */

/**
 **************
 ** Conteúdo **
 **************
 *
 * 1. Variáveis
 *   1.1 Requires
 *   1.2 Caminhos
 *
 * 2. Tasks
 *    2.1 PHP
 *      2.1.1 Exporta ✓
 *      2.1.2 Otimiza
 *
 *    2.2 Sass ✓
 *      2.2.1 Exporta Dev
 *      2.2.2 Exporta Prod
 *
 *    2.3 Assets ✓
 *      2.3.1 Exporta Imagens
 *      2.3.2 Otimiza Imagens (/src)
 *      2.3.3 Exporta Fontes
 *      2.3.4 Exporta Ico
 *      2.3.5 Exporta style.css (WordPress)
 *      2.3.6 Exporta screenshot.* (WordPress)
 *      2.3.7 Exporta todos os assets
 *
 *    2.4 Build ✓
 *      2.4.1 Dev
 *      2.4.2 Prod
 *
 *    2.5 Serve ✓
 *      2.5.1 Tarefa Serve
 */

/**
 * 1. Variáveis
 */

/**
 * 1.1 Requires
 */

// General
const path = require("path");
const gulp = require("gulp");

// Sass
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");

// Utilities
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

// Optimization
const imagemin = require("gulp-imagemin");

// PHP server
const php = require("gulp-connect-php");

// BrowserSync
const browserSync = require("browser-sync").create();

/**
 * 1.2 Caminhos
 */

const PATH = {
    dist: "dist",
    src: "src",
};

/**
 * 2. Tasks
 */

/**
 * 2.1 PHP
 */

/**
 * 2.1.1 Exporta
 */
gulp.task("copy:php", () => {
    return gulp
        .src(path.resolve(PATH.src, "template", "**/*.php"))
        .pipe(gulp.dest(path.resolve(PATH.dist)));
});

/**
 * 2.2 Sass
 */

/**
 * 2.2.1 Exporta Dev
 *
 * Com sourcemaps
 */
gulp.task("copy:sass:dev", () => {
    return gulp
        .src(path.resolve(PATH.src, "sass", "*.+(sass|scss)"))
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                includePaths: ["node_modules/"],
                outputStyle: "compressed",
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(concat("app.min.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.resolve(PATH.dist, "assets/css")))
        .pipe(browserSync.stream());
});

/**
 * 2.2.2 Exporta Prod
 *
 * Sem sourcemaps
 */
gulp.task("copy:sass:prod", () => {
    return gulp
        .src(path.resolve(PATH.src, "sass", "*.+(sass|scss)"))
        .pipe(sassGlob())
        .pipe(
            sass({
                includePaths: ["node_modules/"],
                outputStyle: "compressed",
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(concat("app.min.css"))
        .pipe(gulp.dest(path.resolve(PATH.dist, "assets/css")))
        .pipe(browserSync.stream());
});

/**
 * 2.3 Assets
 */

/**
 * 2.3.1 Exporta Imagens
 */
gulp.task("copy:images", () => {
    return gulp
        .src(path.resolve(PATH.src, "images", "**/*"))
        .pipe(gulp.dest(path.resolve(PATH.dist, "assets/images")));
});

/**
 * 2.3.1 Otimiza Imagens (/src)
 *
 * Otimiza imagens (lossless) em /src/images/.
 * Não é mais eficiente do que a GUI do imageOptim.
 * Pode demorar alguns minutos para completar.
 */
gulp.task("image:optim:lossless", () => {
    console.log("Image optimization is a CPU-intensive task.");
    console.log("This may take from a few up to several minutes to complete.");

    return gulp
        .src(path.resolve(PATH.src, "images", "**/*"))
        .pipe(
            imagemin(
                [
                    // All these optimizers are ** lossless **
                    imagemin.gifsicle({
                        interlaced: true,
                        optimizationLevel: 2,
                    }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng(),
                    imagemin.svgo(),
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest(path.resolve(PATH.dist, "assets/images")));
});

/**
 * 2.3.3 Exporta Fontes
 */
gulp.task("copy:fonts", () => {
    return gulp
        .src(path.resolve(PATH.src, "fonts", "**/*"))
        .pipe(gulp.dest(path.resolve(PATH.dist, "assets/fonts")));
});

/**
 * 2.3.4 Exporta Ico
 */
gulp.task("copy:ico", () => {
    return gulp
        .src(path.resolve(PATH.src, "ico", "**/*"))
        .pipe(gulp.dest(path.resolve(PATH.dist, "assets/ico")));
});

/**
 * 2.3.5 Exporta style.css (WordPress)
 */
gulp.task("copy:wordpress:style", () => {
    return gulp
        .src(path.resolve(PATH.src, "template", "style.css"))
        .pipe(gulp.dest(path.resolve(PATH.dist)));
});

/**
 * 2.3.6 Exporta screenshot.* (WordPress)
 */
gulp.task("copy:wordpress:screenshot", () => {
    return gulp
        .src(path.resolve(PATH.src, "template", "screenshot.*"))
        .pipe(gulp.dest(path.resolve(PATH.dist)));
});

/**
 * 2.3.7 Exporta todos os assets
 */
gulp.task(
    "copy:assets",
    gulp.series(
        "copy:images",
        "copy:fonts",
        "copy:ico",
        "copy:wordpress:style",
        "copy:wordpress:screenshot"
    )
);

/**
 * 2.4 Build
 */

/**
 * 2.4.1 Dev
 */
gulp.task("build:dev", gulp.series("copy:php", "copy:sass:dev", "copy:assets", done => done()));

/**
 * 2.4.2 Prod
 */
gulp.task("build:prod", gulp.series("copy:php", "copy:sass:prod", "copy:assets", done => done()));

/**
 * 2.5 Servers
 */

// PHP Server
gulp.task("php-server", () => {
    php.server({
        base: path.resolve(PATH.dist),
        port: 4010,
        stdio: "ignore",
    });
});

// BrowserSync Server
gulp.task("browser-sync", () => {
    browserSync.init({
        proxy: "localhost:4010",
        injectChanges: true,
        open: false,
        notify: false,
        port: 4000,
    });
});

/**
 * 2.5.1 Tarefas Watch
 */
gulp.task("file-watcher", () => {
    gulp.watch(`${PATH.src}/js/**/*`, gulp.series("watch:js"));
    gulp.watch(`${PATH.src}/sass/**/*`, gulp.series("copy:sass:dev"));
    gulp.watch(`${PATH.src}/images/**/*`, gulp.series("watch:images"));
    gulp.watch(`${PATH.src}/fonts/**/*`, gulp.series("watch:fonts"));
    gulp.watch(`${PATH.src}/ico/**/*`, gulp.series("watch:ico"));

    const phpWatcher = gulp.watch(`${PATH.src}/template/**/*`);

    function updatePhp(path) {
        const savedFilePath = path.split("/");
        const savedFileName = savedFilePath[savedFilePath.length - 1];

        console.log("Copying .php file to dist/", `(${savedFileName})`);

        gulp.src(path, {
            base: `${PATH.src}/template`,
        }).pipe(gulp.dest(PATH.dist));

        browserSync.reload();
    }

    phpWatcher.on("change", updatePhp);
});

gulp.task("watch:js", done => {
    browserSync.reload();
    done();
});

gulp.task(
    "watch:images",
    gulp.series("copy:images", done => {
        browserSync.reload();
        done();
    })
);

gulp.task(
    "watch:fonts",
    gulp.series("copy:fonts", done => {
        browserSync.reload();
        done();
    })
);

gulp.task(
    "watch:ico",
    gulp.series("copy:ico", done => {
        browserSync.reload();
        done();
    })
);

gulp.task(
    "watch:wordpress:style",
    gulp.series("copy:wordpress:style", done => {
        browserSync.reload();
        done();
    })
);

gulp.task(
    "watch:wordpress:screenshot",
    gulp.series("copy:wordpress:screenshot", done => {
        browserSync.reload();
        done();
    })
);

/**
 * 2.5.2 Tarefa Serve
 */
gulp.task(
    "serve",
    gulp.parallel("php-server", "build:dev", "browser-sync", "file-watcher", done => done())
);
