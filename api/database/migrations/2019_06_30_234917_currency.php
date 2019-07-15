<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Currency extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('currencies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('currency_acronym');
            $table->string('simbol');
            $table->string('country_code');
            $table->string('flag');
            $table->boolean('active');
            $table->timestamps();
        });

        DB::table('currencies')->insert(
            array(
                'title' => 'Venezuelan Bolivar',
                'currency_acronym' => 'VEB',
                'simbol' => 'Bs',
                'country_code' => 'VE',
                'flag' => 'flag-icon-ve',
                'active' => true,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('currencies');
    }
}
