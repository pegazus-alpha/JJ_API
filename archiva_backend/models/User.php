<?php
// include "../config/database.php";
class User {
    // Connexion à la base de données
    private static function connect() {
        $database = new Database();
        return $database->getConnection();
    }

    // Récupérer tous les utilisateurs
    public static function getAll() {
        $conn = self::connect();
        $query = "SELECT * FROM user";
        $result = $conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Ajouter un nouvel utilisateur
    public static function add($nom,$prenom, $email, $password, $niveau) {
        $conn = self::connect();
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);  // Hachage du mot de passe
        $stmt = $conn->prepare("INSERT INTO user (nom,prenom, email, password, niveau) VALUES (?, ?, ?, ?,?)");
        $stmt->bind_param("ssssi", $nom,$prenom, $email, $hashed_password, $niveau);
        $stmt->execute();
        return $stmt->insert_id;
    }

    // Modifier un utilisateur
    public static function update($id, $nom,$prenom, $email,$niveau) {
        $conn = self::connect();
        $stmt = $conn->prepare("UPDATE user SET nom = ?,prenom=?, email = ?, niveau = ? WHERE id = ?");
        $stmt->bind_param("ssii", $nom,$prenom, $email,$niveau,$id);
        $stmt->execute();
    }

    // Supprimer un utilisateur
    public static function delete($id) {
        $conn = self::connect();
        $stmt = $conn->prepare("DELETE FROM user WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }

    // Authentification utilisateur
    public static function authenticate($email, $password) {
        $conn = self::connect();
        $stmt = $conn->prepare("SELECT * FROM user WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        // Vérification du mot de passe
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        return null;
    }
}
?>
