<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = ["firstname","lastname","cin","phone","birthday","hiting_date","address"];

    public static function validate(Request $request)
    {
        $request->validate([
            "firstname"=>"required",
            "lastname"=>"required",
            "cin"=>"required|unique:employees,cin",
            "phone"=>"required",
            "birthday"=>'required|date',
            "hiring_date"=>"required|date",
            "address"=>"required"
        ]);
    }
}
