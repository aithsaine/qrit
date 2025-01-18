<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\OrderResource;
use App\Models\Employee;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            $request->validate([
                "cin"=>"required",
                "phone"=>"required",
                "birthday"=>"required",
                "hiring_date"=>"required",
                "address"=>"required",
                "firstname"=>"required",
                "lastname"=>"required"
            ]);

            $user = new User();
            $fname = trim((str_replace(" ","",$request->firstname)));
            $lname = trim((str_replace(" ","",$request->lastname)));
            $user->name = $request->firstname." ".$request->lastname;
            $user->email = strtolower($fname)."-".strtolower($lname)."@bwise.ma";
            $user->password = Hash::make("qrit-bwise");
            $user->save();
            $employee = new Employee();
            $employee->user_id = $user->id;
            $employee->cin = $request->cin;
            $employee->phone = $request->phone;
            $employee->birthday = $request->birthday;
            $employee->hiring_date = $request->hiring_date;
            $employee->address = $request->address;
            $employee->save();
            return response(["message"=>"employee added with success","employee"=>new EmployeeResource($employee)]);
        }catch(ValidationException $error)
        {
            return response($error->errors(),500);
        }
    }

    /**request
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
         try {
            $employee = Employee::findOrFail($id); 
            $employee->delete(); 
            return response(["message" => "Employee deleted successfully"]);
        } catch (ModelNotFoundException $e) {
            return response(["error" => "Employee not found"], 404);
        } catch (\Exception $e) {
            return response(["error" => "An error occurred while deleting the employee"], 500);
        }
    }

    public function getOrdersForEmployeeTables($id){
    $employee = User::find($id)->employee;
    $tables = $employee->tables()->get("id");
    $orders = Order::whereIn("table_id",$tables)->get();
        return response(["orders"=>OrderResource::collection($orders)]);
    }
}
