<?php
header('Content-Type: application/json');
include 'db.php'; // Conexión a la base de datos

$request_method = $_SERVER["REQUEST_METHOD"];

// Función para obtener todas las propiedades
function getProperties() {
    global $conn;
    $query = "SELECT * FROM properties";
    $result = $conn->query($query);
    $properties = [];

    while ($row = $result->fetch_assoc()) {
        $properties[] = $row;
    }

    echo json_encode($properties);
}

// Función para agregar una nueva propiedad
function createProperty() {
    global $conn;
    $name = $_POST["name"];
    $price = $_POST["price"];
    $location = $_POST["location"];

    $query = "INSERT INTO properties (name, price, location) VALUES ('$name', '$price', '$location')";

    if ($conn->query($query) === TRUE) {
        echo json_encode(["status" => "Property added successfully"]);
    } else {
        echo json_encode(["status" => "Error: " . $conn->error]);
    }
}

// Función para actualizar una propiedad
function updateProperty() {
    global $conn;
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT["id"];
    $name = $_PUT["name"];
    $price = $_PUT["price"];
    $location = $_PUT["location"];

    $query = "UPDATE properties SET name='$name', price='$price', location='$location' WHERE id=$id";

    if ($conn->query($query) === TRUE) {
        echo json_encode(["status" => "Property updated successfully"]);
    } else {
        echo json_encode(["status" => "Error: " . $conn->error]);
    }
}

// Función para eliminar una propiedad
function deleteProperty() {
    global $conn;
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE["id"];

    $query = "DELETE FROM properties WHERE id=$id";

    if ($conn->query($query) === TRUE) {
        echo json_encode(["status" => "Property deleted successfully"]);
    } else {
        echo json_encode(["status" => "Error: " . $conn->error]);
    }
}

// Manejar los diferentes métodos HTTP
switch ($request_method) {
    case 'GET':
        getProperties();
        break;
    case 'POST':
        createProperty();
        break;
    case 'PUT':
        updateProperty();
        break;
    case 'DELETE':
        deleteProperty();
        break;
    default:
        echo json_encode(["status" => "Invalid Request"]);
        break;
}

// Cerrar la conexión
$conn->close();
?>

