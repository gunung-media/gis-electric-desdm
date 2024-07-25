<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserRepository
{
    public function __construct(
        protected User $user = new User()
    ) {}

    public function insert(array $data): Model|User
    {

        return $this->user->create($data);
    }

    public function getUsers(): Collection|array
    {
        return $this->user
            ->get();
    }

    public function getUser(string $id): Model|Collection|Builder|array
    {
        return $this->user
            ->findOrFail($id);
    }
}
