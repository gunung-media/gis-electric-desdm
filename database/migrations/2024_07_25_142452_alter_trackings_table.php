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
        $tables = ['bpbl_proposal_trackings', 'business_report_trackings', 'periodic_report_trackings'];
        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->string('file_path')->nullable();
            });
        }
    }

    public function down(): void
    {
        $tables = ['bpbl_proposal_trackings', 'business_report_trackings', 'periodic_report_trackings'];
        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn('file_path');
            });
        }
    }
};
