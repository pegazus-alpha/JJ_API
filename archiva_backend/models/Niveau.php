<?php
class Niveau {
    // Connexion à la base de données
    private static function connect() {
        $database = new Database();
        return $database->getConnection();
    }

    // Récupérer tous les niveaux
    public static function getAll() {
        $conn = self::connect();
        $query = "SELECT * FROM niveau";
        $result = $conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Ajouter un nouveau niveau
    public static function add($nom) {
        $conn = self::connect();
        $stmt = $conn->prepare("INSERT INTO niveau (nom) VALUES (?)");
        $stmt->bind_param("s", $nom);
        $stmt->execute();
        return $stmt->insert_id;
    }

    // Modifier un niveau
    public static function update($id, $nom) {
        $conn = self::connect();
        $stmt = $conn->prepare("UPDATE niveau SET nom = ? WHERE id = ?");
        $stmt->bind_param("si", $nom, $id);
        $stmt->execute();
    }

    // Supprimer un niveau
    public static function delete($id) {
        $conn = self::connect();
        $stmt = $conn->prepare("DELETE FROM niveau WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }
}
?>
