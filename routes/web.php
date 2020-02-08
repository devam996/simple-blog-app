<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function(){
    Route::post('/register', 'AuthController@Register');
    Route::post('/login', 'AuthController@Login');

    Route::group(['middleware' => 'jwt'], function (){
        Route::post('/blogs/add', 'BlogController@AddBlog');
        Route::get('/blogs/list', 'BlogController@ListBlogs');
    });
});

Route::get('/', function() {
    return View::make('app');
});       
Route::get('/{all}', function() {
    return View::make('app');
})->where('all', '[0-9A-Za-z\/]+');       