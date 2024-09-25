<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My PHP PWA</title>
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="manifest" href="/manifest.json">
  <script src="/js/app.js" defer></script>
</head>
<body>
  <h1>Welcome to My PHP-based PWA</h1>
  <p>Dynamic content generated by PHP.</p>
  <?php
    // PHP code that generates dynamic content
    echo "<p>The current date and time is: " . date("Y-m-d H:i:s") . "</p>";
  ?>
</body>
</html>