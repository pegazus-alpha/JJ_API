import './App.css';






function Footer(){
    return(
        <footer>
        
        <div className="footer-container">
            <div className="footer-logo-contact">
                <img src="assets/images/logo.png" alt="Archiva Logo" className="footer-logo"/>
                <p className="footer-contact">
                    <i className="fas fa-envelope"></i> info@archiva.com <br/>
                    <i className="fas fa-phone"></i> +237 600 000 000<br/>
                    <i className="fas fa-map-marker-alt"></i> Yassa, Douala/Cameroun
                </p>
            </div>
            <div className="footer-links">
                <h3>Accueil</h3>
                <ul>
                    <li><a href="#">CERs</a></li>
                    <li><a href="#">Mes CERs favoris</a></li>
                    <li><a href="#">Gestion de CER</a></li>
                </ul>
            </div>
            <div className="footer-social">
                <h3>Social Profiles</h3>
                <ul>
                    <li><a href="#"><i className="fa-brands fa-square-facebook"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i> </a></li>
                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>© 2024 Archiva. All rights reserved.</p>
        </div>
    </footer>
    )
}
export default Footer;