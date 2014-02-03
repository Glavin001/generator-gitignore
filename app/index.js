'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var request = require('request');

var GitignoreGenerator = module.exports = function GitignoreGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  // Fixes #5. Should not require package.json file
  //this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GitignoreGenerator, yeoman.generators.Base);

GitignoreGenerator.prototype.askFor = function askFor() {
    var self = this;
    var cb = self.async();

  // have Yeoman greet the user.
  console.log(self.yeoman);

  // Prepare variables
  self.filePaths = [ ];

  /**
   * TODO
   * - Retrieve list of all .gitignore files from https://api.github.com/repos/github/gitignore/git/trees/master?recursive=1
   * - Read a single file from https://raw.github.com/github/gitignore/master/{path}
   */ 
   var configPaths = [ ];
   var getAllConfigs = function(callback) {
    if (configPaths.length > 0)
    {
        // Cached
        return configPaths;
    }
    else
    {
        // Read from GitHub
        var url = "https://api.github.com/repos/github/gitignore/git/trees/master?recursive=1";
        request.get({url:url, json:true, headers: {
            'User-Agent': 'request'
        }}, function (error, response, data) {
            if (!error) {
                // Iterate over Tree
                for (var i=0, len=data.tree.length; i<len; i++)
                {
                    var curr = data.tree[i];
                    var path = curr.path;
                    // Only show .gitignore files
                    if (path.indexOf('.gitignore') != -1)
                    {
                        // Does have .gitignore
                        configPaths.push(path);
                    }
                }
                return callback && callback(error, configPaths);
            } 
            else 
            {
                return callback && callback(error, []);
            }
        });
    }
   };

   getAllConfigs(function(err, data) {
    //console.log(data);
    var prompts = [{
        type: 'list',
        name: 'filePath',
        message: 'Choose a GitIgnore file:',
        choices: data,
    }];

    self.prompt(prompts, function (props) {
        
        self.filePaths.push( props.filePath );

        cb();
    }.bind(self));   
  });

};

GitignoreGenerator.prototype.app = function app() {
/*
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  */
};

GitignoreGenerator.prototype.projectfiles = function projectfiles() {
    /*
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    */
    var self = this;
    var cb = self.async();

    var loadFile = function(path, callback) {
    var baseUrl = "https://raw.github.com/github/gitignore/master/";
    // Read from GitHub
    var url = baseUrl + path;
        request.get({url:url, json:false, headers: {
            'User-Agent': 'request'
        }}, function (error, response, data) {
            return callback && callback(error, data);
        });
    };

    var appendToGitIgnore = function(newGitIgnore)
    {
        var gitignorePath = path.join(process.cwd(), '.gitignore');
        var contents = "";
        try {
            contents = self.readFileAsString(gitignorePath);
        } catch (e) {

        }
        // Append new contents
        contents += newGitIgnore;

        // Make modifications to the file string here
        self.write(gitignorePath, contents);
    }

    //
    var newGitIgnore = "";
    //
    var pending = 0;
    var completionCallback = function() {
        //console.log("Done one.")
        if (!pending)
        {
            // Write to file
            //console.log(newGitIgnore);
            appendToGitIgnore(newGitIgnore);
            // Done.
            cb();
        }
    };
    for (var i=0, len=self.filePaths.length; i<len; i++)
    {
        var filePath = self.filePaths[i];
        pending++;
        loadFile(filePath, function(error, data) {
            if (!error)
            {
                newGitIgnore += "# ===== Start "+filePath+" =====\n";
                newGitIgnore += data;
                newGitIgnore += "# ===== End "+filePath+" =====\n\n";
            }
            pending--;    
            completionCallback();
        });
    }
    //
    completionCallback();
    
};
