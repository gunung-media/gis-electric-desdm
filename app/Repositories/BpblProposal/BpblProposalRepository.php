<?php

namespace App\Repositories\BpblProposal;

use App\Models\BpblProposal\BpblProposal;
use Illuminate\Database\Eloquent\Collection;

class BpblProposalRepository
{
    public function __construct(
        protected BpblProposal $model = new BpblProposal()
    ) {}

    public function getBpblProposals(int|null $memberId = null, int|string|null $villageCode = null): Collection
    {
        $query = $this->model->query();
        if ($memberId) {
            $query->where('member_id', $memberId);
        }
        if ($villageCode) {
            $query->where('village_code', $villageCode);
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

    /**
     * @param array<mixed,mixed> $array
     */
    public function updateBpblProposal(string $id, array $array)
    {
        return $this->model->where('id', $id)->update($array);
    }
}
