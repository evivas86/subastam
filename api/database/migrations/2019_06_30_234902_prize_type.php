<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PrizeType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('prize_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('company_name');
            $table->string('type_img');
            $table->string('claim_url');
            $table->boolean('active');
            $table->timestamps();
        });

        DB::table('prize_types')->insert(
            array(
                'title' => 'Amazon Gift Card',
                'company_name' => 'Amazon',
                'type_img' => 'amazongc.png',
                'claim_url' => 'http://amazon.com',
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
        Schema::dropIfExists('prize_types');
    }
}
