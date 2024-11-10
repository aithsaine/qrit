<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use App\Models\OrderConfirm;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->user->name,
            "cin" => $this->user->cin,
            "address" => $this->address,
            "phone" => $this->phone,
            "birthday" => $this->birthday,
            "hiring_date" => $this->hiring_date,
            "last_seen" => Helper::userLastActivityStatus($this->user->last_seen),
            "last_order"=>OrderConfirm::where("employee_id",$this->id)->orderByDesc("id")->limit(1)->get()

        ];
    }
}
