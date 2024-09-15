<?php


include '../models/User.php';


class UserController {
    // Démarrer la session
    private static function startSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    // Récupérer tous les utilisateurs
    public static function getAllUsers() {
        self::startSession();
        $userList = User::getAll();
        echo json_encode($userList);
    }

    // Ajouter un nouvel utilisateur
    public static function addUser() {
        self::startSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $nom = $data['nom'];
        $prenom = $data['prenom'];
        $email = $data['email'];
        $password = $data['password'];
        $niveau = $data['niveaux'];
        
        // Store the new user and get their ID
        $userId = User::add($nom, $prenom, $email, $password, $niveau);
    
        // Save user ID in the session
        $_SESSION['user'] = [
            'id' => $userId,
            'nom' => $nom,
            'prenom' => $prenom,
            'email' => $email,
            'niveau' => $niveau
        ];
    
        // Optionally, set a cookie or token for authentication
        setcookie('auth_token', 'some_unique_token', time() + 3600, '/');
        
        echo json_encode(["message" => "Utilisateur ajouté", "userId" => $userId]);
    }
    
    // Modifier un utilisateur
    public static function updateUser() {
        self::startSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nom = $data['nom'];
        $prenom = $data['prenom'];
        $email = $data['email'];
        $niveau = $data['niveau'];
        User::update($id, $nom, $prenom, $email, $niveau);
        echo json_encode(["message" => "Utilisateur mis à jour"]);
    }

    // Supprimer un utilisateur
    public static function deleteUser() {
        self::startSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        User::delete($id);
        echo json_encode(["message" => "Utilisateur supprimé"]);
    }

    // Authentification utilisateur
    public static function authenticateUser() {
        self::startSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'];
        $password = $data['password'];
        $user = User::authenticate($email, $password);

        if ($user) {
            // Enregistrer les informations utilisateur dans la session
            $_SESSION['user'] = [
                'id' => $user['id'],
                'nom' => $user['nom'],
                'prenom' => $user['prenom'],
                'email' => $user['email'],
                'niveau' => $user['niveau']
            ];

            // Définir un cookie pour l'utilisateur (par exemple, un jeton d'authentification)
            setcookie('auth_token', 'some_unique_token', time() + 3600, '/'); // Cookie valable pour 1 heure
            
            echo json_encode(["message" => "Authentification réussie", "user" => $user]);
        } else {
            http_response_code(401);  // Non autorisé
            echo json_encode(["message" => "Authentification échouée"]);
        }
    }
    public static function getSessionInfo() {
        self::startSession();
        if (isset($_SESSION['user'])) {
            echo json_encode($_SESSION['user']);
        } else {
            echo json_encode(["message" => "Aucun utilisateur connecté."]);
        }
    }
    
}
?>
