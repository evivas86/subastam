<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The  object instance.
     *
     * @var Ordermail
     */
    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        //
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        
        return $this->from('subastamericana@gmail.com')
        ->subject('Correo de prueba subastamericana')
        ->view('mails.orderconfirmation')
        ->text('mails.orderconfirmation_plain')
        ->with(
          [
                'testVarOne' => '1',
                'testVarTwo' => '2',
                'data' => $this->data,
          ])
          ->attach($_SERVER['DOCUMENT_ROOT'].'/assets/img/amazon.jpg', [
                  'as' => 'amazon.jpg',
                  'mime' => 'image/jpeg',
          ]);
    }
}
