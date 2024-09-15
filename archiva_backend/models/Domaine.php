<?php
class Domaine {
    // Connexion à la base de données
    private static function connect() {
        $database = new Database();
        return $database->getConnection();
    }

    // Récupérer tous les domaines
    public static function getAll() {
        $conn = self::connect();
        $query = "SELECT * FROM domaine";
        $result = $conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Ajouter un nouveau domaine
    public static function add($nom) {
        $conn = self::connect();
        $stmt = $conn->prepare("INSERT INTO domaine (nom) VALUES (?)");
        $stmt->bind_param("s", $nom);
        $stmt->execute();
        return $stmt->insert_id;
    }

    // Modifier un domaine
    public static function update($id, $nom) {
        $conn = self::connect();
        $stmt = $conn->prepare("UPDATE domaine SET nom = ? WHERE id = ?");
        $stmt->bind_param("si", $nom, $id);
        $stmt->execute();
    }

    // Supprimer un domaine
    public static function delete($id) {
        $conn = self::connect();
        $stmt = $conn->prepare("DELETE FROM domaine WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }
}
?>
