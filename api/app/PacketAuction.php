<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PacketAuction extends Model
{
    //
    public function packets(){
        return $this->hasMany('App\Packet');
    }
}
