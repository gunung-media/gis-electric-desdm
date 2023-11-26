<?php

namespace App\Repositories\Report;

use App\Models\Report\Report;
use Illuminate\Database\Eloquent\Collection;

class ReportRepository
{
    public function __construct(
        protected Report $model = new Report()
    ) {
    }

    public function getReports(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getReport(int $id): ?Report
    {
        return $this->model->findOrFail($id);
    }

    public function insertReport(array $data): Report
    {
        return $this->model->create($data);
    }
}
