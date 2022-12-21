<?php


$s = socket_create(AF_INET, SOCK_STREAM, 0);
socket_connect($s, "192.168.0.129", 7777);
$arr = [1, 2, 3];
socket_send($s, serialize($arr), 256, 0);
socket_recv($s, $data, 256, 0);
$data = unserialize($data);
echo $data;
socket_close($s);

?>