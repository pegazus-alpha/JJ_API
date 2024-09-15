import {Link} from 'react-router-dom';




function Header(){
    return(
        <div>
                    <header>
                <nav>
                    <div className="logo">
                        <img src="assets/images/logo.png" alt="Archiva Logo"/>
                    </div>
                
                    <div className="hamburger" id="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                
                    <ul>
                        <li className="active"><Link to="/">Accueil</Link></li>
                        <li><Link to="/all">CERs</Link></li>
                        <li><Link to="/myc">Mes CER Favoris</Link></li>
                        <li><Link to="/gestc">Gestion de CER</Link></li>
                    </ul>
                    <button className="connexion"> <Link to="/login">Connexion</Link></button>
                </nav>
            </header>
        </div>
    )
}
export default Header;