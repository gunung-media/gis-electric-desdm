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
        Schema::create('proposal_trackings', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->enum('status', ['Diterima', 'Diproses', 'Ditolak', 'Diterima dengan catatan']);
            $table->unsignedBigInteger('proposal_id');
            $table->timestamps();

            $table->foreign('proposal_id')
                ->on('proposals')
                ->references('id')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposal_trackings');
    }
};
