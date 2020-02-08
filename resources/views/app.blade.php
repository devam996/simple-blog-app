<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Simple Blog</title>

    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="/css/vendor.css" rel="stylesheet">
    <link href="/css/app.css" rel="stylesheet">
    <script src="/js/vendor.js"></script>
</head>
<body>
    <div ng-app="blogApp">
        <ng-include src="'/templates/components/icons.html'"></ng-include>
        <ui-view></ui-view>
    </div>
    <script src="/js/app.js"></script>
</body>
</html>