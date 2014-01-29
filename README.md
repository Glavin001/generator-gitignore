# generator-gitignore [![Build Status](https://secure.travis-ci.org/Glavin001/generator-gitignore.png?branch=master)](https://travis-ci.org/Glavin001/generator-gitignore) [![NPM version](https://badge.fury.io/js/generator-gitignore.png)](http://badge.fury.io/js/generator-gitignore)

> Quickly create your .gitignore file from the most widely used configurations.
> A generator for [Yeoman](http://yeoman.io).

To install [generator-gitignore](https://github.com/Glavin001/generator-gitignore) from [npm](https://npmjs.org/), run:

```bash
$ npm install -g generator-gitignore
```

Finally, initiate the generator:

```bash
$ yo gitignore
```

## Features

- [&#x2713;] Automatically downloads from https://github.com/github/gitignore and insert into .gitignore file.
- [&#x2713;] Search https://github.com/github/gitignore
- [&#x2717;] Suggests common configurations: Linux, Mac OSX, Windows, Vim, and more.

## Example

```
$ yo gitignore

     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `


[?] Choose a GitIgnore file: 
  Global/VirtualEnv.gitignore 
  Global/Windows.gitignore 
  Global/XilinxISE.gitignore 
❯ Global/vim.gitignore 
  Global/webMethods.gitignore 
  Go.gitignore 
  Gradle.gitignore 
(Move up and down to reveal more choices)

[?] Choose a GitIgnore file: Global/vim.gitignore
 conflict .gitignore
[?] Overwrite .gitignore? overwrite
    force .gitignore


I'm all done. Running bower install & npm install for you to install the required dependencies. If this fails, try running the command yourself.

```


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-gitignore from npm, run:

```
$ npm install -g generator-gitignore
```

Finally, initiate the generator:

```
$ yo gitignore
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
