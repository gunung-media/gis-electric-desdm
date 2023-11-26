<?php

namespace App\Repositories\Report;

use App\Models\Report\Report;
use App\Models\Report\ReportTracking;
use Illuminate\Database\Eloquent\Collection;

class ReportTrackingRepository
{
    public function __construct(
        protected ReportTracking $model = new ReportTracking()
    ) {
    }

    public function getTrackings(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getTracking(int $id): ?ReportTracking
    {
        return $this->model->findOrFail($id);
    }

    public function insertTracking(array $data): Report
    {
        return $this->model->create($data);
    }

    public function getReportTrackings(int $reportId): ?Collection
    {
        return $this->model->where('report_id', $reportId)->get();
    }
}
