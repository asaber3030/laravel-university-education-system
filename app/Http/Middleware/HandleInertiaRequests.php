<?php

namespace App\Http\Middleware;

use App\Models\Student;
use App\Models\StudentNotifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
      if (Auth::user()) {
        return array_merge(parent::share($request), [
          'csrf' => csrf_token(),
          'appURL' => 'http://127.0.0.1:8000/',
          'auth' => [
            'user' => $request->user(),
            'notifications' => StudentNotifications::with('professor')->where('student', auth()->id())->orderBy('id', 'desc')->get()
          ],
          'customErrors' => session('customErrors'),
          'professor' => [
            'authorized' => auth()->guard('professors')->check(),
            'data' => auth()->guard('professors')->user()
          ],
          'flash' => [
            'message' => session('flashMessage'),
            'type' => session('flashMessageType')
          ],
          'ziggy' => function () use ($request) {
            return array_merge((new Ziggy)->toArray(), [
              'location' => $request->url(),
            ]);
          },
          'user' => Student::with('year', 'department')->where('id', Auth::user()->getAuthIdentifier() ?? 1)->get()->first()
        ]);
      } else {
        return array_merge(parent::share($request), [
          'csrf' => csrf_token(),
          'appURL' => 'http://127.0.0.1:8000/',
          'auth' => [
            'user' => $request->user(),
            'notifications' => StudentNotifications::with('professor')->where('student', auth()->id())->orderBy('id', 'desc')->get()
          ],
          'customErrors' => session('customErrors'),
          'professor' => [
            'authorized' => auth()->guard('professors')->check(),
            'data' => auth()->guard('professors')->user()
          ],
          'flash' => [
            'message' => session('flashMessage'),
            'type' => session('flashMessageType')
          ],
          'ziggy' => function () use ($request) {
            return array_merge((new Ziggy)->toArray(), [
              'location' => $request->url(),
            ]);
          },
        ]);
      }
    }
}
