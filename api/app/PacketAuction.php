<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PacketAuction extends Model
{
    //
    public function Packet(){
        return $this->hasMany('App\Packet');
    }
}
