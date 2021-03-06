<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel React Product Listing App</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <h2 style="text-align: center; padding-top: 2rem; padding-bottom: 1rem;">Laravel React Product Listing App</h2>
        <div id="root"></div>
        <script src="{{mix('js/app.js')}}"></script>
    </body>
</html>
