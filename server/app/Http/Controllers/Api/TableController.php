<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TableController extends Controller
{
    public function store(Request $request)
    {
        try {
            Table::validate($request); 
            $table = new Table();
            $table->num_table = $request->num_table; 
            $table->save(); 
            return response(["message" => "Table added successfully"]); 
        } catch (ValidationException $error) {
            return response($error->errors(), 500); 
        }
    }
}
