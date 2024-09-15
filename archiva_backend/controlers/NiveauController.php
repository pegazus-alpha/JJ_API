<?php
include '../models/Niveau.php';

class NiveauController {
    // Récupérer tous les niveaux
    public static function getAllNiveaux() {
        $niveauList = Niveau::getAll();
        echo json_encode($niveauList);
    }

    // Ajouter un nouveau niveau
    public static function addNiveau() {
        $data = json_decode(file_get_contents("php://input"), true);
        $nom = $data['nom'];
        Niveau::add($nom);
        echo json_encode(["message" => "Niveau ajouté"]);
    }

    // Modifier un niveau
    public static function updateNiveau() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nom = $data['nom'];
        Niveau::update($id, $nom);
        echo json_encode(["message" => "Niveau mis à jour"]);
    }

    // Supprimer un niveau
    public static function deleteNiveau() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        Niveau::delete($id);
        echo json_encode(["message" => "Niveau supprimé"]);
    }
}
?>
