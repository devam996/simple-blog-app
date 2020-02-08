<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    //
    public function AddBlogs(Request $request)
    {
        $requestData = $request->all();

        $validationRules = VALIDATIONS['BLOG']['ADD']['RULES'];
        $validationMessages = VALIDATIONS['BLOG']['ADD']['MESSAGES'];
    }
}
