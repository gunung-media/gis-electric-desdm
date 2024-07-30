<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bpbl_proposals', function (Blueprint $table) {
            $table->dropForeign(['member_id']);

            $table->dropUnique(['member_id']);

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bpbl_proposals', function (Blueprint $table) {
            $table->dropForeign(['member_id']);

            $table->unique('member_id');

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
        });
    }
};
