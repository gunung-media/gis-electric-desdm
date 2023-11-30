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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('identity_number');
            $table->string('email');
            $table->string('phone_number');
            $table->char('village_code', 12);
            $table->text('address');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('proposal_type');
            $table->string('description')->nullable();
            $table->string('document_path');
            $table->integer('estimated_cost')->nullable();
            $table->enum('priority', ['Tinggi', 'Sedang', 'Rendah']);
            $table->text('additional_note')->nullable();
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
        Schema::dropIfExists('proposals');
    }
};
