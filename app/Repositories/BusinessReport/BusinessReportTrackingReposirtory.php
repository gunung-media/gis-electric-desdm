<?php

namespace App\Repositories\BusinessReport;

use App\Models\BusinessReport\BusinessReportTracking;
use Illuminate\Database\Eloquent\Collection;

class BusinessReportTrackingReposirtory
{
    public function __construct(
        protected BusinessReportTracking $model = new BusinessReportTracking()
    ) {}

    public function getTrackings(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getTracking(int $id): ?BusinessReportTracking
    {
        return $this->model->findOrFail($id);
    }
    /**
     * @param array<int,mixed> $data
     */
    public function insertTracking(array $data): BusinessReportTracking
    {
        return $this->model->create($data);
    }

    public function getBusinessReportTrackings(int $reportId): ?Collection
    {
        return $this->model->where('business_report_id', $reportId)->get();
    }
}
