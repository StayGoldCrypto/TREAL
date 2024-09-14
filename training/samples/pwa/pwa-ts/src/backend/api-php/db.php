 
<?php
$servername = "localhost"; // o '127.0.0.1'
$username = "root";        // tu usuario de MySQL
$password = "password";    // tu contraseña de MySQL
$dbname = "realestate";    // el nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
