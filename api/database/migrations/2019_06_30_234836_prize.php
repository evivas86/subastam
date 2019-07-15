<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Prize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('prizes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('description');
            $table->integer('amount');
            $table->string('code');
            $table->boolean('active');
            $table->integer('currency_id');
            $table->integer('type_id');
            $table->timestamps();
        });

        DB::table('prizes')->insert(
            array(
                'title' => 'Gran Gift Card de 1 Bs',
                'description' => 'Ganate esta gran grift card de 1 Bs',
                'amount' => 1,
                'code' => 'ESTO-ES-UNA-PRUEBA',
                'active' => true,
                'currency_id' => 1,
                'type_id' => 1,
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
        Schema::dropIfExists('prizes');
    }
}
