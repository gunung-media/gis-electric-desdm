<?php

namespace App\Repositories\PeriodicReport;

use App\Models\PeriodicReport\PeriodicReportTracking;
use Illuminate\Database\Eloquent\Collection;

class PeriodicReportTrackingRepository
{
    public function __construct(
        protected PeriodicReportTracking $model = new PeriodicReportTracking()
    ) {}

    public function getTrackings(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getTracking(int $id): ?PeriodicReportTracking
    {
        return $this->model->findOrFail($id);
    }
    /**
     * @param array<int,mixed> $data
     */
    public function insertTracking(array $data): PeriodicReportTracking
    {
        return $this->model->create($data);
    }

    public function getPeriodicReportTrackings(int $reportId): ?Collection
    {
        return $this->model->where('periodic_report_id', $reportId)->get();
    }
}
