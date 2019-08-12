<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('test','TestController');

Route::prefix('v1')->group(function(){
    Route::post('login', 'ApiAuthController@login');
    Route::post('register', 'ApiAuthController@register');
    Route::post('getServerDate', 'ApiAuthController@getServerDate');
    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('getUser', 'ApiAuthController@getUser');
        Route::post('logout','ApiAuthController@logout');
        Route::post('logoutAll','ApiAuthController@logoutAll');
        Route::resource('packetAuction','PacketAuctionController');
        Route::post('buyPacket','PacketAuctionController@buyPacket');
        Route::post('setPacketWinner','PacketAuctionController@setPacketWinner');
    });
   });
