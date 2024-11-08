<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Table extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'id',
        "employee_id"
    ];
    public static function validate(Request $request)
    {
        $request->validate([
            'num_table' => 'required|integer|unique:tables,id', 
            "employee"=>"required|exists:employees,id"
        ]);
    }
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
