<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('transactions', function (Blueprint $table) {
        //     $table->id();
        //     $table->bigInteger('portfolio_id')->unsigned();
        //     $table->foreign('portfolio_id')->references('id')->on('portfolios')->onDelete('cascade');
        //     $table->bigInteger('company_id')->unsigned();
        //     $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        //     $table->integer('units');
        //     $table->double('price');
        //     $table->string('type');
        //     $table->double('broker_commission');
        //     $table->double('sebon_commission');
        //     $table->double('investment');
        //     $table->timestamps();
        // });
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('portfolio_id')->unsigned();
            $table->string('name');
            $table->foreign('portfolio_id')->references('id')->on('portfolios')->onDelete('cascade');
            $table->integer('units');
            $table->double('price');
            $table->date('date');
            $table->string('type');
            $table->double('broker_commission');
            $table->double('sebon_commission');
            $table->double('taxper')->nullable();
            $table->double('tax')->nullable();
            $table->double('investment');
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
        Schema::dropIfExists('transactions');
    }
}
