<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BidAuction extends Model
{
    //
    public function Bid(){
        return $this->hasMany('App\Bid');
    }
}
