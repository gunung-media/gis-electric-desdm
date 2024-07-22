<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticateController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Admin/Auth/Login');
    }

    public function store(Request $request): mixed
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ]);

        if (auth()->attempt($request->only('username', 'password'))) {
            $request->session()->regenerate();
            return redirect(route('admin.dashboard'));
        }

        return back()->withErrors([
            'auth' => "The username/password do not match with our records"
        ]);
    }

    public function destroy(Request $request): mixed
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(route('login'));
    }
}
