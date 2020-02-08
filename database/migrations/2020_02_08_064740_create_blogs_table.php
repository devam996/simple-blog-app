<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('author_id');

            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content')->nullable();

            $table->string('keywords')->nullable();
            $table->string('summary')->nullable();
            $table->string('categories')->nullable();

            $table->enum('status', ['PUBLISHED', 'DRAFT', 'UNPUBLISHED']);
            $table->dateTime('published_at')->nullable();

            $table->softDeletes();
            $table->timestamps();


            $table->foreign('author_id')
                    ->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}
