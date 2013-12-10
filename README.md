# Tesla.js (beta)

Tesla.js is a boilerplate [node.js](http://www.nodejs.org/) framework, with some basic MVC features. It's still a work in progress and will be at least few more weeks before it's feature complete.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

## Included Packages
#### NPM modules in the [package.json](package.json) file.
* [Express](http://expressjs.com/) - Sinatra inspired web development framework
* [Mongoose](http://mongoosejs.com/) - elegant mongodb object modeling for node.js
* [Passport](http://passportjs.org/) - Simple, unobtrusive authentication for Node.js.
* [Jade](http://jade-lang.com/) - robust, elegant, feature rich template engine for nodejs
* [Stylus](http://learnboost.github.io/stylus/) - Robust, expressive, and feature-rich CSS superset
* [Superagent](https://github.com/visionmedia/superagent) - Elegant & feature rich browser / node HTTP with a fluent API
* [MD5](https://github.com/pvorb/node-md5) - native js function for hashing messages with MD5

#### Bower modules in the [bower.json](bower.json) file.
* [AngularJS](http://angularjs.org) - HTML enhanced for web apps!
* [Zepto.js](http://zeptojs.com/) - Minimalist JavaScript library for modern browsers, with a jQuery-compatible API
* [jQuery](http://jquery.com/) - jQuery JavaScript Library


## Quick Start
There are 2 ways that you can install tesla:

### Option 1: Clone The Repo
The first option to simply clone the repo and use it a barebones boilerplate to start your next project.

```
$ git clone git@github.com:teslajs/tesla.js.git
```

This is the most light-weight option and gives you the most control over how you set your project up.


### Option 2: Install the Command Line Tools
Tesla.js includes a simple command line tool ([tesla-cli](https://github.com/teslajs/tesla-cli)) to make creating and updating apps as simple as possible. You can install it easily with NPM:

```
$ npm install -g tesla-cli
```

Once Tesla is installed, simply run the following command anytime you want to create a new app:

```
$ tesla app-name
```

The example above will create a new app with the name "app-name"


### Install Dependencies

With either option 1 or option 2, you will need to make sure you have all the correct dependencies installed before you can start the server:

```
$ npm install
```

### Start the Server

##### We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

```
$ grunt
```

This will watch for changes to any of your files and automatically restart then server when necesary.

##### When not using Grunt, you can use:

```
$ node server
```

With this method you have to manually stop and start the server any time you make changes.

##### Once the server has started, simply point your browser to:

```
http://localhost:3000
```

## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file and the [env](config/env/) files. Here you will need to specify your application name, database name, and any other settings you would like to customize.

##### Default config file: [config.js](config/config.js)
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
        html: "jade", // specify view engine - options: jade, ejs, haml, hjs (hogan)
        css: "stylus", // specify css processor - options: stylus, sass, less
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


### Environmental Settings

To run with a different environment, just specify NODE_ENV as you call grunt:

```
$ NODE_ENV=test grunt
```

If you are using node instead of grunt, it is very similar:

```
$ NODE_ENV=test node server
```


##### Example config file for "development" environment: [config/env/development.js](config/env/development.js)

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


> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.



## Models, Controllers & Views, Oh My!

### Routing
Tesla comes with an automatic routing system which saves you the trouble of manually creating routes for your site. The routing is based on the following URI structure:

```
http://localhost:3000/controller/action
```

As an example, http://localhost:3000/home would load the following controller: app/controllers/home.js

Similarly, http://localhost:3000/foo/bar would load this controller: app/controllers/foo/bar.js


##### Autoloading
The exeption to this rule is if you set "autoLoad: true" in [config/config.js](config/config.js). In this case you only need to create a model and a view, as Tesla will attempt to automatically load the model and the view using the [app/controllers/auto.js](app/controllers/auto.js) controller.

With autoload, going to [http://localhost:3333/hello/world](http://localhost:3000/hello/world) will attempt to load the following files:

*Controller: app/controllers/auto.js
*Model: app/models/hello.js
*View: app/views/hello/world.jade

Autoload assumes a model with the name of the controller, and will try to find a record whose "name" field matches the action. Using [http://localhost:3000/articles/super-awesome-fun-time](http://localhost:3000/article/super-awesome-fun-time) as an example, autoload load use a model called "articles" and try to find a record with the name "super-awesome-fun-time":

```
articles.findOne({name: "super-awesome-fun-time"})
```

With autoloading, any data returned from the model will be sent to the view via the "data" variable. If no data is returned we assume the page does not exist and will throw a 404 error. Also worth noting, autoload expects to find a model to provide data to the view. If you forget to create a model with the correct name, you will get a 404 error when loading the page. If you don't want or need a model to provide data to your controller, or want to use a different URI structure, don't use autoload.



### Controllers
If you are not using autoload, you will need to create your own controllers, which couldn't be easier! For example, if you want to create the page http://localhost:3000/help, simply create a controller with the same name: app/controllers/help.

Then, add the following code:

```
exports.render = function(app) {

    app.res.render('help', {
        site: app.site
    });

};
```

The above code is pretty simple, it simply loads the view "app/views/help.jade" and passes it a "site" variable.

For a slightly for complex example, lets say you want to create a blog with the following uri structure: http://localhost:3000/article/read?id=12345

Let's assume also you also want use an "article" model to load an article with the id "12345". Create the file "app/controllers/article/read.js" with the following code:

```
var mongoose = require('mongoose'),
    Articles = mongoose.model( 'Article' ),

exports.render = function(app) {

    var id = req.query('id')

    Articles.findOne({_id: ud}).exec(function(err, article) {

        // IF WE GET AN ERROR
        if (err) {
            app.res.render('error', {
                status: 500
            });

        // IF NO DATA WAS RETURNED, THROW A 404
        } else if ( article === null) {
            app.res.status(404).render('404', {
                pageTitle : app.site.name + ' - Not Found',
                url: app.req.originalUrl,
                error: 'Not found',
                site: app.site
            });

        // IF NO PROBLEMS, RENDER PAGE
        } else {

            // LOAD THE ARTICLE/READ VIEW & PASS DATA FROM THE MODEL
            app.res.render('article/read', {
                article : article,
                site: app.site
            });

        }

        }

    });

};
```

### Views

Views can use Jade (default), Haml, Handlebars or EJS. See the appropriate documentation for you chosen templating language for more info on how to use it.


### Models

For models, Tesla uses [Mongoose](http://mongoosejs.com/) to connect to a MongoDB server. Documentation on working with Mongoos can be found here: [http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)




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
Inspired by the [MEAN Stack](https://github.com/linnovate/mean) by [Amos Haviv](https://twitter.com/amoshaviv) and [Express](https://github.com/visionmedia/express) by [TJ Holowaychuk](https://github.com/visionmedia)
