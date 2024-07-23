<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\MemberRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    public function __construct(
        protected MemberRepository $memberRepository = new MemberRepository()
    ) {}

    public function index(): Response
    {
        $members =  $this->memberRepository->getMembers();
        return Inertia::render('Admin/Member/Index', [
            'members' => $members
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Member/Form');
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'nik' => 'required|unique:members,nik',
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'village_code' => 'required',
        ]);

        try {
            $this->memberRepository->insert([...($request->all())]);
            return redirect(route('admin.member.index'))->with('status', 'Sukses Menambah Member');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Member']);
        }
    }

    public function edit(string $id): Response
    {
        $member = $this->memberRepository->getMember($id);
        return Inertia::render('Admin/Member/Form', [
            'member' => $member
        ]);
    }

    public function update(Request $request, string $id): mixed
    {
        $request->validate([
            'nik' => 'required|unique:members,nik',
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'village_code' => 'required',
        ]);

        try {
            $member = $this->memberRepository->getMember($id);
            $member->update([...($request->all())]);
            return redirect(route('admin.member.index'))->with('status', 'Sukses Mengedit Member');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal Mengedit Member']);
        }
    }

    public function destroy(string $id): mixed
    {
        $member = $this->memberRepository->getMember($id);
        $member->delete();
        return redirect(route('admin.member.index'))->with('status', 'Sukses Menghapus Member');
    }
}
