<?php
class TagController {
    // Récupérer tous les tags avec les détails du CER et du Domaine
    public static function getAllTags() {
        $tagList = Tag::getAll();
        echo json_encode($tagList);
    }

    // Ajouter un nouveau tag
    public static function addTag() {
        $data = json_decode(file_get_contents("php://input"), true);
        $cer_id = $data['cer'];
        $domaine_id = $data['domaine'];
        Tag::add($cer_id, $domaine_id);
        echo json_encode(["message" => "Tag ajouté"]);
    }

    // Modifier un tag
    public static function updateTag() {
        $data = json_decode(file_get_contents("php://input"), true);
        // $id = $data['id'];
        $cer_id = $data['cer'];
        $domaine_id = $data['domaine'];
        Tag::update($cer_id, $domaine_id);
        echo json_encode(["message" => "Tag mis à jour"]);
    }

    // Supprimer un tag
    public static function deleteTag() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        Tag::delete($id);
        echo json_encode(["message" => "Tag supprimé"]);
    }
}
?>
