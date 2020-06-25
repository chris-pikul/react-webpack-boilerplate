const { src, dest, series } = require('gulp');
const del = require('del');
const { spawn } = require('child_process');

const HasYarn = require('./scripts/has-yarn');
const usingYarn = HasYarn();

function clean() {
    return del([
        'build/**/*',
        'dist/**/*',
    ]);
}

function cleanMaps() {
    return del(['dist/**/*.map']);
}

function runWebpack(script, cb) {
    let cmd = null;

    if(usingYarn)
        cmd = spawn(/^win/.test(process.platform) ? 'yarn.cmd' : 'yarn', ['run', script]);
    else
        cmd = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', script]);

    cmd.stdout.on('data', data => console.log(`${data}`));
    cmd.stderr.on('data', data => console.error(`${data}`));
    cmd.on('error', err => console.error(`failed to start process: `, err));
    cmd.on('close', code => {
        console.log(`child process exited with code ${code}`);
        cb();
    });
}
const developWebpack = cb => runWebpack('serve:develop', cb);
const productionWebpack = cb => runWebpack('build:production', cb);

function productionAssets() {
    return src(['./static/**/*'])
        .pipe( dest('./dist' ));
}

exports['clean'] = clean;
exports['assets:build'] =  productionAssets;
exports['package'] = series(clean, productionWebpack, productionAssets, cleanMaps);
exports['package:assets'] = series(clean, productionAssets);
exports['develop'] = series(clean, developWebpack);