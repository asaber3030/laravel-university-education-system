<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentLoggined
{

    public function handle(Request $request, Closure $next)
    {
      if (Auth::hasUser()) {
        return $next($request);
      }
      return redirect()->route('login');
    }
}
