<?php

include '../models/CER.php';
include '../models/Tags.php'; // Ensure this is included if needed for Tag operations

class CERController {
    // Démarrer la session
    public static function startSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    // Récupérer tous les CER
    public static function getTopLike() {
        CER::getTopLikedCERs();
        // echo json_encode($topLikedCERs);
    }
    

    public static function getAllCER() {
        try {
            // Appel de la méthode getAll() du modèle pour obtenir les CERs
            $cerList = CER::getAll();

            // Définir l'en-tête de réponse comme JSON
            // header('Content-Type: application/json');

            // Convertir la liste des CERs en JSON et l'afficher
            echo json_encode($cerList);

        } catch (Exception $e) {
            // En cas d'erreur, renvoyer une réponse JSON avec un message d'erreur
            // header('Content-Type: application/json');
            http_response_code(500); // Code d'erreur interne du serveur
            echo json_encode(['error' => 'Erreur lors de la récupération des CERs: ' . $e->getMessage()]);
        }
    }

    public static function getPaginate() {
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 6;
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        $sort = isset($_GET['sort']) ? $_GET['sort'] : 'titre';

        $cerList = CER::getPaginate($page, $limit, $search, $sort);
        echo json_encode($cerList);
    }

    // Ajouter un nouveau CER
    public static function addCer() {
        self::startSession();

        // Récupérer les données du formulaire
        $data = json_decode(file_get_contents("php://input"), true);
        $titre = $_POST['titre'];
        $description = $_POST['description'];
        $user = $_POST['user'];
        $niveau = $_POST['niveau'];
        $specialites = $_POST['specialites']; // tableau de spécialités choisies

        // Handling file upload
        $fichier = $_FILES['fichier'];
        $image = $_FILES['image'];

        // Générer un nom unique pour le fichier
        $fichierUniqueName = self::handleFileUpload($fichier, '../uploads/files/');
        if (!$fichierUniqueName) {
            echo json_encode(["message" => "Erreur lors du téléchargement du fichier"]);
            return;
        }

        // Générer un nom unique pour l'image
        $imageUniqueName = self::handleFileUpload($image, '../uploads/images/');
        if (!$imageUniqueName) {
            echo json_encode(["message" => "Erreur lors du téléchargement de l'image"]);
            return;
        }

        // Ajouter un nouvel élément dans la table cer
        $cerId = CER::add($titre, $description, $user, $niveau, $fichierUniqueName, $imageUniqueName);
        $specialiten=json_decode($specialites, true);
        // Ajouter les spécial ités dans la table tags (correspondance cer-domaine)
        foreach ($specialiten as $specialiteId) {
            Tag::add($cerId, $specialiteId); // Ajouter une entrée pour chaque spécialité
        }

        echo json_encode(["message" => "CER ajouté avec succès", "cerId" => $cerId]);
    }

    // Modifier un CER
    public static function updateCER() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $titre = $data['titre'];
        $description = $data['description'];
        $user = $data['user'];
        $niveau = $data['niveau'];
        $image = $data['image'];
        $fichier = $data['fichier'];
        
        CER::update($id, $titre, $description, $user, $niveau, $image, $fichier);
        echo json_encode(["message" => "CER mis à jour"]);
    }

    // Supprimer un CER
    public static function deleteCER() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];

        // Check if the CER can be deleted by removing associated tags first
        if (CER::delete($id)) {
            echo json_encode(["message" => "CER supprimé"]);
        } else {
            echo json_encode(["message" => "Erreur lors de la suppression du CER"]);
        }
    }

    // Gérer les likes d'un CER
    public static function likeCER() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $_POST['id'];
        CER::updateLikes($id);
        echo json_encode(["message" => "Like ajouté"]);
    }

    // Helper function to handle file uploads
    private static function handleFileUpload($file, $destinationFolder) {
        if (isset($file) && $file['error'] === UPLOAD_ERR_OK) {
            $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $uniqueName = uniqid() . '.' . $fileExtension;
            $destination = $destinationFolder . $uniqueName;

            if (move_uploaded_file($file['tmp_name'], $destination)) {
                return $uniqueName;
            }
        }
        return false;
    }
}

?>
