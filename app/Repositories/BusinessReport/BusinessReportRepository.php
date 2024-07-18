<?php

namespace App\Repositories\BusinessReport;

use App\Models\BusinessReport\BusinessReport;
use Illuminate\Database\Eloquent\Collection;

class BusinessReportRepository
{
    public function __construct(
        protected BusinessReport $model = new BusinessReport()
    ) {}

    public function getBusinessReports(): Collection
    {
        $query = $this->model->query();
        return $query
            ->with('village')
            ->get();
    }

    public function getBusinessReport(int $id): ?BusinessReport
    {
        return $this->model->with(['village', 'trackings'])->findOrFail($id);
    }

    public function insertBusinessReport(array $data): BusinessReport
    {
        return $this->model->create($data);
    }
}
