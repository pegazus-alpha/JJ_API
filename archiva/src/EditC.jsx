import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditC() {
    const { id } = useParams(); // Récupère l'ID du CER depuis l'URL
    const navigate = useNavigate();

    const [cer, setCer] = useState({
        titre: '',
        niveaux: 'X1',
        specialite: [],
        description: '',
        fichier: null,
        image: null // New state for image
    });

    useEffect(() => {
        // Récupère les données du CER à partir de l'API en fonction de l'ID
        fetch(`/api/cer/${id}`)
            .then(response => response.json())
            .then(data => setCer(data))
            .catch(error => console.error('Erreur lors de la récupération du CER:', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setCer((prevCer) => ({
                    ...prevCer,
                    specialite: [...prevCer.specialite, value]
                }));
            } else {
                setCer((prevCer) => ({
                    ...prevCer,
                    specialite: prevCer.specialite.filter(s => s !== value)
                }));
            }
        } else {
            setCer({ ...cer, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setCer({ ...cer, fichier: e.target.files[0] });
    };

    const handleImageChange = (e) => {
        setCer({ ...cer, image: e.target.files[0] }); // Handle image upload
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titre', cer.titre);
        formData.append('niveaux', cer.niveaux);
        formData.append('specialite', cer.specialite);
        formData.append('description', cer.description);
        if (cer.fichier) {
            formData.append('fichier', cer.fichier);
        }
        if (cer.image) {
            formData.append('image', cer.image); // Append image file
        }

        // Envoie les données modifiées à l'API pour mise à jour
        fetch(`/api/cer/${id}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('CER mis à jour:', data);
            navigate('/cer'); // Redirige vers la page des CER après la mise à jour
        })
        .catch(error => console.error('Erreur lors de la mise à jour du CER:', error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titre">Titre du CER</label>
                    <input
                        type="text"
                        id="titre"
                        name="titre"
                        value={cer.titre}
                        onChange={handleInputChange}
                        placeholder="Exemple: Prosit 4.3 - Recherche Opérationnelle"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="niveaux">Niveaux</label>
                    <select
                        id="niveaux"
                        name="niveaux"
                        value={cer.niveaux}
                        onChange={handleInputChange}
                    >
                        <option value="X1">X1</option>
                        <option value="X2">X2</option>
                        <option value="X3">X3</option>
                        <option value="X4">X4</option>
                        <option value="X5">X5</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Domaines de spécialité</label>
                    <div>
                        <input
                            type="checkbox"
                            id="gestion_projet"
                            name="specialite"
                            value="Gestion de projet"
                            checked={cer.specialite.includes('Gestion de projet')}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="gestion_projet">Gestion de projet</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="genie_logiciel"
                            name="specialite"
                            value="Génie-logiciel"
                            checked={cer.specialite.includes('Génie-logiciel')}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="genie_logiciel">Génie-logiciel</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="reseaux_infra"
                            name="specialite"
                            value="Réseaux & Infra"
                            checked={cer.specialite.includes('Réseaux & Infra')}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="reseaux_infra">Réseaux & Infra</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="securite"
                            name="specialite"
                            value="Sécurité"
                            checked={cer.specialite.includes('Sécurité')}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="securite">Sécurité</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="data"
                            name="specialite"
                            value="Data"
                            checked={cer.specialite.includes('Data')}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="data">Data</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description du CER</label>
                    <textarea
                        id="description"
                        name="description"
                        value={cer.description}
                        onChange={handleInputChange}
                        placeholder="Entrez ici la description ou un résumé de votre CER"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fichier">Fichier du CER</label>
                    <div className="file-upload">
                        <input type="file" id="fichier" name="fichier" onChange={handleFileChange} />
                        <p>Cliquez ici pour attacher un nouveau fichier si vous voulez remplacer l'ancien (.pdf ou .docx)</p>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image du CER</label> {/* New Image Field */}
                    <div className="file-upload">
                        <input type="file" id="image" name="image" onChange={handleImageChange} />
                        <p>Cliquez ici pour attacher une image pour le CER (formats acceptés : .jpg, .png)</p>
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn-enregistrer">Enregistrer</button>
                </div>
            </form>
        </div>
    );
}

export default EditC;
