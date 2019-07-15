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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/clear_cache', function () {

    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    return '<h1>Caches Borradas</h1>';
});

Route::get('/dbinstall', function () {

    Artisan::call('migrate:fresh');
    Artisan::call('passport:install');

    return '<h1>Instalacion de Base de Datos Exitosa</h1>';
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
