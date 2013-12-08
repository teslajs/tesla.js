# Tesla.js

Tesla.js is a boilerplate [node.js](http://www.nodejs.org/) framework, with some basic MVC features.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

## Quick Start
The quickest way to get started with Tesla.js is to clone the project and utilize it like this:

####Install Tesla:

  $ npm install -g tesla

####Install Dependencies:

  $ npm install

####We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

  $ grunt

This will watch for changes to any of your files and automatically restart then server when necesary.

####When not using grunt you can use:

  $ node server

With this method you have to manually stop and start the server any time you make changes.

####Once the server has started, simply point your browser to:

  http://localhost:3000


## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file and the [env](config/env/) files. Here you will need to specify your application name, database name, and any other settings you would like to customize.

### [config.js](config/config.js)
Most default settings can be set & updated here:

```
app.site = {
    name : "Tesla.js", // the name of you app
}

app.config = {
    port : 3000, // port to run the server on

    prettify : {
        html : true, // whether to pretify html
    },

    engines : {
        html: "jade", // jade, ejs, haml, hjs (hogan)
        css: "stylus", // styles, sass, less
    },
    root : rootPath,

    db : {
        url : "mongodb://localhost/db-name" // url to database
    },

    jsonp : true, // allow jsonp requests
    secret : 'MYAPPSECRET',
    protocol : 'http://',
    autoLoad : false, // whether to autoload controllers & models
}



// some default meta setting for head
app.site.meta = {
    description : '',
    keywords : '',
    viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
    encoding : "utf-8"
}
```


### [config.js](config/config.js)

There are a few environment specific setting you can adjust here:

```
// global settings
app.site.domain = "localhost"; // domain the site is running on
app.site.environment = "Development"; // name of environment
app.site.url = app.config.protocol + app.site.domain + ':'  + app.config.port + '/'; // base url

// directories location to use for dynamic file linking
app.site.dir = {
    css : app.site.url + "css/",
    img : app.site.url + "img/",
    lib : app.site.url + "lib/",
    js : app.site.url + "js/"
};
```


### Environmental Settings

There are three environments provided by default, __development__, __test__, and __production__. Each of these environments has the following configuration options:
* __db__ - This is the name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment.
* __app.name__ - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google, Twitter. You can specify your own social application keys here for each platform:
  * __clientID__
  * __clientSecret__
  * __callbackURL__

To run with a different environment, just specify NODE_ENV as you call grunt:

  $ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

  $ NODE_ENV=test node server

> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.



## Included Packages
#### Defined as npm modules in the [package.json](package.json) file.
* [Express](http://expressjs.com/) - Sinatra inspired web development framework
* [Mongoose](http://mongoosejs.com/) - elegant mongodb object modeling for node.js
* [Passport](http://passportjs.org/) - Simple, unobtrusive authentication for Node.js.
* [Jade](http://jade-lang.com/) - robust, elegant, feature rich template engine for nodejs
* [Stylus](http://learnboost.github.io/stylus/) - Robust, expressive, and feature-rich CSS superset
* [Superagent](https://github.com/visionmedia/superagent) - Elegant & feature rich browser / node HTTP with a fluent API
* [MD5](https://github.com/pvorb/node-md5) - native js function for hashing messages with MD5

#### Defined as bower modules in the [bower.json](bower.json) file.
* [AngularJS](http://angularjs.org) - HTML enhanced for web apps!
* [Zepto.js](http://zeptojs.com/) - Minimalist JavaScript library for modern browsers, with a jQuery-compatible API
* [jQuery](http://jquery.com/) - jQuery JavaScript Library



## Troubleshooting
During install some of you may encounter some issues, most of this issues can be solved by one of the following tips.
If you went through all this and still can't solve the issue, feel free to contact me(Amos), via the repository issue tracker or the links provided below.

#### Update NPM, Bower or Grunt
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*, usually updating those tools to the latest version solves the issue.

Updating NPM:
```
$ npm update -g npm
```

Updating Grunt:
```
$ npm update -g grunt-cli
```

Updating Bower:
```
$ npm update -g bower
```

#### Cleaning NPM and Bower cache
NPM and Bower has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

NPM Clean Cache:
```
$ npm cache clean
```

Bower Clean Cache:
```
$ bower cache clean
```


## Heroku Quick Deployment
Before you start make sure you have <a href="https://toolbelt.heroku.com/">heroku toolbelt</a> installed and an accessible mongo db instance - you can try <a href="http://www.mongohq.com/">mongohq</a> which have an easy setup )

```bash
git init
git add .
git commit -m "initial version"
heroku apps:create
git push heroku master
```

## Credits
Built on top of the [MEAN Stack](https://github.com/linnovate/mean) by [Amos Haviv](https://twitter.com/amoshaviv)

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
