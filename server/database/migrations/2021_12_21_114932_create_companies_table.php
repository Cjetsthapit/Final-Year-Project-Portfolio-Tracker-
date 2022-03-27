<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('fname');
            $table->string('sname');
            $table->string('sector');
            $table->string('sharesout');
            $table->string('low_high');
            $table->string('avg_120');
            $table->string('yield');
            $table->string('eps');
            $table->string('pe');
            $table->string('bookvalue');
            $table->string('pbv');
            $table->string('dividend')->nullable();
            $table->string('bonus');
            $table->string('rightshares');
            $table->string('avgvol');
            $table->string('marketcap');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
