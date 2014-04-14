# Tesla.js
[![NPM version](https://badge.fury.io/js/tesla.png)](http://badge.fury.io/js/tesla)
[![Dependency Status](https://gemnasium.com/teslajs/tesla.js.png)](https://gemnasium.com/teslajs/tesla.js)


###### NOTE: This is the Tesla.js source code. You probably want to install the [command line client](https://www.npmjs.org/package/tesla-cli).

###### Full Docs: [teslajs.com](http://teslajs.com/)
###### Updates: [twitter.com/teslajs](http://twitter.com/teslajs/)

## About 
Tesla is a modern MVC style framework built on to of [Node.js](http://nodejs.org/) and [Express](http://expressjs.com/). It's designed to be as flexible as possible, and includes sane default and easily configurable boilerplates to get you up an running as quickly as possible.

It's still a work in progress, with more features being added, and while the current build seems stable, bug reports are always apreciated!

## Features

#### MVC
Simple but useful MVC structure with optional scaffolding to auto-create models, controllers & even a simple JSON API for you. Models use Node-ORM so you’re not tied to a specific database.

#### Auto-routing
If your url’s follow the domain.com/controller/action/:id format, there’s no need to create any custom routing, it will just automatically load the controller/view if it’s found, and throw a 404 if it’s not.

#### Flexible Templates
You can choose from EJS, Handlebars, Hogan, Jade or Handlebars for templates. Less, Sass & Stylus are available for css pre-processors (with additional support for Bourbon, Axis & Nib libraries).

#### Boilerplates
Tesla uses a combination of npm and Bower to help create some useful boilerplates when setting up a new app. You can choose to have Tesla add things like jQuery, AngularJS, Foundation, etc. to your view templates automatically when it creates the project.

#### Auto-watch & LiveReload
Tesla utilizes the Grunt task runner to watch for file changes, restarting the server when necessary. It also comes with LiveReload out of the box to auto refresh your browser when files change.

#### Easy Configuration
Almost all of the server settings (port number, database settings, etc.) can be easily updated in the config file.




## Installation

#### Prerequisites:

[Node.js](http://nodejs.org/) & [NPM](https://npmjs.org/) are the only absolute requirements, but it's highly recommended that you install [Gulp](http://gulpjs.com/) as well:
  
```
$ npm install gulp -g
```
While it's not required, Tesla is configured to use Gulp for the majority of it's tasks. If you have any trouble installing it, refer to the [Grunt documentation](http://gruntjs.com/getting-started#installing-the-cli) for help.
 

#### Install Tesla
Once you have NPM up & running, getting Tesla installed is pretty painless:

```
$ npm install tesla-cli -g
```


## Quick Start

Now that you have the command-line tool installed, you can create your first app:

```
$ tesla mysite
```

This will create a new barebones site with the name "mysite". Next, install dependencies:

```
$ cd mysite && npm install
```

Start the server:

```
$ gulp
```

Once the server has started, simply point your browser to: [http://localhost:3000](http://localhost:3000)

If you choose not to use Grunt, you can start the server by running ```node server.js```. But using Grunt gives you some extras such as livereload, and watching for changes your files & restarting the server whenever necesary.



## Setup Options
As you've seen, firing up a basic barebones site is pretty easy, but it's also a bit boring. Tesla is a lot more powerful than that, and it comes with a number of options that lets you create a boilerplate site with much more useful features


##### MVC Scaffolding
Tesla includes a generator that will do the dirty work of creting & linking controllers, models & views for you. Let's say you have a databse of users that you want to interact with:

```
$ tesla generate user
```

This one command will give you basic CRUD functionality via a very simple JSON api. See the [working with data](https://github.com/teslajs/tesla.js#working-with-data) section for more info on scaffolding as well as working with models, controllers & views.


##### HTML templating engines
By default, Tesla use Jade for HTML templates, but it supports 5 different templating languages: 

Options:

+ ```--html ejs``` [EJS](http://embeddedjs.com/) - uses [ejs](https://npmjs.org/package/ejs) npm package
+ ```--html handlebars``` [Handlebars](http://handlebarsjs.com/) - uses [hbs](https://npmjs.org/package/hbs) npm package
+ ```--html hogan``` [Hogan.js](http://twitter.github.io/hogan.js/) - uses [hogan-middleware](https://npmjs.org/package/hogan-middleware) npm package
+ ```--html jade``` [Jade](http://jade-lang.com/) (default) - uses [jade](https://npmjs.org/package/jade) npm package
+ ```--html mustache``` [Mustache](http://mustache.github.io/) - uses [mustache-express](https://npmjs.org/package/mustache-express) npm package

Example:

```
$ tesla myapp --html handlebars
```


##### CSS pre-processors
The default setting will just use plain ol' regular CSS. But if you want to use a css preprocessor, you have three options:

**Options:**

+ ```--css less``` [Less](http://lesscss.org/) - uses [less](https://npmjs.org/package/less) npm package
+ ```--css sass``` [Sass](http://sass-lang.com/) - uses [sass](https://npmjs.org/package/sass) npm package
+ ```--css stylus``` [Stylus](http://learnboost.github.io/stylus/) - uses [stylus](https://npmjs.org/package/stylus) npm package

**Example:**

```
$ tesla myapp --css stylus
```

##### CSS helper libraries

**Options:**

+ ```--axis``` [Axis](http://roots.cx/axis/) for Stylus - uses [axis](https://npmjs.org/package/axis) npm package
+ ```--bourbon``` [Bourbon](http://bourbon.io/) for Sass - uses [node-bourbon](https://npmjs.org/package/node-bourbon) npm package
+ ```--nib``` [Nib](http://visionmedia.github.io/nib/) for Stylus - uses [nib](https://npmjs.org/package/nib) npm package

###### NOTE: These helper libraries aren't fully tested yet, so please report any bugs you may find.


### Front-End Tools
Tesla utilizes Bower to let you quickly add many of your favorite front-end tools such as jQuery, Angular or Bootstrap. If you select any of these options, the package(s) will be added to your bower file, and any javascript or css dependencies will automatically added to the default views.


##### JavaScript Application Frameworks

**Options:**

+ ```--angular``` [AngularJS](http://angularjs.org/)
+ ```--backbone``` [Backbone.js](http://backbonejs.org/)
+ ```--ember``` [Ember.js](http://emberjs.com/)

**Example:**

```
$ tesla myapp --backbone
```

##### JavaScript Libraries

**Options:**

+ ```--jquery``` [jQuery](http://jquery.com/)
+ ```--modernizr``` [Modernizr](http://modernizr.com/)
+ ```--zepto``` [Zepto.js](http://zeptojs.com/)

**Example:**

```
$ tesla myapp --zepto
```


##### CSS Frameworks

**Options:**

+ ```--bootstrap``` [Bootstrap](http://getbootstrap.com/)
+ ```--foundation``` [Foundation](http://foundation.zurb.com/)
+ ```--gumby``` [Gumby](http://gumbyframework.com/)
+ ```--skeleton``` [Skeleton](http://www.getskeleton.com/)

**Example:**

```
$ tesla myapp --gumby
```

### Real World Examples:
You can combine any number of the above options to customize your application to your liking:

**Example 01: Create an app called foobar that uses EJS, Sass, AngularJS, & jQuery**

```
$ tesla foobar --html ejs --css sass --angular --jquery
```


**Example 02: Create an app called coil using Handlebars, Stylus, Axis, Foundation, Ember & jQuery**

```
$ tesla coil --html handlebars --css stylus --axis --foundation --ember --jquery
```


#### All Tesla CLI Options:
Below is a reference listing all of the available options for the command-line tool:

```
Usage: tesla [options]

Options:

  // BASIC SETTINGS
  -H, --html <engine>  templating engine: (ejs|handlebars|hogan|jade|mustache) (defaults to Jade)
  -C, --css <engine>   add stylesheet support (less|sass|stylus) (defaults to vanilla css)
  -V, --version        output the version number
  -F, --force          force on non-empty directory
  
  // PRE-PROCESSOR LIBRARIES
  --axis               add Axis support for Stylus
  --bourbon            add Bourbon support for Sass
  --nib                add Nib support for Stylus
  
  // FE FRAMEWORKS
  --angular            add support for AngularJS
  --backbone           add support for BACKBONE.JS
  --ember              add support for Ember.js
  
  // JS LIBRARIES
  --jquery             add support for jQuery
  --mootools           add support for MooTools
  --zepto              add support for Zepto.js
  
  // CSS FRAMEWORKS
  --bootstrap          add support for Bootstrap
  --foundation         add support for Foundation
  --gumby              add support for Gumby
  --skeleton           add support for Skeleton  
  
  // OTHER SETTINGS
  generate <name>      generate new model + controller with basic CRUD functionality
  start                start the web server (still a bit buggy, best just just run "grunt" for now)
```


## Configuration
All configuration for Tesla is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file and the [env](config/env/) files. This is where you will need to specify your application name, database connection, and any other settings you would like to customize.

##### Default config file: [config/_settings.js](config/_settings.js)
Most default settings can be set & updated here:

```
app.site = {
    name : "tesla.js", // the name of your app
}

app.config = {

    port : 3000, // port to run the server on

    liveReload : {
        use: true,
        port : 35729, // port to run the server on
    },

    prettify : {
        html : true, // whether to pretify html
        css : true, // whether to pretify css
        js : true // whether to pretify js
    },

    cache : false, // whether to use caching

    api : {
        enabled : true, // set false to disable json output for scafolding
        format : 'json', // format to output in api views
        access : '*' // placeholder for future api security enhancement
    },

    engines : {
        html: "jade", // options: (ejs|handlebars|hogan|jade|mustache)
        css: false, // options: (stylus|sass|less) - set false to just use vanilla css
        cssLibrary: false, // options: (axis|bourbon|nib) - set to false for none
    },

    root : rootPath, // path to the root of your server

    // see https://github.com/dresende/node-orm2/wiki/Connecting-to-Database for more info on connection to your databse
    db : {
        url : "driver://username:password@hostname/database", // url to database
        driver: "mongodb" // which db driver to use
    },

    jsonp : true, // allow jsonp requests
    secret : 'MYAPPSECRET', // placeholder for now, will be implemented later
    protocol : 'http://', // options: (http|https)
    autoLoad : true, // whether to attempt autoload controllers
    autoRouting : true, // whether to use auto routing
    publicDir : './public', // public directory where images, javascript, css, etc is stored

    logging : {
        console: true, // whether to allow tesla to log messages to the node console
        files: false // this doesn't do anything yet, eventually it will write .log files
    }
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
// GET IP / DOMAIN
var interfaces = os.networkInterfaces();
var addresses = [];
for (k in interfaces) {
    for (k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family == 'IPv4' && !address.internal) {
            addresses.push(address.address)
        }
    }
}

var tesla = require('../../lib/tesla')(app);

// global settings
app.site.domain = addresses[0];
app.site.environment = "development";
app.site.url = app.config.protocol + app.site.domain + ':'  + app.config.port + '/'; // base url

// directories
app.site.dir = {
    css : app.site.url + "css/",
    img : app.site.url + "img/",
    lib : app.site.url + "lib/",
    js : app.site.url + "js/"
};
```



## Routing
Tesla comes with an automatic routing system which should save you the trouble of manually creating routes for your site 99% of the time. The routing is based on the following URI structure:

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

If it does not find a matching controller, the router will throw a 404 error.

You are of course free to create your own custom routes if the default url scheme doesn't work for your site.


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
$ npm update npm -g
```

Updating Grunt:
```
$ npm update gulp -g
```

Updating Bower:
```
$ npm update bower -g
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

