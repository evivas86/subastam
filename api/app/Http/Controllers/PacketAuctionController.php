<?php

namespace App\Http\Controllers;

use App\PacketAuction;
use App\Packet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use DB;

class PacketAuctionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $auctionObj = PacketAuction::get();
        echo json_encode($auctionObj);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //print_r($request->all());
        //Crear subasta
        $auctionObj = new PacketAuction();
        $auctionObj->title = $request->input('title');
        $auctionObj->quantity = $request->input('quantity');
        $auctionObj->min = $request->input('min');
        $auctionObj->max = $request->input('max');
        $auctionObj->prize_id = $request->input('prize_id');
        $auctionObj->user_id = 0;
        $auctionObj->start_date = $request->input('start_date');
        $auctionObj->end_date = $request->input('end_date');
        $auctionObj->save();

        //Crear sobres
        $q = $request->input('quantity');
        $AuctionId = $auctionObj->id;

        //Funcion para numeracion de sobres
        $packetArr = array();
        for ($x = 0; $x < $q; $x++) {
            $randInt = rand(1,500);
            while (in_array($randInt, $packetArr)) {
                $randInt = rand(1,500);
            }
            array_push($packetArr,$randInt);
        }

        for ($x = 0; $x < $q; $x++) {
            $packetObj = new Packet();
            $packetObj->user_id = 0;
            $packetObj->auction_id = $AuctionId;
            $packetObj->code = $packetArr[$x];
            $packetObj->save();
        }

        echo json_encode($auctionObj);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function buyPacket(Request $request)
    {
        //
        $arrIds = $request->input('arrIds');
        $userId = Auth::user()->id;
        $q = count($arrIds);
        for ($x = 0; $x < $q; $x++) {
            DB::table('packets')
            ->where('id', $arrIds[$x])
            ->update([
                'user_id' => $userId
            ]);
        }

        echo json_encode('success packet buy');
        //return response()->json(['success'=>'success packet buy'], $this->successStatus); 

    }

    public function setPacketWinner(Request $request)
    {
        //
        $AuctionId = $request->input('auctionId');

        $winnerId = DB::table('packets')
                    ->select('user_id')
                    ->where('auction_id', $AuctionId)
                    ->orderBy('code', 'desc')
                    ->first();


            DB::table('packet_auctions')
            ->where('id', $AuctionId)
            ->update([
                'user_id' => $winnerId->user_id
            ]);

        echo json_encode('winner set successfully');
        //return response()->json(['success'=>'success packet buy'], $this->successStatus); 

    }
}
