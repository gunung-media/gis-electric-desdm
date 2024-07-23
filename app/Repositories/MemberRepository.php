<?php

namespace App\Repositories;

use App\Models\Member;

class MemberRepository
{
    public function __construct(
        protected Member $member = new Member()
    ) {}

    public function insert(array $data)
    {

        return $this->member->create($data);
    }

    public function getMembers()
    {
        return $this->member
            ->with(['village',])
            ->get();
    }

    public function getMember(string $id)
    {
        return $this->member
            ->with(['village', 'village.district', 'village.district.city'])
            ->findOrFail($id);
    }
}
