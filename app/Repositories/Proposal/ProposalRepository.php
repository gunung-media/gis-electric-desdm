<?php

namespace App\Repositories\Proposal;

use App\Models\Proposal\Proposal;
use Illuminate\Database\Eloquent\Collection;

class ProposalRepository
{
    public function __construct(
        protected Proposal $model = new Proposal()
    ) {
    }

    public function getProposals(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getProposal(int $id): ?Proposal
    {
        return $this->model->findOrFail($id);
    }

    public function insertProposal(array $data): Proposal
    {
        return $this->model->create($data);
    }
}
