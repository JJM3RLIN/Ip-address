const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

//Minificar
const sourcemap = require('gulp-sourcemaps');
//CSS
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
//JS
const terser = require('gulp-terser-js');

function css( done ) {
    return src('src/SASS/**/*.scss')
    .pipe( sourcemap.init() )
    .pipe(sass()) //compilarlo
    .pipe( postcss( [autoprefixer(), cssnano()] ) )
    .pipe( sourcemap.write(".") )
    .pipe(dest("build/css")); //almacenarlo

  done(); 
}

function js(){
    return src('src/JS/*.js')
    .pipe( sourcemap.init() )
    .pipe(terser())
    .pipe( sourcemap.write('.') )
    .pipe( dest('build/js') )
}

function watchArchivos(){
    watch('src/SASS/**/*.scss', css);
    watch( "src/JS/*.js", js )
}
exports.css = css;
exports.js = js;
exports.default  = watchArchivos;

