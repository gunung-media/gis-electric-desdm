<?php

namespace App\Repositories;

use App\Models\DevelopmentPlan;
use Illuminate\Database\Eloquent\Collection;

class DevelopmentPlanRepository
{
    public function __construct(
        protected DevelopmentPlan $model = new DevelopmentPlan()
    ) {
    }

    public function getDevelopmentPlans(): Collection
    {
        $query = $this->model->query();
        return $query->get();
    }

    public function getDevelopmentPlan($id): ?DevelopmentPlan
    {
        return $this->model
            ->findOrFail($id);
    }

    public function insertDevelopmenPlan(array $data): DevelopmentPlan
    {
        return $this->model->create($data);
    }
}
