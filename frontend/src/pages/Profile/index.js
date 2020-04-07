import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.scss';



export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongname = localStorage.getItem('ong_name');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    useEffect(() => {

        api.get('profile', {
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data.incidents);
        })

    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id} `, {
                headers: {
                    authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incidents => incidents.id !== id));
        }
        catch (error) {
            alert('erro ao deletar caso, tente novamente');
        }
    }

    function Logout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="logo be the heroes" />
                <span>Bem vinda, {ongname} </span>
                <Link className="button" to="/incident/new">Cadastrar um novo caso</Link>
                <button type="button" onClick={() => Logout()}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Casos Registrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição</strong>
                        <p>{incident.description}</p>
                        <strong>valor</strong>
                        <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash size={16} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
