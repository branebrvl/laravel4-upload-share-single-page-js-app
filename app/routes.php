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
    echo Form::open(array('url' => 'upload', 'files'=>true));
    echo Form::file('myfile[]', array('multiple'=>true));
    echo Form::submit();
    echo Form::close();
});

/* Images */
Route::post('upload', 'UploadController@upload');

Route::get('images', array(    
  'as' => 'images',          
  'uses' => 'ImageController@index'
));

Route::get('show/{id}', array(
  'as' => 'show_image',
  'uses' => 'ImageController@show'
));

Route::delete('user/image/destroy/{id}', array(
  'uses' => 'ImageController@destroy'
))->before('auth');

/* Register */
Route::get('register', array(
    'as' => 'show_register',
    'uses' => 'UserController@showRegister'
))->before('guest');

Route::post('register-user', array(
    'uses' => 'UserController@register'
))->before('guest');

/* User acc */
Route::get('user/images', array(
    'as' => 'images_user',
    'uses' => 'UserController@showImages'
))->before('auth');

Route::get('user/profile', array(
    'as' => 'profile_user',
    'uses' => 'UserController@showProfile' 
))->before('auth');

Route::post('user/profile/edit', array(
    'uses' => 'UserController@editProfile'
))->before('auth');

Route::get('user/account', array(
    'as' => 'account_user',
    'uses' => 'UserController@showAccount'
))->before('auth');

Route::post('user/account/edit', array(
    'uses' => 'UserController@editAccount'
))->before('auth');

Route::post('user/account/delete', array(
    'uses' => 'UserController@deleteAccount'
))->before('auth');

Route::get('user/notification/latest', array(
    'as' => 'notification_user',
    'uses' => 'UserController@showNotification'
))->before('auth');

Route::post('user/notification/read', array(
    'uses' => 'VoteController@markNotification'
))->before('auth');

Route::get('user/notification/history', array(
    'as' => 'notification_history',
    'uses' => 'UserController@showNotificationHistory'
))->before('auth');

/* echo */
Route::post('foo/bar', function() {
  var_dump('$file');
});

Route::get('foo/bar', function() {
  var_dump(storage_path());
});

Route::get('dump',function() {
  Log::info(storage_path());
  var_dump(storage_path());
});

Route::get('whoami',function() {
  echo exec('whoami');
});










