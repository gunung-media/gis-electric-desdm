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
        Schema::create('business_reports', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nib');
            $table->string('npwp');
            $table->string('email');
            $table->string('phone_number');
            $table->char('village_code', 12);
            $table->text('address');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('description')->nullable();
            $table->string('request_path')->nullable();
            $table->string('ktp_path')->nullable();
            $table->string('nib_path')->nullable();
            $table->string('npwp_path')->nullable();
            $table->string('digram_path')->nullable();
            $table->string('location_path')->nullable();
            $table->string('specification_path')->nullable();
            $table->string('bap_path')->nullable();
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
        Schema::dropIfExists('business_reports');
    }
};
