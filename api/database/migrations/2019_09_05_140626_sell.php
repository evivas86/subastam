<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Sell extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('sells', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('module');
            $table->string('quantity');
            $table->integer('total_cost');
            $table->integer('currency_id');
            $table->integer('user_id');
            $table->integer('auction_id');
            $table->boolean('status');
            $table->string('pay_method');
            $table->string('sell_billing_code');
            $table->string('pay_billing_code');
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
        //
        Schema::dropIfExists('sells');
    }
}
