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
        Schema::create('bpbl_proposal_trackings', function (Blueprint $table) {
            $table->id();
            $table->id();
            $table->string('description');
            $table->enum('status', ['Diterima', 'Diproses', 'Ditolak', 'Diterima dengan catatan']);
            $table->unsignedBigInteger('bpbl_proposal_id');
            $table->timestamps();

            $table->foreign('bpbl_proposal_id')
                ->on('bpbl_proposals')
                ->references('id')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bpbl_proposal_trackings');
    }
};
