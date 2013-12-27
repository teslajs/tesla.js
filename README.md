# Tesla.js (beta)
[![NPM version](https://badge.fury.io/js/tesla.png)](http://badge.fury.io/js/tesla)
[![Dependency Status](https://gemnasium.com/teslajs/tesla.js.png)](https://gemnasium.com/teslajs/tesla.js)

Tesla.js is a boilerplate [node.js](http://www.nodejs.org/) framework, with some basic MVC features. It's still a work in progress and will be at least few more weeks before it's feature complete.

# Contents
#####[Prerequisites](#prerequisites)

#####[Included Packages](#included-Packages)

#####[Installation](#installation)

#####[Quick Start](#quick-start)

#####[Configuration](#configuration)
+ [App Settings](#default-config-file-configjs)
+ [Environmental Settings](#environmental-settings)

#####[Models, Controllers & Views, Oh My!](#models-controllers--views-oh-my)
+ [Routing](#routing)
+ [Controllers](#controllers)
+ [Views](#views)
+ [Models](#models)

#####[Troubleshooting](#troubleshooting)

#####[Heroku Quick Deployment](#heroku-quick-deployment)


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


## Installation
```
$ npm install -g tesla-cli
```

## Quick Start

Once Tesla is installed, simply run the following command anytime you want to create a new app:

```
$ tesla app-name
```

This will create a new app with the name "app-name". Next, switch into your new apps directory:

```
$ cd app-name
```

Than install dependencies:
```
$ npm install
```

And finally start the server:
```
$ grunt
```

Once the server has started, simply point your browser to:

```
http://localhost:3000
```



### Options
```
Usage: tesla [options]

Options:

  -V, --version       output the version number
  -e, --ejs           add ejs engine support (defaults to jade)
  -J, --jshtml        add jshtml engine support (defaults to jade)
  -H, --hogan         add hogan.js engine support (defaults to jade)
  -c, --css           add stylesheet  support (less|sass|stylus) (defaults to plain css)
  --nib               add support for nib to stylus
  --axis              add support for axis to stylus
  -f, --force         force on non-empty directory
  generate <name>     generate new model + controller with basic CRUD functionality
  start               start the web server (still a bit buggy, best just just run "grunt" for now)
```

For example, if you want to generate an application called "foobar" with Jade & Stylus support you would simply execute:

```
$ tesla --css stylus foobar
```


Or to generate an application with EJS & SASS support:

```
$ tesla --css sass --ejs foobar
```



### Option 2: Clone The Repo
The second option is to simply clone the repo and use it as a barebones boilerplate to start your next project.

```
$ git clone git@github.com:teslajs/tesla.js.git
```

This is the most light-weight option and gives you the most control over how you set your project up.

However, this step requires a few additional steps to configure correctly:

##### 1. Set your app name

Open [app/config/config.js](app/config/config.js) and set the "app.site.name" to your app name.
Open [package.json](package.json) and set the "name" to your app name.


##### 2. Set your HTML templating & CSS processing engines

Open [app/config/config.js](app/config/config.js) and set your engines:

```
app.config = {

    engines : {
        html: "jade", // options: [jade|ejs|haml|hjs|jshtml]
        css: "stylus", // options: [stylus|sass|less]
    },

}
```

Install NPM modules

```
// Install your selected HTML engine
$ npm install jade // for Jade
$ npm install ejs // for EJS
$ npm install jshtml // for JSHTML
$ npm install express-hogan // for HJS (Hogan)

// Install your selected CSS engine
$ npm install less // for LESS
$ npm install sass // for SASS
$ npm install stylus // for STYLUS
```

Next, go into the [app](app) folder and rename the view folder you want to use to "views". For example if you're using Jade, rename "views.jade" to "views". Delete the rest.

Finally, do the same for the css directory. Go into the [public](public) folder and rename the css directory you want to use. To use Stylus, rename "stylus.css" to "css" and delete the rest of the folders. If you don't want to use a css processor, keep the current "css" folder and delete the rest.


##### 3. Install Dependencies

Now that everything is configured, cd into your app directory and run the following command:

```
$ npm install
```


##### Start the Server

We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

```
$ grunt
```

This will watch for changes to any of your files and automatically restart then server when necesary. If you choose not not using Grunt, you can run the app like so:

```
$ node server
```

With this method you have to manually stop and start the server any time you make changes.

Once the server has started, simply point your browser to:

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

## Routing
Tesla comes with an automatic routing system which saves you the trouble of manually creating routes for your site. The routing is based on the following URI structure:

```
http://localhost:3000/controller/action/:id
```

Let's say you called the following url:

```
http://localhost:3000/foo/bar
```

The router will attempt to find a matching controller in this order:

1. app/controllers/fooController.js
2. app/controllers/foo/indexController.js
3. app/controllers/foo/barController.js

If it does not find a matching controller, the router will throw a 404 error. You are of course free to create your own custom routes if the default url scheme doesn't work for your site.


## Working with data

Creating models & working with data in Tesla is super simple. It takes only 2 steps:

1) To work with data, make sure you set the URL for your database (config.db.url) in the [config file](https://github.com/teslajs/tesla.js/blob/master/config/config.js).

2) Generate new model: let's say you have a collection called "user" you want to use with your app, all you need to do is run the following command:

```
$ tesla generate user
```

this will create 2 new files for you:
- app/models/user.js
- app/controllers/userController.js


#### Models

As long as your databse URL is set properly, this is all you need to do. However, you will almost certainly want to open up your new model and define the schema for your collection or table.

In this file, you will see a block that looks something like this:

```
// DEFINE MODEL SCHEMA
// Be sure to add some files to the schema below or you will not have success quering or adding to the database
var Model = db.define("user", {
    created   : { type: "date", time: true },
    updated   : { type: "date", time: true }
    // _id : { type: "text" },
    // name      : { type: "text", required: true },
    // isAdmin : { type: "boolean", defaultValue: false },
}, {
    validations: {
        // EXAMPLE VALIDATIONS
        // password: orm.enforce.security.password('luns5', 'Passowrd does not meet min security requirements.'),
        // email: orm.enforce.patterns.email('Please enter a valid email address.')
        // More Options : https://github.com/dresende/node-enforce
    }
});
```

Here you will want to define what fields you want to be able to read/update in the collection. In the example above, this model only has access to "created" and "updated" fields. But it's almost certain that you will need to add more fields than this. There are a few commented out examples included to get you started.

Tesla uses [Node-ORM](https://github.com/dresende/node-orm2) to provide add basic ORM functionality. For more info on definifing models & validations,[have a look at the ORM wiki](https://github.com/dresende/node-orm2/wiki).

Once you have your schema setup, that should be about all you need to with the model do in most cases. But feel free to muck about further down in the file if you need to do some more customization.

#### Controllers

By default, Tesla will serve up your data via a RESTful JSON api. If this is the result you want, you shouldn't need to make any changes to the generated controller. You get the following URI scheme by default:

```
http://localhost:3000/user/all
http://localhost:3000/user/create?data&goes&here
http://localhost:3000/user/delete/:id
http://localhost:3000/user/find?query&terms&here
http://localhost:3000/user/update/:id
```

It's worth noting that delete & update require to pass the databse ID, while create & find accept arguments via GET parameters. Create maps each GET parameter to a field in the databse (POST/PUT support will come in the next iteration). For example, if you want add the following data to your collection/table:

```
name: Bob
email: bob@marley.com
```

you would simple enter this into the browser:

```
http://localhost:3000/user/create?name=Bob&email=bob@marley.com
```

Similarly, if you want to retrieve all the records of people names Bob, you would build a request like this:

```
http://localhost:3000/user/find?name=Bob
```

and you will get back something like this:

```
[
	{
		name: "Bob"
		email: "bob@marley.com"
	},
	{
		name: "Bob"
		email: "bob@dylan.com"
	}
]
```

Now, if you would rather serve up a proper HTML view, it's a simple change, just open up your [config file]() and set "config.api.enabled" to "false". Now, it will map the request to the appropriate view. By default, you get 5 (all, create, delete, find, update) views. Continuing with our user example, you will get the following url > view mapping:

```
http://localhost:3000/user/all  >  app/views/all
http://localhost:3000/user/create?data&goes&here  >  app/views/create
http://localhost:3000/user/delete/:id  >  app/views/delete
http://localhost:3000/user/find?query&terms&here  >  app/views/find
http://localhost:3000/user/update/:id  >  app/views/update
```

These are all setup in the controller, however you will need to create the appropriate view files or you will get a 404 error. The data from each request (which was previously spit out as a JSON view) will be sent to the view as an object called "data".


## Views

Views can use Jade (default), Haml, Handlebars or EJS (though I've only tested with Jade so far). See the appropriate documentation for your chosen templating language for more info on how to use it.


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


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/teslajs/tesla.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

