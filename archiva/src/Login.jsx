
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
// import styles from './login.css'

function Login() {
    const [email, setEmail] = useState("");  // État pour l'email
    const [password, setPassword] = useState("");  // État pour le mot de passe
    const [errorMessage, setErrorMessage] = useState("");  // État pour les messages d'erreur
    const navigate = useNavigate();  // Hook pour rediriger après connexion

    const handleLogin = async (e) => {
        e.preventDefault();  // Empêche la soumission par défaut du formulaire

        try {
            // Appel API pour authentification
            const response = await axios.post('http://localhost:3000/EndPoints/CERPoint.php?request=authenticate', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                // Authentification réussie, rediriger vers la page d'accueil ou dashboard
                navigate('/gestc');
            }
        } catch (error) {
            // Gestion des erreurs d'authentification
            if (error.response && error.response.status === 401) {
                setErrorMessage("Email ou mot de passe incorrect.");
            } else {
                setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                    <h2>Se connecter</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Affiche le message d'erreur */}
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Entrer votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  // Met à jour l'état de l'email
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
                                onChange={(e) => setPassword(e.target.value)}  // Met à jour l'état du mot de passe
                                required
                            />
                            <span className="toggle-password">
                                <i className="fa-solid fa-eye"></i>  
                            </span>
                        </div>
                        
                        <div className="forgot-password">
                            <a href="#">Mot de passe oublié ?</a>
                        </div>
                        
                        <button type="submit" className="btn">Se connecter</button>
                        
                        <div className="register-link">
                            Vous n'avez pas de compte? <Link to="/SignIn">Créez un nouveau compte</Link>
                        </div>
                    </form>
                </div>
                <div className="login-image">
                    <img src="assets/images/login.png" alt="Login Illustration" />
                </div>
            </div>
        </div>
    );
}

export default Login;
