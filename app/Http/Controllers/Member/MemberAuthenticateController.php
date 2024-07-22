<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberAuthenticateController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Member/AuthMember/Login');
    }

    public function store(Request $request): mixed
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ]);

        if (auth('member')->attempt($request->only('username', 'password'))) {
            $request->session()->regenerate();
            // return redirect(route('member.dashboard'));
            return redirect()->intended(route('member.dashboard'));
        }

        return back()->withErrors([
            'auth' => "The username/password do not match with our records"
        ]);
    }

    public function destroy(Request $request): mixed
    {
        auth('member')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(route('member.login'));
    }
}
