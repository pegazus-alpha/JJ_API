/*
 * @Author: error: pegazus-alpha && pourdebutantp@gmail.com & please set dead value or install git
 * @Date: 2024-09-13 23:59:37
 * @LastEditors: pegazus-alpha pourdebutantp@gmail.com
 * @LastEditTime: 2024-09-15 06:43:39
 * @FilePath: \archiva\src\AllC.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import Cookies from 'js-cookie';

function AllC() {
    const [cers, setCers] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('nom');
    const [currentPage, setCurrentPage] = useState(1);  // Page courante
    const [itemsPerPage,setItemPerPage] = useState(6);  // Nombre d'éléments par page
    const [totalItems, setTotalItems] = useState(0);  // Total des éléments

    const fetchCers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/EndPoints/CERPoint.php?request=cer', {
                params: {
                    search: search,
                    sort: sort,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            const data = response.data;
            console.log("Données reçues de l'API:", data);

            if (Array.isArray(data.items)) {
                setCers(data.items); // Mettre à jour les CERs avec les données paginées
                setTotalItems(data.total_items); // Mettre à jour le nombre total d'éléments
            } else {
                console.error("Les données reçues ne sont pas un tableau.");
                setCers([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des CERs :", error);
            setCers([]);
        }
    };

    // Appel API initial lorsque le composant se monte
    useEffect(() => {
        fetchCers();
    }, [search, sort, currentPage]); // Inclure currentPage pour que la pagination fonctionne

    const handleLikeClick = async (cerId) => {
        // const likedCersCookie = Cookies.get('likedCers');
        // let likedCers = likedCersCookie ? JSON.parse(likedCersCookie) : [];

            try {
                await axios.put('http://localhost:3000/EndPoints/CERPoint.php?request=likeCER', { id: cerId });

                // setCers(cers.map(cer => 
                //     cer.id === cerId ? { ...cer, likes: cer.likes + 1 } : cer
                // ));
                // likedCers.push(cerId);
                // Cookies.set('likedCers', JSON.stringify(likedCers), { expires: 365 });
            } catch (error) {
                console.error("Erreur lors du like du CER :", error);
            }
       
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calcul du total de pages

    return (
        <div>
            <Header />
            <main>
                <div className="title">
                    <h2>Tous les CERs</h2>
                </div>

                <div className="search-bloc">
                    <div className="cer-numbers">
                        <p>{totalItems} CERs au total</p>  {/* Total d'éléments */}
                    </div>

                    <div className="search">
                        <input
                            type="text"
                            placeholder="Rechercher un CER"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <i className="fa fa-search"></i>
                    </div>

                    <div className="sort-bloc">
                        <label>Trier par : </label>
                        <select
                            name="trie"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="nom">Nom</option>
                            <option value="auteur">Auteur</option>
                            <option value="date">Date</option>
                        </select>
                        <i className="fas fa-th-large active"></i>
                        <i className="fa-solid fa-list"></i>
                    </div>
                </div>

                <section className="all-cer-list">
                    <div className="cer-cards">
                        <div className="cer-cards-row">
                            {Array.isArray(cers) && cers.map(cer => (
                                <div className="cer-card" key={cer.id}>
                                    <div className="cer-card__image">
                                        <img src={cer._image} alt={cer.titre} />
                                    </div>
                                    <div className="cer-info">
                                        <div className="author">
                                            <i 
                                                className="fa-regular fa-heart"
                                                onClick={() => handleLikeClick(cer.id)}
                                            ></i>
                                            <p>par {cer.author_prenom} {cer.author_nom}</p>
                                        </div>
                                        <h3>{cer.titre}</h3>
                                        <p>{cer.description}</p>
                                        <button className="consult">Consulter le CER</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <span
                            key={index}
                            className={`page ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AllC;
