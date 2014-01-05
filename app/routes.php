<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Route::get('/', function()
// {
//  return View::make('hello');
// });

// Route::get('/', 'HomeController@showWelcome');
Route::get('/', array('as' => 'home', 'uses' => 'HomeController@showHome'));

// Show form
Route::get('/upload-form', function()
{
    echo Form::open(array('url' => 'image/save', 'files'=>true));
    echo Form::file('myfile[]', array('multiple'=>true));
    echo Form::submit();
    echo Form::close();
});

Route::get('dump',function() {
  var_dump(storage_path());
});

Route::post('image/save', 'UploadController@upload');

Route::post('foo/bar', function() {
  var_dump('$file');
});

Route::get('foo/bar', function() {
  var_dump(storage_path());
});
