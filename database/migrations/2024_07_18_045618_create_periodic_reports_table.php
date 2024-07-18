<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('periodic_reports', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->string('nib');
            $table->string('npwp');
            $table->string('permit_number');
            $table->string('email');
            $table->string('phone_number');
            $table->integer('village_code');
            $table->text('address');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('description')->nullable();
            $table->enum('report_type', ['IUPTLS', 'IUPTLU', 'IUJPTL'])->default('IUPTLS');
            $table->string('sk_path')->nullable();
            $table->string('certificate_path')->nullable();
            $table->string('condition_path')->nullable();
            $table->string('periodic_path')->nullable();
            $table->timestamps();

            $table->foreign('village_code')
                ->on(config('indonesia.table_prefix') . 'villages')
                ->references('code')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periodic_reports');
    }
};
