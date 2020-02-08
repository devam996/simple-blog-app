<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use \Firebase\JWT\JWT;

use Illuminate\Http\Response;
use App\User;

class VerifyJwtToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        $jwtKey = env("JWT_SECRET_KEY");

        try {
            $token = $request->header('Authorization');
            if(!isset($token)){
                throw new Exception("Token not found");
            }

            $userData = JWT::decode($token, $jwtKey, array('HS256'));

            $user = User::where('id', $userData->id)
                        ->first();

            if(!isset($user)){
                throw new Exception("User don't exists");
            }
            
            $request->user = $user;
            return $next($request);

        } catch (Exception $e){
            $status = 403;
            $response = [
                "exception" => $e,
                "message" => $e->getMessage()
            ];
            return response($response, $status);
        }
    }
}
