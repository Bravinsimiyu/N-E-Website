<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Initialize an array to store errors
    $errors = [];

    // Sanitize and validate input fields
    $firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
    $lastName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $program = filter_input(INPUT_POST, 'program', FILTER_SANITIZE_STRING);

    // Validate First Name
    if (empty($firstName) || strlen($firstName) < 2) {
        $errors['firstName'] = "First Name must be at least 2 characters.";
    }

    // Validate Last Name
    if (empty($lastName) || strlen($lastName) < 2) {
        $errors['lastName'] = "Last Name must be at least 2 characters.";
    }

    // Validate Phone Number
    if (empty($phone) || !preg_match('/^[0-9]{10}$/', $phone)) {
        $errors['phone'] = "Phone Number must be exactly 10 digits.";
    }

    // Validate Email Address
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Please provide a valid Email Address.";
    }

    // Validate Program Selection
    if (empty($program)) {
        $errors['program'] = "Please select a program.";
    }

    // Check if there are any errors
    if (empty($errors)) {
        // If no errors, process the form data (e.g., save to database)
        // Example: Database connection and insertion (use prepared statements for security)
        try {
            $dsn = "mysql:host=localhost;dbname=your_database_name;charset=utf8mb4";
            $pdo = new PDO($dsn, "your_db_username", "your_db_password");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Insert the data
            $stmt = $pdo->prepare("INSERT INTO registrations (first_name, last_name, phone, email, program) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$firstName, $lastName, $phone, $email, $program]);

            // Success response
            echo json_encode(["success" => true, "message" => "Registration successful!"]);
        } catch (PDOException $e) {
            // Database error
            echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        }
    } else {
        // If there are errors, return them as JSON
        echo json_encode(["success" => false, "errors" => $errors]);
    }
} else {
    // If the request method is not POST, return an error
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
