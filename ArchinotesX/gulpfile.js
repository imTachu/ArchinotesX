// Generated on 2016-05-08 using generator-jhipster 3.1.0
'use strict';

var gulp = require('gulp'),
    rev = require('gulp-rev'),
    templateCache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    ngConstant = require('gulp-ng-constant-fork'),
    eslint = require('gulp-eslint'),
    argv = require('yargs').argv,
    gutil = require('gulp-util'),
    protractor = require('gulp-protractor').protractor,
    es = require('event-stream'),
    flatten = require('gulp-flatten'),
    del = require('del'),
    wiredep = require('wiredep').stream,
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    //KarmaServer = require('karma').Server,
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    gulpIf = require('gulp-if'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    angularFilesort = require('gulp-angular-filesort'),
    naturalSort = require('gulp-natural-sort');

var handleErrors = require('./gulp/handleErrors'),
    serve = require('./gulp/serve'),
    serveDist = require('./gulp/serveDist'),
    util = require('./gulp/utils'),
    build = require('./gulp/build');


var config = require('./gulp/config');

gulp.task('clean', function () {
    return del([config.dist], { dot: true });
});

gulp.task('copy', function () {
    return es.merge( 
        gulp.src(config.bower + 'bootstrap/fonts/*.*')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/fonts/'))
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/fonts/'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist)),
        gulp.src(config.bower + 'font-awesome/fonts/*.*')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/fonts/'))
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/fonts/'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist)),
        gulp.src(config.app + 'content/**/*.{woff,woff2,svg,ttf,eot,otf}')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/fonts/'))
        .pipe(flatten())
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/fonts/'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist)),
        gulp.src([config.app + 'robots.txt', config.app + 'favicon.ico', config.app + '.htaccess'], { dot: true })
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist))
        .pipe(gulp.dest(config.dist))
    );
});

gulp.task('images', function () {
    return gulp.src(config.app + 'content/images/**')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/images'))
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/images'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(browserSync.reload({stream: true}));
});



gulp.task('styles', [], function () {
    return gulp.src(config.app + 'content/css/*.css')
        .pipe(browserSync.stream());
});

gulp.task('inject', function () {
    return gulp.src(config.app + 'index.html')
        .pipe(inject(gulp.src(config.app + 'app/**/*.js')
        .pipe(naturalSort())
        .pipe(angularFilesort()), {relative: true}))
        .pipe(gulp.dest(config.app));
});

gulp.task('wiredep', ['wiredep:test', 'wiredep:app']);

gulp.task('wiredep:app', function () {
    var stream = gulp.src(config.app + 'index.html')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(wiredep())
        .pipe(gulp.dest(config.app));

    return stream;
});

gulp.task('wiredep:test', function () {
    return gulp.src(config.test + 'karma.conf.js')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(wiredep({
            ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected JavaScript files
            devDependencies: true,
            fileTypes: {
                js: {
                    block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /'(.*\.js)'/gi
                    },
                    replace: {
                        js: '\'src/{{filePath}}\','
                    }
                }
            }
        }))
        .pipe(gulp.dest(config.test));
});

gulp.task('assets:prod', ['images', 'styles', 'html'], build);

gulp.task('html', function () {
    return gulp.src(config.app + 'app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache({
            module: 'archinotesxApp',
            root: 'app/',
            moduleSystem: 'IIFE'
        }))
        .pipe(gulp.dest(config.tmp));
});

gulp.task('ngconstant:dev', function () {
    return ngConstant({
        dest: 'app.constants.js',
        name: 'archinotesxApp',
        deps: false,
        noFile: true,
        interpolate: /\{%=(.+?)%\}/g,
        wrap:
            '(function () {\n' +
            '    "use strict";\n' +
            '    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n' +
            '    {%= __ngModule %}\n' +
            '})();\n',
        constants: {
            ENV: 'dev',
            VERSION: util.parseVersion()
        }
    })
    .pipe(gulp.dest(config.app + 'app/'));
});

gulp.task('ngconstant:prod', function () {
    return ngConstant({
        dest: 'app.constants.js',
        name: 'archinotesxApp',
        deps: false,
        noFile: true,
        interpolate: /\{%=(.+?)%\}/g,
        wrap:
            '(function () {\n' +
            '    "use strict";\n' +
            '    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n' +
            '    {%= __ngModule %}\n' +
            '})();\n',
        constants: {
            ENV: 'prod',
            VERSION: util.parseVersion()
        }
    })
    .pipe(gulp.dest(config.app + 'app/'));
});

// check app for eslint errors
gulp.task('eslint', function () {
    return gulp.src(['gulpfile.js', config.app + 'app/**/*.js'])
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// check app for eslint errors anf fix some of them
gulp.task('eslint:fix', function () {
    return gulp.src(config.app + 'app/**/*.js')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(gulpIf(util.isLintFixed, gulp.dest(config.app + 'app')));
});

gulp.task('test', ['wiredep:test', 'ngconstant:dev'], function (done) {
    done();
    /*new KarmaServer({
        configFile: __dirname + '/' + config.test + 'karma.conf.js',
        singleRun: true
    }, done).start();*/
});

/* to run individual suites pass `gulp itest --suite suiteName` */
gulp.task('protractor', function () {
    var configObj = {
        configFile: config.test + 'protractor.conf.js'
    };
    if (argv.suite) {
        configObj['args'] = ['--suite', argv.suite];
    }
    return gulp.src([])
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(protractor(configObj))
        .on('error', function () {
            gutil.log('E2E Tests failed');
            process.exit(1);
        });
});

gulp.task('itest', []);

gulp.task('watch', function () {
    gulp.watch('bower.json', ['install']);
    gulp.watch(['gulpfile.js', 'pom.xml'], ['ngconstant:dev']);
    gulp.watch(config.app + 'content/css/**/*.css', ['styles']);
    gulp.watch(config.app + 'content/images/**', ['images']);
    gulp.watch(config.app + 'app/**/*.js', ['inject']);
    gulp.watch([config.app + '*.html', config.app + 'app/**', config.app + 'i18n/**']).on('change', browserSync.reload);
});

gulp.task('install', function () {
    runSequence(['wiredep', 'ngconstant:dev'], 'inject');
});

gulp.task('serve', function () {
    runSequence('install', serve);
});

gulp.task('build', ['clean'], function (cb) {
    runSequence(['copy', 'wiredep:app', 'ngconstant:prod'], 'inject', 'assets:prod', cb);
});

gulp.task('default', ['serve']);

gulp.task('serve:dist', ['build'] , serveDist);


gulp.task('refactor-controllers-temp', function() {
    return gulp.src([config.app + 'app/entities/**/*.controller.js'])
        .pipe(rename(function(path) {
            if (path.basename.match(/dialog.controller$/) === null &&
                path.basename.match(/detail.controller$/) === null &&
                path.basename.match(/modal.controller$/) === null &&
                path.basename.match(/delete.controller$/) === null &&
                path.basename.match(/refactor.controller$/) === null &&
                path.basename.match(/confirmation.controller$/) === null) {
                path.basename = path.basename.replace('.controller', '-refactor.controller');
            }

        }))
        .pipe(gulp.dest(config.app + 'app/entities/'));
});

gulp.task('generate-html-lists-temp', function() {
    return gulp.src([config.app + 'app/entities/**/*.html'])
        .pipe(rename(function(path) {
            if (path.basename.match(/dialog$/) === null &&
                path.basename.match(/detail$/) === null &&
                path.basename.match(/modal$/) === null &&
                path.basename.match(/list$/) === null &&
                path.basename.match(/list-table$/) === null &&
                path.basename.match(/confirmation$/) === null
            ) {

                if (path.basename.match(/inspeccion-/) === null)
                    path.basename = path.basename.replace(/s$/, '-list');
                else
                    path.basename += '-list';
            }

        }))
        .pipe(gulp.dest(config.app + 'app/entities/'));
});





gulp.task('delete-temp-files', function() {
    return del([config.app + 'app/entities/**/*-list.html']);
});



gulp.task('refactor-dialog-html-renaming', function() {
    return gulp.src([config.app + 'app/entities/**/*-dialog-fields.html'])
        .pipe(rename(function(path) {
            path.basename = path.basename.replace('-dialog-fields', 's');
        }))
        .pipe(gulp.dest(config.app + 'app/entities/'));
});


gulp.task('delete-refactor-ctrls', function() {
    return del([config.app + 'app/entities/**/*refactor.controller.js']);
});
