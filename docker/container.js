const Docker = require('dockerode');
const log = console.log.bind(console);
const logError = console.error.bind(console);
const Path = require('path');
const docker = new Docker();
const Fs = require('fs');
const Uniqid = require('uniqid');

var containerOptions = {
  Image: process.env.DOCKER_IMAGE || 'ubuntu',
  Cmd: process.env.START_CMD || '/bin/bash',
  Name: process.env.CONTAINER_NAME || Uniqid()
};

module.exports = {
  spawn: function (containerName) {
    const Container = this;
    const artifactsDir = Path.join(__dirname, '../artifacts');
    const conf = Path.join(artifactsDir, containerName, 'docker-spawner.json');
    log(conf + ' existed: ' + Fs.existsSync(conf));
    if (!Fs.existsSync(conf)) {
      return;
    }

    var options = JSON.parse(Fs.readFileSync(conf, 'utf8'));
    log(options);

    if (options) {
      options = Object.assign(containerOptions, options);
    } else {
      options = containerOptions;
    }
    options.Name = containerName;

    // Check if container exist
    Container.exist(options.Name,
      function () {
        var container = docker.getContainer(options.Name);
        log('Container existed.');
        container.stop();
        container.remove();
        Container.createAndStart(options);
      },
      function () {
        log('Container not existed.');
        Container.createAndStart(options);
      });
  },
  createAndStart: function (options) {
    if (options) {
      options = Object.assign(containerOptions, options);
    } else {
      options = containerOptions;
    }

    docker.run(options.Image, options.Cmd, process.stdout, options, function (err, data, container) {
      if (!data || err) {
        logError(err);
        return;
      }

      log(data);

      log('Container started.');
    });
  },
  exist: function (containerName, existCallback, notExistCallback) {
    if (typeof existCallback !== 'function') {
      existCallback = function () { };
    }

    if (typeof notExistCallback !== 'function') {
      notExistCallback = function () { };
    }

    var containerToInspect = docker.getContainer(containerName);

    containerToInspect.inspect(function (err, data) {
      if (!data || err) {
        notExistCallback();
      } else {
        existCallback();
      }
    });
  }
};
