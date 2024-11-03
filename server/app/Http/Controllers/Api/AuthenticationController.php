<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    //
    public function login(Request $request)
    {
        try {

            $request->validate([
                "email" => ['required', 'exists:users,email'],
                "password" => ["required"]
            ]);
            $user = User::whereEmail($request->email)->first();
            if (Hash::check($request->password, $user->password)) {
                $token  = $user->createToken("auth_token")->plainTextToken;
                $user->last_seen = now();
                $user->save();
                return response()->json(["message" => "logged succefully", "success" => true, "status" => 200, "token" => $token,"user"=> new UserResource($user)]);
            } else {
                return response(["password" => ["incorrect password"]], 422);
            }
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
    }
    public function logout()
    {
        User::find(Auth::id())->tokens()->delete();
        return response(["success" => true]);
    }


}
