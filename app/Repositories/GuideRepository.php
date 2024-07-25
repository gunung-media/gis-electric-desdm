<?php

namespace App\Repositories;

use App\Models\Guide;

class GuideRepository
{
    public function __construct(
        protected Guide $model = new Guide()
    ) {}

    public function insert(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $guide = $this->model->find($id);

        if ($guide) {
            $guide->update($data);
            return $guide;
        }

        return null;
    }

    public function getFirstGuide()
    {
        return $this->model->first();
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function getById(int $id)
    {
        return $this->model->find($id);
    }
}
