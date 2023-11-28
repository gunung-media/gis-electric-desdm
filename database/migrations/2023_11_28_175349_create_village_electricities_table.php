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
        Schema::create('village_electricities', function (Blueprint $table) {
            $table->id();
            $table->char('village_code', 10);
            $table->integer('households_with_electricity')->default(0);
            $table->integer('households_without_electricity')->default(0);
            $table->float('network_length')->default(0);
            $table->text('village_potential')->nullable();
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
        Schema::dropIfExists('village_electricities');
    }
};
