<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDailySharesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_shares', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->string('open');
            $table->string('low');
            $table->string('high');
            $table->string('close');
            $table->string('diff');
            $table->string('diffper');
            $table->string('turnover');
            $table->timestamps();
        });
        // Schema::create('daily_shares', function (Blueprint $table) {
        //     $table->id();
        //     $table->bigInteger('company_id')->unsigned();
        //     $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        //     $table->double('open');
        //     $table->double('low');
        //     $table->double('high');
        //     $table->double('close');
        //     $table->double('diff');
        //     $table->double('diffper');
        //     $table->double('turnover');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daily_shares');
    }
}
