<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use Notifiable;
    use SoftDeletes;
    
    protected $fillable = [
        'first_name', 'last_name', 'email', 'mobile'
    ];

    protected $hidden = [
        'password',
    ];

    public $timestamps = true;
    protected $dates = ['deleted_at'];    
}
