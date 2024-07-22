<?php

namespace App\Repositories\BpblProposal;

use App\Models\BpblProposal\BpblProposalTracking;
use Illuminate\Database\Eloquent\Collection;

class BpblProposalTrackingRepository
{
    public function __construct(
        protected BpblProposalTracking $model = new BpblProposalTracking()
    ) {}

    public function getTrackings(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getTracking(int $id): ?BpblProposalTracking
    {
        return $this->model->findOrFail($id);
    }
    /**
     * @param array<int,mixed> $data
     */
    public function insertTracking(array $data): BpblProposalTracking
    {
        return $this->model->create($data);
    }

    public function getBpblProposalTrackings(int $proposalId): ?Collection
    {
        return $this->model->where('bpbl_proposal_id', $proposalId)->get();
    }
}
