const Chokidar = require('chokidar');
const Path = require('path');
const log = console.log.bind(console);
const fs = require('fs');

const Container = require('./docker/container');
const artifactsDir = Path.join(__dirname, 'artifacts');

const watcher = Chokidar.watch(artifactsDir, {
  ignored: /(^|[\/\\])\../, persistent: true,
  ignoreInitial: true
});

const SpawnContainer = function (path, isDir) {
  isDir = (isDir) ? true : false;
  var dirName = path.replace(artifactsDir + Path.sep, '');
  const segments = dirName.split(Path.sep);
  if (!isDir) {
    segments.pop();
  }
  if (segments.length !== 1) {
    return;
  }
  Container.spawn(segments[0]);
}

watcher
  .on('add', function (path) {
    log('File', path, 'has been added');
    SpawnContainer(path);
  })
  .on('addDir', function (path) {
    log('Directory', path, 'has been added');
    SpawnContainer(path, true);
  })
  .on('change', function (path) {
    log('File', path, 'has been changed');
    SpawnContainer(path);
  })
  .on('unlink', function (path) {
    log('File', path, 'has been removed');
    SpawnContainer(path);
  })
  .on('unlinkDir', function (path) {
    log('Directory', path, 'has been removed');
    SpawnContainer(path, true);
  })
  .on('error', function (error) { log('Error happened', error); })
  .on('ready', function () { log('Initial scan complete. Ready for changes.'); })
  .on('raw', function (event, path, details) { log('Raw event info:', event, path, details); })