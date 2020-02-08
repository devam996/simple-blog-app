<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend("either_in", function ($attribute, $value, $parameters, $validator){
            $table = $parameters[0];
            $field1 = $parameters[1];
            $field2 = $parameters[2];

            return DB::table($table)->where($field1, $value)->orWhere($field2, $value)->exists();

        }, ":attribute doesn't exists");
    }
}
