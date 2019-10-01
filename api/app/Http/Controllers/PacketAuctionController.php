<?php

namespace App\Http\Controllers;

use App\PacketAuction;
use App\Packet;
use App\Sell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use DB;
use App\Mail\OrderConfirmation;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

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
        
        $auctionObj = PacketAuction::join('packets', 'packet_auctions.id', '=', 'packets.packet_auction_id')
        ->join('prizes', 'prizes.id', '=', 'packet_auctions.prize_id')
        ->join('prize_types', 'prize_types.id', '=', 'prizes.type_id')
        ->join('currencies', 'currencies.id', '=', 'prizes.currency_id')
        ->select('packet_auctions.id','packet_auctions.title','packet_auctions.end_date','prizes.amount','prize_types.type_img','currencies.simbol')
        ->distinct('packet_auctions.id')
        ->get();

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
        $msg = 'El o los Sobres han sido comprados con exito';

        for ($x = 0; $x < $q; $x++) {

            //primero chequeo que el sobre no este comprado
            $packetID = Packet::select('user_id')->where('id', $arrIds[$x])->first();

            if($packetID->user_id == 0){

                //si no esta comprado actualizo
                DB::table('packets')
                ->where('id', $arrIds[$x])
                ->update([
                    'user_id' => $userId,
                    'status' => 3,
                    'updated_at' => Carbon::now()
                ]);

            }else{
                $msg = 'El sobre o alguno de los sobres seleccionados ya ha sido comprados';
            }
        }

        $auctionID = Packet::select('packet_auction_id')->where('id', $arrIds[$x])->first();

        if($q > 0){
            
            ////// actuaiza la venta

            
            //////

            $objDemo = new \stdClass();
            $objDemo->demo_one = 'Demo One Value';
            $objDemo->demo_two = 'Demo Two Value';
            $objDemo->sender = 'SenderUserName';
            $objDemo->receiver = 'ReceiverUserName';
     
            Mail::to("smasherpunk@hotmail.com")->send(new OrderConfirmation($objDemo));

            ///////
            echo json_encode($msg);
        }else{
            echo json_encode('No hay sobres que comprar?');
        }

        //no lo borro por si necesito una respuesta parecida a esta mas adelante
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
                'user_id' => $winnerId->user_id,
                'updated_at' => Carbon::now()
            ]);

        echo json_encode('winner set successfully');

    }

    public function getPacket(Request $request)
    {
        //
        $AuctionId = $request->input('id');

        $auctionObj = PacketAuction::join('packets', 'packet_auctions.id', '=', 'packets.packet_auction_id')
        ->join('prizes', 'prizes.id', '=', 'packet_auctions.prize_id')
        ->join('prize_types', 'prize_types.id', '=', 'prizes.type_id')
        ->join('currencies', 'currencies.id', '=', 'prizes.currency_id')
        ->select('packet_auctions.title','packet_auctions.end_date','packet_auctions.packet_cost','prizes.amount','prize_types.type_img','currencies.simbol')
        ->where('packet_auctions.id', $AuctionId)
        ->distinct('packet_auctions.id')
        ->get();

        $packetObj = Packet::select('id','status')->where('packet_auction_id', $AuctionId)->orderBy('id', 'asc')->get();

        $packetArr = Array("auctionObj" => $auctionObj,"packetObj" => $packetObj);

        echo json_encode($packetArr);

    }

    public function setSell(Request $request)
    {
        //

        $sellObj = new Sell();
        $sellObj->module = 'PacketAuction';
        $sellObj->quantity = $request->input('quantity');
        $sellObj->totalcost = $request->input('totalcost');
        $sellObj->currencyId = $request->input('currencyid');
        $sellObj->user_id = $request->input('user_id');
        $sellObj->auction_id = $request->input('auctionid');
        $sellObj->status = '2';
        $sellObj->save();

        echo json_encode($sellObj->id);

    }

    public function updateSell(Request $request)
    {
        //
        $carbonDate = date("YmdHis", strtotime(Carbon::now()));
        $sellBillingCode = "SA".$request->input('sell_id').$carbonDate;

        /*DB::table('sells')
        ->where('id', $request->input('sell_id'))
        ->update([
            'status' => '3',
            'sell_billing_code' => $request->input('sell_billing_code'),
            'pay_billing_code' => $request->input('pay_billing_code'),
            'updated_at' => Carbon::now()
        ]);*/
        
        //echo json_encode('sell closed successfully');
        //echo json_encode($sellBillingCode);

    }

}
