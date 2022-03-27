<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'portfolio_id',
        'name',
        'units',
        'price',
        'type',
        'date',
        'broker_commission',
        'sebon_commission',
        'taxper',
        'tax',
        'investment'
    ];
}
