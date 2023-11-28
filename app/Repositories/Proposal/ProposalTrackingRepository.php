<?php

namespace App\Repositories\Proposal;

use App\Models\Proposal\ProposalTracking;
use Illuminate\Database\Eloquent\Collection;

class ProposalTrackingRepository
{
    public function __construct(
        protected ProposalTracking $model = new ProposalTracking()
    ) {
    }

    public function getTrackings(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getTracking(int $id): ?ProposalTracking
    {
        return $this->model->findOrFail($id);
    }

    public function insertTracking(array $data): ProposalTracking
    {
        return $this->model->create($data);
    }

    public function getProposalTrackings(int $proposalId): ?Collection
    {
        return $this->model->where('proposal_id', $proposalId)->get();
    }
}
