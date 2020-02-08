<?php

namespace App\Http\Controllers;

use Validator;
use Exception;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

use \Firebase\JWT\JWT;

class AuthController extends Controller
{
    public function Register(Request $request)
    {
        $requestData = $request->all();

        $validationRules = VALIDATIONS["AUTH"]["REGISTER"]["RULES"];
        $validationMessages = VALIDATIONS["AUTH"]["REGISTER"]["MESSAGES"];

        $validator = Validator::make($requestData, $validationRules, $validationMessages);

        if($validator->fails()){
            $status = 404;
            $response = [
                "message" => $validator->errors()->first()
            ];
        } else {
            try {
                $userData = $requestData['user'];
                $user = new User;
                $user->fill($userData);
                $user->password = bcrypt($userData['password']);
                $user->save();

                $tokenPayload = [
                    "id" => $user->id,
                    "email" => $user->email,
                    "mobile" => $user->mobile,
                    "first_name" => $user->first_name,
                    "last_name" => $user->last_name
                ];

                $token = JWT::encode($tokenPayload, env("JWT_SECRET_KEY"));

                $status = 200;
                $response = [
                    "token" => $token,
                    "message" => "User registered successfully"
                ];
            }
            catch(Exception $e){
                $status = 500;
                $response = [
                    "exception" => $e,
                    "message" => $e->getMessage()
                ];
            }
        }

        return response($response, $status);
    }
    
    public function Login(Request $request)
    {
        $requestData = $request->all();

        $validationRules = VALIDATIONS["AUTH"]["LOGIN"]["RULES"];
        $validationMessages = VALIDATIONS["AUTH"]["LOGIN"]["MESSAGES"];

        $validator = Validator::make($requestData, $validationRules, $validationMessages);

        if($validator->fails()){
            $status = 404;
            $response = [
                "message" => $validator->errors()->first()
            ];
        } else {
            try {
                $userData = $requestData["user"];
                $user = User::where('email', $userData["username"])
                            ->orWhere('mobile',$userData["username"])
                            ->first();
                
                if(!password_verify($userData["password"], $user["password"])){
                    $status = 401;
                    $response = [
                        "message" => "Password entered is incorrect"
                    ];
                } else {
                    unset($user["password"]);

                    $tokenPayload = [
                        "id" => $user["id"],
                        "email" => $user->email,
                        "mobile" => $user->mobile,
                        "first_name" => $user->first_name,
                        "last_name" => $user->last_name
                    ];

                    $token = JWT::encode($tokenPayload, env("JWT_SECRET_KEY"));

                    $status = 200;
                    $response = [
                        "token" => $token,
                        "message" => "User login successful"
                    ];
                }

            } catch (Exception $e) {
                $status = 500;
                $response = [
                    "exception" => $e,
                    "message" => $e->getMessage()
                ];
            }
        }

        return response($response, $status);
    }
}
