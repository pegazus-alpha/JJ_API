<?php



// Définir les headers pour JSON et CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Content-Type: application/json");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Access-Control-Allow-Headers: id, Content-Type, Authorization");

// Inclure les fichiers nécessaires
// include_once '../ config/database.php';
include_once '../controlers/CERController.php';
include_once '../controlers/UserController.php';
include_once '../controlers/NiveauController.php';
include_once '../controlers/DomaineController.php';
// Récupérer la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];
$request = $_GET['request'] ?? '';

// Gérer les routes
switch ($request) {
    // Routes pour les utilisateurs
    case 'users':
        if ($method == 'GET') {
            UserController::getAllUsers();
        } elseif ($method == 'POST') {
            UserController::addUser();
        } elseif ($method == 'PUT') {
            UserController::updateUser();
        } elseif ($method == 'DELETE') {
            UserController::deleteUser();
        }
        break;

    case 'authenticate':
        if ($method == 'POST') {
            UserController::authenticateUser();
        }
        break;
    case 'all':
        if ($method == 'GET') {
            CERController::getAllCER();
        }
        break;

    // Routes pour les CER
    case 'cer':
        if ($method == 'GET') {
            CERController::getPaginate();
        } elseif ($method == 'POST') {
            CERController::addCER();
        } elseif ($method == 'PUT') {
            CERController::updateCER();
        } elseif ($method == 'DELETE') {
            CERController::deleteCER();
        }
        break;
        case 'likeCER':
            if ($method == 'PUT') {
                CERController::likeCER();
            }
            break;
        // Routes pour les niveaux
        case 'niveaux':
            if ($method == 'GET') {
                NiveauController::getAllNiveaux();
            } elseif ($method == 'POST') {
                NiveauController::addNiveau();
            } elseif ($method == 'PUT') {
                NiveauController::updateNiveau();
            } elseif ($method == 'DELETE') {
                NiveauController::deleteNiveau();
            }
            break;
            //Routes poue les domaines
        case 'domaines':
            if ($method == 'GET') {
                DomaineController::getAllDomaines();
            } elseif ($method == 'POST') {
                DomaineController::addDomaine();
            } elseif ($method == 'PUT') {
                DomaineController::updateDomaine();
            } elseif ($method == 'DELETE') {
                DomaineController::deleteDomaine();
            }
        break;
        case 'topLikedCERs':
            if ($method == 'GET') {
                CERController::getTopLike();
            }
            break;
        case 'sessionInfo':
            if ($method == 'GET') {
                UserController::getSessionInfo();
            }
            break;
        
        default:
            http_response_code(404);
            echo json_encode(["message" => "Route non trouvée"]);
            break;
}
?>
