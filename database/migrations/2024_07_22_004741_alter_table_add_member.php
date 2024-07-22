<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bpbl_proposals', function (Blueprint $table) {
            $table->unsignedBigInteger('member_id')->nullable()->unique();

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
        });

        Schema::table('business_reports', function (Blueprint $table) {
            $table->unsignedBigInteger('member_id')->nullable();

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
        });

        Schema::table('periodic_reports', function (Blueprint $table) {
            $table->unsignedBigInteger('member_id')->nullable();

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('bpbl_proposals', function (Blueprint $table) {
            $table->dropForeign(['member_id']);
            $table->dropColumn('member_id');
        });

        Schema::table('business_reports', function (Blueprint $table) {
            $table->dropForeign(['member_id']);
            $table->dropColumn('member_id');
        });

        Schema::table('periodic_reports', function (Blueprint $table) {
            $table->dropForeign(['member_id']);
            $table->dropColumn('member_id');
        });
    }
};
