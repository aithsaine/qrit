<?php

namespace App\Http\Resources;

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
        ];
    }
}
