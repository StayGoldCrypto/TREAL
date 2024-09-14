<?php
$servername = "localhost";
$username = "root";
$password = "yourpassword";
$dbname = "realestate";

// Conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Obtener propiedades (Leer)
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $sql = "SELECT * FROM properties";
  $result = $conn->query($sql);
  $properties = array();
  while ($row = $result->fetch_assoc()) {
    $properties[] = $row;
  }
  echo json_encode($properties);
}

// Crear una nueva propiedad
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = $_POST['name'];
  $price = $_POST['price'];
  $location = $_POST['location'];

  $sql = "INSERT INTO properties (name, price, location) VALUES ('$name', '$price', '$location')";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "Property added successfully"]);
  } else {
    echo json_encode(["status" => "Error: " . $conn->error]);
  }
}

// Actualizar una propiedad
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
  parse_str(file_get_contents("php://input"), $_PUT);
  $id = $_PUT['id'];
  $name = $_PUT['name'];
  $price = $_PUT['price'];
  $location = $_PUT['location'];

  $sql = "UPDATE properties SET name='$name', price='$price', location='$location' WHERE id=$id";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "Property updated successfully"]);
  } else {
    echo json_encode(["status" => "Error: " . $conn->error]);
  }
}

// Eliminar una propiedad
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  parse_str(file_get_contents("php://input"), $_DELETE);
  $id = $_DELETE['id'];

  $sql = "DELETE FROM properties WHERE id=$id";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "Property deleted successfully"]);
  } else {
    echo json_encode(["status" => "Error: " . $conn->error]);
  }
}

$conn->close();
?>
