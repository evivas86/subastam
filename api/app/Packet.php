<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Packet extends Model
{
    //
    public function PacketAuction()
    {
        return $this->belongsTo('App\PacketAuction');
    }
}
