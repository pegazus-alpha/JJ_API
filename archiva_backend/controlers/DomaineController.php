<?php
include '../models/Domaine.php';

class DomaineController {
    // Récupérer tous les domaines
    public static function getAllDomaines() {
        $domaineList = Domaine::getAll();
        echo json_encode($domaineList);
    }

    // Ajouter un nouveau domaine
    public static function addDomaine() {
        $data = json_decode(file_get_contents("php://input"), true);
        $nom = $data['nom'];
        Domaine::add($nom);
        echo json_encode(["message" => "Domaine ajouté"]);
    }

    // Modifier un domaine
    public static function updateDomaine() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nom = $data['nom'];
        Domaine::update($id, $nom);
        echo json_encode(["message" => "Domaine mis à jour"]);
    }

    // Supprimer un domaine
    public static function deleteDomaine() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        Domaine::delete($id);
        echo json_encode(["message" => "Domaine supprimé"]);
    }
}
?>
