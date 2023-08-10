<?php

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});


Route::group(['prefix' => 'users'], function () {

  Route::get('/', function () {
    return Student::all();
  });

});
