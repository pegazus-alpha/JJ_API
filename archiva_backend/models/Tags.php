<?php

class Tag {
    // Connexion à la base de données
    private static function connect() {
        $database = new Database();
        return $database->getConnection();
    }

    // Récupérer tous les tags avec les détails du CER et du Domaine
    public static function getAll() {
        $conn = self::connect();
        $query = "
            SELECT t.cer, t.domaine, c.nom AS cer_nom, d.nom AS domaine_nom
            FROM tags t
            JOIN cer c ON t.cer = c.id
            JOIN domaine d ON t.domaine = d.id
        ";
        $result = $conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Ajouter un nouveau tag
    public static function add($cer_id, $domaine_id) {
        $conn = self::connect();
        $stmt = $conn->prepare("INSERT INTO tags (cer, domaine) VALUES (?, ?)");
        $stmt->bind_param("ii", $cer_id, $domaine_id);
        $stmt->execute();
        return $stmt->insert_id;
    }

    // Modifier un tag
    public static function update($cer_id, $domaine_id) {
        $conn = self::connect();
        $stmt = $conn->prepare("UPDATE tags SET domaine = ?, WHERE cer = ?");
        $stmt->bind_param("ii", $cer_id, $domaine_id);
        $stmt->execute();
    }

    // Supprimer un tag
    public static function delete($id) {
        $conn = self::connect();
        $stmt = $conn->prepare("DELETE FROM tags WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }
}
?>
