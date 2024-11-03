<?php

namespace App\Http\Resources;

use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        Carbon::setLocale('fr');

        return [
            "id"=>$this->id,
            "status"=>$this->status,
            "date"=>$this->created_at,
            "table"=>$this->table_id,
            "confirmer"=>$this->order_confirm?$this->order_confirm->employee_id:null,
            "total"=>array_reduce($this->order_items->toArray(),
            fn($prev,$next) => $prev+($next['price']*$next['quantity'])
            ,0),
        ];
    }
}
