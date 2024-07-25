<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        protected UserRepository $userRepository = new UserRepository()
    ) {}

    public function index(): Response
    {
        $users =  $this->userRepository->getUsers();
        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/User/Form');
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        try {
            $this->userRepository->insert([...($request->all()), 'password' => bcrypt($request->password)]);
            return redirect(route('admin.admin.index'))->with('status', 'Sukses Menambah User');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah User']);
        }
    }

    public function edit(string $id): Response
    {
        $user = $this->userRepository->getUser($id);
        return Inertia::render('Admin/User/Form', [
            'user' => $user
        ]);
    }

    public function update(Request $request, string $id): mixed
    {
        $request->validate([
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        try {
            $user = $this->userRepository->getUser($id);
            $user->update([...($request->all()), 'password' => bcrypt($request->password)]);
            return redirect(route('admin.admin.index'))->with('status', 'Sukses Mengedit User');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal Mengedit User']);
        }
    }

    public function destroy(string $id): mixed
    {
        $user = $this->userRepository->getUser($id);
        $user->delete();
        return redirect(route('admin.admin.index'))->with('status', 'Sukses Menghapus User');
    }
}
