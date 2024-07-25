<?php

namespace App\Repositories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class MemberRepository
{
    public function __construct(
        protected Member $member = new Member()
    ) {}

    public function insert(array $data): Model|Member
    {

        return $this->member->create($data);
    }

    public function getMembers(): Collection|array
    {
        return $this->member
            ->with(['village',])
            ->get();
    }

    public function getMember(string $id): Model|Collection|Builder|array
    {
        return $this->member
            ->with(['village', 'village.district', 'village.district.city'])
            ->findOrFail($id);
    }
}
