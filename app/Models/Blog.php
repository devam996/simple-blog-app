<?php

namespace App\Models;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use Notifiable;
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'status', 'content', 'keywords', 'summary', 'categories'
    ];

    public $timestamps = true;
    protected $dates = ['deleted_at'];    
}
