<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if vendor/autoload.php exists
$autoload = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoload)) {
    die('Composer autoload file not found at ' . $autoload . '. Please ensure composer install runs during build.');
}

require $autoload;

// Forward Requests to the Public Directory
require __DIR__ . '/../public/index.php';
