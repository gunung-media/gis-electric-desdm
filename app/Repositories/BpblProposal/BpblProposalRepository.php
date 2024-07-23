<?php

namespace App\Repositories\BpblProposal;

use App\Models\BpblProposal\BpblProposal;
use Illuminate\Database\Eloquent\Collection;

class BpblProposalRepository
{
    public function __construct(
        protected BpblProposal $model = new BpblProposal()
    ) {}

    public function getBpblProposals(int|null $memberId = null): Collection
    {
        $query = $this->model->query();
        if ($memberId) {
            $query->where('member_id', $memberId);
        }
        return $query
            ->with('village')
            ->get();
    }

    public function getBpblProposal(int $id): ?BpblProposal
    {
        return $this->model->with(['village', 'village.district', 'village.district.city', 'trackings'])->findOrFail($id);
    }

    public function insertBpblProposal(array $data): BpblProposal
    {
        return $this->model->create($data);
    }
}
