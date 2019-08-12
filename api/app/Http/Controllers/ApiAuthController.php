<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use DB;
use Validator;
use Carbon\Carbon;

class ApiAuthController extends Controller
{
    public $successStatus = 200;

    public function getServerDate(Request $request) {    
      return Carbon::now();
   }
  
    public function register(Request $request) {    
    $validator = Validator::make($request->all(), [ 
                 'name' => 'required',
                 'email' => 'required|email',
                 'password' => 'required',  
                 'c_password' => 'required|same:password', 
       ]);   
    if ($validator->fails()) {          
          return response()->json(['error'=>$validator->errors()], 401);                        }    
    $input = $request->all();  
    $input['password'] = bcrypt($input['password']);
    $user = User::create($input); 
    $success['token'] =  $user->createToken('AppName')->accessToken;
    return response()->json(['success'=>$success], $this->successStatus); 
   }
     
      
   public function login(Request $request){ 

      $request->validate([
         'email' => 'required|string|email',
         'password' => 'required|string',
         'remember_me' => 'boolean',
      ]);

      $credentials = request(['email','password']);
      if(!Auth::attempt($credentials)){ 
         return response()->json(['error'=>'Unauthorized'], 401);
      }

      $user = $request->user();
      $tokenResult = $user->createToken('Personal Access Token');
      $token = $tokenResult->token;

      if($request->remember_me){
         $token->expires_at = Carbon::now()->addWeeks(1);
      }else{
         $token->expires_at = Carbon::now()->addMinutes(5);
      }

      $token->save();

      $expires_at = Carbon::parse($tokenResult->token->expires_at);

      return response()->json([
         'access_token' => $tokenResult->accessToken,
         'token_type' => 'Bearer',
         'expires_at' => $expires_at->toDateTimeString(),
         'time_zone' => $expires_at->tzName,
      ]);






   /*if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
      $user = Auth::user(); 
      $success['token'] =  $user->createToken('AppName')-> accessToken; 
       return response()->json(['success' => $success], $this->successStatus); 
     } else{ 
      return response()->json(['error'=>'Unauthorized'], 401); 
      } */
   }
     
   public function getUser() {
    $user = Auth::user();
    return response()->json(['success' => $user], $this->successStatus); 
    }

    public function logoutAll()
    { 
      if (Auth::check()) {
         Auth::user()->AauthAcessToken()->delete();
         return response()->json(['success'=>'logged out all sessions'], $this->successStatus); 
      }
   }

   public function logout() {
      $accessToken = Auth::user()->token();

   /*Descomentar si se necesita hacer tracking de sesiones abiertas por el usuario*/
   //

   /*DB::table('oauth_refresh_tokens')
       ->where('access_token_id', $accessToken->id)
       ->update([
           'revoked' => true
       ]);
       
       $accessToken->revoke();
       */
   //

   /*Descomentar si se necesita no guardar sesiones cerradas por el usuario*/
   //

       DB::table('oauth_refresh_tokens')
       ->where('access_token_id', $accessToken->id)
       ->delete();

       $accessToken->revoke();
   //

      return response()->json(['success'=>'logged out'], $this->successStatus);
   }
}
