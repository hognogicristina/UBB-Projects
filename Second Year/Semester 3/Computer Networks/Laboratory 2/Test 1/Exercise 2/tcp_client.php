<?php
$s = socket_create(AF_INET, SOCK_STREAM, 0);
socket_connect($s, "192.168.0.17", 7777);
 
$matrix = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

while (1) {
    $i = readline("Enter row number: ");
    $j = readline("Enter column number: ");
    $matrix[(int) $i][(int) $j] = "X";
    
    for ($a = 0; $a < 3; $a++) {
        for ($b = 0; $b < 3; $b++)
            echo $matrix[$a][$b];
        echo "\n";
    }

    socket_send($s, $i, 128, 0);
    sleep(0.1);
    socket_send($s, $j, 128, 0);

    socket_recv($s, $iS, 128, 0);
    socket_recv($s, $jS, 128, 0);

    $matrix[$iS][$jS] = "O";
    
    for ($a = 0; $a < 3; $a++) {
        for ($b = 0; $b < 3; $b++)
            echo $matrix[$a][$b];
        echo "\n";
    }
    
    socket_close($s);
}
?>
