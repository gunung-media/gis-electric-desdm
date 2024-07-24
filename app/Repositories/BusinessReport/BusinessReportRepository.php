<?php

namespace App\Repositories\BusinessReport;

use App\Models\BusinessReport\BusinessReport;
use Illuminate\Database\Eloquent\Collection;

class BusinessReportRepository
{
    public function __construct(
        protected BusinessReport $model = new BusinessReport()
    ) {}

    public function getBusinessReports(int|null $memberId = null): Collection
    {
        $query = $this->model->query();
        if ($memberId) {
            $query->where('member_id', $memberId);
        }
        return $query
            ->with('village')
            ->get();
    }

    public function getBusinessReport(int $id): ?BusinessReport
    {
        return $this->model->with(['village', 'village.district', 'village.district.city', 'trackings'])->findOrFail($id);
    }

    public function insertBusinessReport(array $data): BusinessReport
    {
        return $this->model->create($data);
    }

    /**
     * @param array<mixed,mixed> $array
     */
    public function updateBusinessReport(string $id, array $array)
    {
        return $this->model->where('id', $id)->update($array);
    }
}
