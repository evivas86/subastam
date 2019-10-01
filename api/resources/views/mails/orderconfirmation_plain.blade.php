Hello {{ $data->receiver }},
This is a demo email for testing purposes! Also, its the HTML version.
 
Demo object values:
 
Demo One: {{ $data->demo_one }}
Demo Two: {{ $data->demo_two }}
 
Values passed by With method:
 
testVarOne: {{ $testVarOne }}
testVarOne: {{ $testVarOne }}
 
Thank You,
{{ $data->sender }}