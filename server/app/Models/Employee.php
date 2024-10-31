<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = ["user_id","cin","phone","birthday","hiting_date","address"];

    public static function validate(Request $request)
    {
        $request->validate([
            "cin"=>"required|unique:employees,cin",
            "phone"=>"required",
            "birthday"=>'required|date',
            "hiring_date"=>"required|date",
            "address"=>"required"
        ]);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function order_confirm(){
        return $this->hasMany(OrderConfirm::class);
    }
}
