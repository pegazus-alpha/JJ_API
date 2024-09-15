import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'; // Assurez-vous d'avoir installé js-cookie

function MyC() {
    const [likedCers, setLikedCers] = useState([]);

    // Fonction pour lire les ID des CERs likés depuis le cookie
    const getLikedCerIdsFromCookie = () => {
        const likedCersCookie = Cookies.get('likedCers');
        if (likedCersCookie) {
            return JSON.parse(likedCersCookie);
        }
        return [];
    };

    // Fonction pour récupérer les CERs likés
    const fetchLikedCers = async () => {
        const likedCerIds = getLikedCerIdsFromCookie();
        if (likedCerIds.length > 0) {
            try {
                const response = await fetch('http://localhost:3000/EndPoints/CERPoint.php?request=cer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ids: likedCerIds })
                });
                const data = await response.json();
                setLikedCers(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des CERs likés:', error);
            }
        }
    };

    // Charger les CERs likés au montage du composant
    useEffect(() => {
        fetchLikedCers();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <div className="title">
                    <h2>Tous les CERs</h2>
                </div>

                <div className="container">
                    <div className="header">
                        <button className="add-cer-btn">Ajouter un CER</button>
                    </div>

                    <div className="filter">
                        <label>Filtrer: <a href="#">Tous</a></label>
                    </div>

                    <table className="cer-table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Spécialité</th>
                                <th>Niveaux</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {likedCers.length > 0 ? (
                                likedCers.map((cer) => (
                                    <tr key={cer.id}>
                                        <td>{cer.titre}</td>
                                        <td>{cer.specialite}</td>
                                        <td>{cer.niveau}</td>
                                        <td>{cer.date}</td>
                                        <td>
                                            <button className="edit-btn">Éditer</button>
                                            <button className="delete-btn">Supprimer</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Aucun CER liké trouvé</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default MyC;
