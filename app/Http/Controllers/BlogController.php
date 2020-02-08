<?php

namespace App\Http\Controllers;

use Validator;
use Exception;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Blog;

class BlogController extends Controller
{
    //
    public function AddBlog(Request $request)
    {
        $requestData = $request->all();

        $validationRules = VALIDATIONS['BLOG']['ADD']['RULES'];
        $validationMessages = VALIDATIONS['BLOG']['ADD']['MESSAGES'];

        $validator = Validator::make($requestData, $validationRules, $validationMessages);

        if($validator->fails()){
            $status = 404;
            $response = [
                "message" => $validator->errors()->first()
            ];
        } else {
            try {
                $blogData = $requestData['blog'];
                $blog = new Blog;
                $blog->fill($blogData);
                $blog->author_id = $request->user->id;
                $blog->save();

                $status = 200;
                $response = [
                    "blog" => $blog
                ];
            }
            catch(Exception $e){
                $status = 500;
                $response = [
                    "exception" => $e,
                    "message" => $e->getMessage()
                ];
            }
        }
        return response($response, $status);
    }

    public function ListBlogs(Request $request)
    {
        
        $paginateLimit = 6;

        $response = Blog::where(["status" => "PUBLISHED"])
            ->orWhere(["author_id" => $request->user->id])
            ->select('id', 'slug', 'title', 'content', 'published_at', 'status')
            ->paginate($paginateLimit);

        return response($response, 200);
        // if (strpos($request->url(), 'api')) {
            
        // } else {
        //     return view('blog.blogListing')->with('blogs', $response);
        // }
    }
}
