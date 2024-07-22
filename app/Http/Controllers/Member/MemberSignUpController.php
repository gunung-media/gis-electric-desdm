<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Repositories\MemberRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberSignUpController extends Controller
{
    public function __construct(
        protected MemberRepository $memberRepository
    ) {}

    public function create(): Response
    {
        return Inertia::render('Member/AuthMember/Register');
    }

    public function store(Request $request): mixed
    {
        $this->validate($request, [
            'nik' => 'required|unique:members,nik',
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'village_code' => 'required',
        ]);

        if ($this->memberRepository->insert($request->all())) {
            return redirect(route('member.login'));
        }


        return back()->withErrors([
            'auth' => "The username/password do not match with our records"
        ]);
    }
}
