<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Super Admin',
            'username' => 'admin',
            'password' => bcrypt('admin')
        ]);

        $this->call(ProvincesSeeder::class);
        $this->call(CitiesSeeder::class);
        $this->call(DistrictsSeeder::class);
        $this->call(VillagesSeeder::class);
        $this->call(IndonesianVillagesBorderSeeder::class);
    }
}
