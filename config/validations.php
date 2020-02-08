<?php

define("VALIDATIONS", [
    "AUTH" => [
        "REGISTER" => [
            "RULES" => [
                "user.first_name" => "bail|required|max:255",
                "user.last_name" => "bail|required|max:255",
                "user.mobile" => "bail|required|regex:/^[6-9]{1}[0-9]{9,9}$/|unique:users,mobile|max:255",
                "user.email" => "bail|required|regex:/\S+@\S+\.\S+/|unique:users,email|max:255",
                "user.password" => "bail|required|min:8|max:255",
            ],
            "MESSAGES" => [
                "user.first_name.required" => "First name of user is required",
                "user.first_name.max" => "First name of user max length exceeded",
                "user.last_name.required" => "Last name of user is required",
                "user.last_name.max" => "Last name of user max length exceeded",
                "user.email.required" => "Email is Required",
                "user.email.regex" => "Email is Invalid",
                "user.email.unique" => "Email already in use",
                "user.mobile.required" => "Mobile Number is Required",
                "user.mobile.regex" => "Mobile Number is Invalid",
                "user.mobile.unique" => "Mobile Number already in use",
                "user.password.required" => "Password is required",
                "user.password.min" => "Minimum 8 Characters for Password is required",
                "user.password.max" => "Maximum Characters for Password is exceeded",
            ]
        ],
        "LOGIN" => [
            "RULES" => [
                "user.username" => "bail|required|max:255|either_in:users,email,mobile",
                "user.password" => "bail|required|min:8|max:255"
            ],
            "MESSAGES" => [
                "user.username.required" => "Email or Mobile number is required",
                "user.username.max" => "Maximum Characters for Email or Mobile is exceeded",
                "user.username.either_in" => "User does not exists",
                "user.password.required" => "Password is required",
                "user.password.min" => "Minimum 8 Characters for Password is required",
                "user.password.max" => "Maximum Characters for Password is exceeded",
            ]
        ]
    ],
    "BLOG" => [
        "ADD" => [
            "RULES" => [
                "blog.title" => "bail|required|max:255|min:3",
                "blog.slug" => "bail|required|regex:/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/|unique:blogs,slug",
                "blog.status" => "bail|required|in:PUBLISHED,DRAFT,UNPUBLISHED"
            ],
            "MESSAGES" => [
                "blog.title.required" => "Blog title is required",
                "blog.title.min" => "Blog title requires atleast 3 characters",
                "blog.title.max" => "Blog title exceeds maximum characters allowed",
                "blog.slug.required" => "Slug is required",
                "blog.slug.regex" => "Slug is invalid",
                "blog.slug.unique" => "Slug already exists",
                "blog.status.required" => "Blog status is required",
                "blog.status.in" => "Blog status is invalid"
            ]
        ],
    ]

]);