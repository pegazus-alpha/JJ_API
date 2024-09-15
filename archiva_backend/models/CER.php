<?php
include "../config/database.php";
class CER {
    // Connexion à la base de données
    private static function connect() {
        $database = new Database();
        return $database->getConnection();
    }

    // Récupérer tous les CER
    // public static function getAll() {
    //     $conn = self::connect();
    //     $query = "SELECT * FROM cer";
    //     $result = $conn->query($query);
    //     return $result->fetch_all(MYSQLI_ASSOC);
    // }
    // Récupérer les CERs avec pagination, recherche, et tri
    public static function getAll() {
        $conn = self::connect();

        // Préparation de la requête SQL
        $sql = "SELECT cer.id, cer.titre AS titre, cer.description, cer.user, cer.image AS _image,cer.likes AS likes, domaine.nom AS domaine, cer.niveau,
        cer.fichier AS fichier, user.nom AS author_nom, user.prenom AS author_prenom,niveau.nom As niveau
            FROM cer
            JOIN tags ON cer.id = tags.cer
            JOIN domaine ON tags.domaine = domaine.id
            JOIN user ON cer.user = user.id
            Join niveau ON cer.niveau = niveau.id";
            
            
            $result = $conn->query($sql);
            $items = $result->fetch_all(MYSQLI_ASSOC);
            return $items;
    }
    public static function getPaginate($page = 1, $limit = 6, $search = '', $sort = 'titre') {
        $conn = self::connect();
        $offset = ($page - 1) * $limit;

        // Sécuriser les paramètres
        $search = $conn->real_escape_string($search);
        $sort = in_array($sort, ['titre', 'auteur', 'date']) ? $sort : 'titre';

        // Obtenir le nombre total d'éléments
        $total_sql = "SELECT COUNT(*) as total FROM cer WHERE titre LIKE '%$search%'";
        $total_result = $conn->query($total_sql);
        $total_row = $total_result->fetch_assoc();
        $total_items = $total_row['total'];
        $total_pages = ceil($total_items / $limit);

        

       
// Requête pour obtenir les CERs avec pagination
        $sql = "SELECT cer.id, cer.titre AS titre, cer.description, cer.user, cer.image AS _image, domaine.nom AS domaine, cer.niveau,
                       cer.fichier AS fichier, user.nom AS author_nom, user.prenom AS author_prenom,niveau.nom As niveau
                FROM cer
                JOIN tags ON cer.id = tags.cer
                JOIN domaine ON tags.domaine = domaine.id
                JOIN user ON cer.user = user.id
                Join niveau ON cer.niveau = niveau.id
                WHERE cer.titre LIKE '%$search%'
                ORDER BY " . ($sort == 'titre' ? 'cer.titre' : ($sort == 'auteur' ? 'user.nom' : 'cer.date')) . "
                LIMIT $limit OFFSET $offset";
        $result = $conn->query($sql);
        $items = $result->fetch_all(MYSQLI_ASSOC);

        return [
            'total_items' => $total_items,
            'total_pages' => $total_pages,
            'items' => $items
        ];
    }


    // Ajouter un nouveau CER
    public static function add($titre,$description,$user,$niveau,$image,$fichier) {
        $conn = self::connect();
        $like=0;
        $stmt = $conn->prepare("INSERT INTO cer (titre, description,user,niveau, likes,image,fichier) VALUES (?, ?, ?,?,?,?,?)");
        $stmt->bind_param("ssiiiss", $titre,$description,$user,$niveau,$like,$image,$fichier);
        $stmt->execute();
        return $stmt->insert_id;
    }

    // Modifier un CER
    public static function update($id ,$titre,$description,$user,$niveau,$image,$fichier) {
        $conn = self::connect();
        $stmt = $conn->prepare("UPDATE cer SET titre = ?, description = ?,user=?,niveau=?,likes=?,image=?,fichier=? WHERE id = ?");
        $stmt->bind_param("ssiissi", $titre,$description,$user,$niveau,$image,$fichier,$id);
        $stmt->execute();
    }

    // Supprimer un CER
    public static function delete($id) {
        $db = self::connect();        
        // Delete tags associated with the CER
        $query = "DELETE FROM tags WHERE cer = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        
        // Now delete the CER
        $query = "DELETE FROM cer WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        
        return $stmt->affected_rows > 0;
    }
    

    // Gérer les likes d'un CER
    public static function updateLikes($id) {
        $conn = self::connect();
        $stmt = $conn->prepare("UPDATE cer SET likes = likes + 1 WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }
    public static function getTopLikedCERs() {
        // $db = Database::getConnection();
        $conn = self::connect();

        $query = "SELECT * FROM cer ORDER BY likes DESC LIMIT 6";

        $stmt = $conn->query($query);
        // $stmt->execute();

        $cers = $stmt->fetch_all(MYSQLI_ASSOC);

        echo json_encode($cers);
    }
}
?>
