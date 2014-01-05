Installation
==================================


The 3 Step Process
---------------------------------

1. Install npm modules. From the root folder run:
  npm install

2. Install bower modules. From the root folder run:
  bower install

3. Enjoy a coffee.



First Run Only
---------------------------------

## Build process ##         

Please be sure to have [node] installed first.
http://nodejs.org/download/ 
This will install both Node.js engine and npm.


1. Install grunt
  npm install -g grunt-cli

2. Install bower
  npm install -g bower



More Information
---------------------------------
## Live Reload ##

Live Reload will run a node server instance in your app root folder, and start the livereload process.

LiveReload will watch your files and reload your browser on each save. 

To start the server run from the root folder:
  
  grunt server 

The task may quit when creating a new folder. Just restart with
  grunt server 
again.

The default setup the server will run on http://localhost:9073/


## LESS compiling ##
LESS compilation will be done on each file save action with
  grunt server

Compile LESS from terminal:
  grunt less

## Using Grunt Tools ##
To compile files for release run from the root folder:
  grunt release

This will modify index.html to use compiled files from the dist folder.

To switch back to dev version of index.html use:
  grunt dev

To debug compiled files use:
  grunt debug

To lint files:
  grunt jshint

JSLint will run always when you compile your files with:
  grunt release 

You may want to use 
  grunt jshint
during the dev/debug phase as well, to make sure your script is lint free. 

If you get an error similar as: [L36:C13] `TweenMax` is not defined, just include TweenMax in jshint globals, in the Gruntfile.js file.

## Using Karma unit tests runner##

To run karma daemon:
  grunt karma:daemon

For a single unit test:
  grunt karma:run
 

SVN Setup
----------------------------------
## Setting up and using svn:ignore with Subversion ##

Please don't commit `node_modules` and `tmp` folders.

svn propset -R svn:ignore -F .svnignore .

You can check what svn thinks is set using:
svn proplist -v .

Please remember to check out proplist after using --force argument in your commands.

If you want to contribute to generator-vanilla project please add `bower_components` to the proplist:
cd vendor
`svn propset svn:ignore bower_components .`


index.html edits
----------------------------------
Please be sure to edit index.target.html for all changes you want to have in your index.html. If grunt server is running it will compile index.target via watch task.

index.target.html has three different sections you can use it for different dev modes. When you're developing you app dev target will have all script dependencies. When ready to deploy, as part of the deploy process index.target will be modified to use only compiled versions of both js and css files. 

To run targethtml tasks from terminal:
grunt targethtml:dev      # dev target, you're using this in dev process
grunt targethtml:debug    # debug target, use this if you want to debug concatenated files
grunt targethtml:prd      # prd target, index.html will load compiled and minified source files
