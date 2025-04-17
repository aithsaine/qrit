<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user =
        new User();
        $user->name = "qrit admin";
        $user->email = "admin@qrit.ma";
        $user->password =  Hash::make("admin");
        $user->save();
       
    
        // Create the user and return admin data including user_id
        return [
            'user_id' => $user->id, // This will create a User and get the ID
            // Add any other Admin-specific fields here
        ];    }
}
