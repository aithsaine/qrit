<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ["table_id","status"];

    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function order_confirm()
    {
        return $this->hasOne(OrderConfirm::class);
    }
}
