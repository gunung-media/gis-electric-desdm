<?php

namespace App\Repositories;

use App\Models\Member;

class MemberRepository
{
    public function __construct(
        protected Member $member
    ) {}

    public function insert(array $data)
    {

        return $this->member->create($data);
    }
}
