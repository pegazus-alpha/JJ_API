<?php

class Database {
    // Paramètres de la base de données
    private $host = "localhost";     // Adresse du serveur MySQL
    private $db_name = "archiva";     // Nom de la base de données
    private $username = "root";      // Nom d'utilisateur MySQL
    private $password = "maxime";          // Mot de passe MySQL
    private $conn;

    // Méthode pour obtenir la connexion à la base de données
    public function getConnection() {
        $this->conn = null;

        try {
            // Créer la connexion avec MySQLi
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);

            // Vérifier la connexion
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
        } catch (Exception $e) {
            echo "Erreur de connexion à la base de données: " . $e->getMessage();
        }

        return $this->conn;
    }
}
?>
