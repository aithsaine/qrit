<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            Employee::validate($request);
            $employee = new Employee();
            $employee->firstname = $request->firstname;
            $employee->lastname = $request->lastname;
            $employee->cin = $request->cin;
            $employee->phone = $request->phone;
            $employee->birthday = $request->birthday;
            $employee->hiring_date = $request->hiring_date;
            $employee->address = $request->address;
            $employee->save();
            return response(["message"=>"employee added with success"]);
        }catch(ValidationException $error)
        {
            return response($error->errors(),500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
