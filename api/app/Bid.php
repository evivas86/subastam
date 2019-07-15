<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    //
    public function BidAuction()
    {
        return $this->belongsTo('App\BidAuction');
    }
}
