import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function GestC() {
    const [showModal, setShowModal] = useState(false);
    const [cers, setCers] = useState([]);
    const [newCer, setNewCer] = useState({
        titre: '',
        niveaux: '',
        user: '',
        niveau: '',
        specialite: [],
        description: '',
        fichier: null,
        image: null
    });
    const [domaines, setDomaines] = useState([]);
    const [specialites, setSpecialites] = useState([]);
    const [niveaux, setNiveaux] = useState([]);

    useEffect(() => {
        fetchDomaines();
        fetchNiveaux();
        fetchCers();
    }, []);

    const fetchSessionInfo = async () => {
        try {
            const response = await axios.get('http://localhost:3000/EndPoints/CERPoint.php?request=sessionInfo');
            console.log('Session Info:', response.data);
            setNewCer(prevCer => ({ ...prevCer, user: response.data.id }));
        } catch (error) {
            console.error('Error fetching session info:', error);
        }
    };

    const fetchDomaines = async () => {
        try {
            const response = await axios.get('http://localhost:3000/EndPoints/CERPoint.php?request=domaines');
            console.log('Domaines reçus:', response.data);
            setDomaines(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des domaines:', error);
        }
    };

    const fetchNiveaux = async () => {
        try {
            const response = await axios.get('http://localhost:3000/EndPoints/CERPoint.php?request=niveaux');
            console.log('Niveaux reçus:', response.data);
            setNiveaux(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des niveaux:', error);
        }
    };

    const fetchCers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/EndPoints/CERPoint.php?request=all');
            console.log('CERs reçus:', response.data);
            setCers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des CERs:', error);
        }
    };

    const handleDelete = async (cerId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/EndPoints/CERPoint.php?request=cer`, {
                headers: {
                    'Content-Type': 'application/json',
                    'id': cerId
                }
            });
    
            if (response.status === 200) {
                console.log('CER supprimé avec succès', cerId);
                // Mettez à jour l'état ou l'interface utilisateur ici si nécessaire
            } else {
                console.error('Erreur lors de la suppression du CER:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du CER:', error.message);
        }
    };
    
    
    
    

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setNewCer(prevCer => ({
                    ...prevCer,
                    specialite: [...prevCer.specialite, value]
                }));
            } else {
                setNewCer(prevCer => ({
                    ...prevCer,
                    specialite: prevCer.specialite.filter(s => s !== value)
                }));
            }
        } else {
            setNewCer({ ...newCer, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setNewCer({ ...newCer, fichier: e.target.files[0] });
    };

    const handleImageChange = (e) => {
        setNewCer({ ...newCer, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('titre', newCer.titre);
        formData.append('description', newCer.description);
        formData.append('user', 4); // Remplacez par l'ID utilisateur correct
        formData.append('niveau', newCer.niveau);
        formData.append('like', 0);
        formData.append('specialites', JSON.stringify(newCer.specialite));
        formData.append('fichier', newCer.fichier);
        formData.append('image', newCer.image);
        
        try {
            const response = await axios.post('http://localhost:3000/EndPoints/CERPoint.php?request=cer', formData);
            setCers([...cers, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du CER', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <div className="title">
                    <h2>Tous les CERs</h2>
                </div>

                <div className="container">
                    <div className="header">
                        <button className="add-cer-btn" onClick={() => { setShowModal(true); fetchSessionInfo(); }}>Ajouter un CER</button>
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
                                <th>Mentions</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cers.map(cer => (
                                <tr key={cer.id}>
                                    <td>{cer.titre}</td>
                                    <td>{cer.domaine}</td>
                                    <td>{cer.niveau}</td>
                                    <td>{cer.likes} {cer.id}</td>
                                    <td>
                                        <button className="edit-btn"><Link to={`edit/${cer.id}`}>Éditer</Link></button>
                                        <button className="delete-btn" onClick={() => handleDelete(cer.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div id="cerModal" className="modal" style={{ display: showModal ? 'block' : 'none' }}>
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                            <h2>Ajouter un nouveau CER</h2>

                            <form onSubmit={handleSubmit}>
                                {/* ... (formulaire d'ajout) */}
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default GestC;
