import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function SignIn() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [niveaux, setNiveaux] = useState("X4"); // Valeur par défaut
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Appel API pour l'inscription
            const response = await axios.post('http://localhost:3000/EndPoints/CERPoint.php?request=users', {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                niveaux: niveaux
            });

            if (response.status === 201) {
                // Inscription réussie, rediriger vers la page de connexion
                navigate('/login');
            }
        } catch (error) {
            // Gestion des erreurs d'inscription
            if (error.response && error.response.status === 400) {
                setErrorMessage("Erreur lors de la création du compte. Vérifiez les informations saisies.");
            } else {
                setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
            }
        }
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <div className="login-form">
                        <h2>Créer un compte</h2>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Affiche le message d'erreur */}
                        <form onSubmit={handleSignUp}>
                            <label htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                placeholder="Entrer votre nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                            />

                            <label htmlFor="prenom">Prenom</label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                placeholder="Entrer votre prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                required
                            />

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Entrer votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label htmlFor="password">Mot de passe</label>
                            <div className="password-container">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Entrer votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className="toggle-password">
                                    <i className="fa-solid fa-eye"></i>
                                </span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="niveaux">Niveaux</label>
                                <select
                                    className="sec"
                                    id="niveaux"
                                    name="niveaux"
                                    value={niveaux}
                                    onChange={(e) => setNiveaux(e.target.value)}
                                >
                                    <option value="1">X1</option>
                                    <option value="2">X2</option>
                                    <option value="3">X3</option>
                                    <option value="4">X4</option>
                                    <option value="5">X5</option>
                                </select>
                            </div>

                            <button type="submit" className="btn">Créer un Compte</button>

                            <div className="register-link">
                                Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
                            </div>
                        </form>
                    </div>
                    <div className="login-image">
                        <img src="assets/images/login.png" alt="Login Illustration" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
