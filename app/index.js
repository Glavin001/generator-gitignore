'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var GitignoreGenerator = module.exports = function GitignoreGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GitignoreGenerator, yeoman.generators.Base);

GitignoreGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  /**
   * TODO
   * - Retrieve list of all .gitignore files from https://api.github.com/repos/github/gitignore/git/trees/master?recursive=1
   * - Read a single file from https://raw.github.com/github/gitignore/master/{path}
   */ 

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

GitignoreGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

GitignoreGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
