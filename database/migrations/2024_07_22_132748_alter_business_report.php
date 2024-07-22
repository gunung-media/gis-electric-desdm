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
        Schema::table('business_reports', function (Blueprint $table) {
            $table->renameColumn('digram_path', 'diagram_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('business_reports', function (Blueprint $table) {
            $table->renameColumn('diagram_path', 'digram_path');
        });
    }
};
