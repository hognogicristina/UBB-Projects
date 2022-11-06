<?php

$s=socket_create(AF_INET,SOCK_STREAM, 0);
socket_bind($s,"0.0.0.0", 7777);
socket_listen($s);
$cs=socket_accept($s);

$suma = 0;
foreach(unserialize(socket_read($cs, 256)) as $v) {
    $suma += $v;
}

socket_send($cs, serialize($suma), 256, 0);

socket_close($cs);
socket_close($s);
?>