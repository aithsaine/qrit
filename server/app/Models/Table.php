<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Table extends Model
{
    protected $fillable = [
        'num_table', 
    ];
    public static function validate(Request $request)
    {
        $request->validate([
            'num_table' => 'required|integer|unique:tables,num_table', 
        ]);
    }
}
