import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";

function Home() {
    const [topCers, setTopCers] = useState([]);
    const [likedCers, setLikedCers] = useState(new Set()); // État pour stocker les CERs likés

    // Fonction pour gérer le "like" d'un CER
    const handleLike = async (cerId) => {
        if (likedCers.has(cerId)) {
            // Si le CER est déjà liké, ne rien faire
            return;
        }

        try {
            // Mise à jour du nombre de "likes" en base de données via l'API
            await fetch('http://localhost:3000/EndPoints/CERPoint.php?request=likeCER', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: cerId })
            });

            // Mettre à jour l'état des CERs likés
            setLikedCers(new Set(likedCers).add(cerId));

            // Définir ou mettre à jour le cookie avec l'ID du CER liké
            document.cookie = `liked_cers=${Array.from(likedCers).concat(cerId).join(',')}; path=/;`;

            // Optionnel : Recharger les CERs pour mettre à jour l'affichage
            fetchTopCers();
        } catch (error) {
            console.error("Erreur lors du like du CER :", error);
        }
    };

    // Fonction pour récupérer les CER les plus populaires depuis l'API
    const fetchTopCers = async () => {
        try {
            const response = await fetch('http://localhost:3000/EndPoints/CERPoint.php?request=topLikedCERs');
            const data = await response.json();
            
            // Assurez-vous que `data.items` contient le tableau de CERs
            if (Array.isArray(data)) {
                setTopCers(data);
            } else {
                console.error("Les données reçues ne contiennent pas un tableau d'items.");
                setTopCers([]);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des CER:', error);
        }
    };


    // Appel API initial lorsque le composant se monte
    useEffect(() => {
        fetchTopCers();

        // Charger les CERs likés depuis le cookie
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
        }, {});

        if (cookies.liked_cers) {
            setLikedCers(new Set(cookies.liked_cers.split(',')));
        }
    }, []); // Le tableau de dépendances est vide, donc l'effet s'exécute une seule fois lors du premier montage

    return (
        <div>
            <Header />
            <main>
                <section>
                    <div className="search-container">
                        <div className="search-box">
                            <i className="fa fa-search"></i>
                            <input type="text" placeholder="Rechercher un CER" />
                        </div>
                    </div>
                </section>

                <section className="hero">
                    <div className="welcome-bloc">
                        <img src="assets/images/accent.png" alt="Icône d'accentuation" className="accent-icon" />
                        <h1>Bienvenue sur Archiva, votre espace</h1>
                    </div>
                    <h2>Espace d'archivage d'anciens CERs</h2>
                    <p>L'homme n'est rien sans son bord</p>
                    <div className="hero-buttons">
                        <button className="explorer">Explorer plus de CER</button>
                        <button className="all-cer">Tous les CERs</button>
                    </div>
                </section>

                <section className="cer-list">
                    <div className="titre-liste">
                        <div className="desc-liste">
                            <h2>Les meilleurs CERs du moment</h2>
                            <p>Découvrez ci-dessous les CERs les plus appréciés par notre communauté d'utilisateurs. Ces CERs ont été sélectionnés et évalués par nos membres en fonction de leur qualité, pertinence et utilité.</p>
                        </div>
                        <button className="all-cer">Voir plus</button>
                    </div>

                    <div className="cer-cards-row">
                        {topCers.length > 0 ? (
                            topCers.map((cer) => (
                                <div className="cer-card" key={cer.id}>
                                    <div className="cer-card__image">
                                        <img src={cer.image} alt={cer.titre} />
                                    </div>
                                    <div className="cer-info">
                                        <div className="author">
                                            <i
                                                className={`fa-regular fa-heart ${likedCers.has(cer.id) ? 'liked' : ''}`}
                                                onClick={() => handleLike(cer.id)}
                                            ></i>
                                            <p>par {cer.auteur}</p>
                                        </div>
                                        <h3>{cer.titre}</h3>
                                        <p>{cer.description}</p>
                                        <button className="consult">Consulter le CER</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chargement des CER les plus populaires...</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
