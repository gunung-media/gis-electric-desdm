<?php

namespace App\Repositories\BpblProposal;

use App\Models\BpblProposal\BpblProposal;
use Illuminate\Database\Eloquent\Collection;

class BpblProposalRepository
{
    public function __construct(
        protected BpblProposal $model = new BpblProposal()
    ) {}

    public function getBpblProposals(): Collection
    {
        $query = $this->model->query();
        return $query
            ->with('village')
            ->get();
    }

    public function getBpblProposal(int $id): ?BpblProposal
    {
        return $this->model->with(['village', 'trackings'])->findOrFail($id);
    }

    public function insertBpblProposal(array $data): BpblProposal
    {
        return $this->model->create($data);
    }
}
