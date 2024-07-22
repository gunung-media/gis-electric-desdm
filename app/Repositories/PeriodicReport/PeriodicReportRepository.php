<?php

namespace App\Repositories\PeriodicReport;

use App\Models\PeriodicReport\PeriodicReport;
use Illuminate\Database\Eloquent\Collection;

class PeriodicReportRepository
{
    public function __construct(
        protected PeriodicReport $model = new PeriodicReport()
    ) {}

    public function getPeriodicReports(int|null $memberId = null): Collection
    {
        $query = $this->model->query();
        if ($memberId) {
            $query->where('member_id', $memberId);
        }
        return $query
            ->with('village')
            ->get();
    }

    public function getPeriodicReport(int $id): ?PeriodicReport
    {
        return $this->model->with(['village', 'trackings'])->findOrFail($id);
    }

    public function insertPeriodicReport(array $data): PeriodicReport
    {
        return $this->model->create($data);
    }
}
