import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.scss';

export default function NewIncident() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    async function handleNewIncident(evt) {

    
        evt.preventDefault();

        const datanewinc = {
            title,
            description,
            value
        };
        try {
            await api.post('incidents', datanewinc, {

                headers: {
                    authorization: ongId,
                }
            });
            history.push('/profile');
        } catch (err) {
            alert('erro');
        }

    }


    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt=" logo be the heroes" />
                    <h1>Cadastrar novo caso</h1>
                    <p>descreva o caso detalhadamente para encontrar um herói para resolver isso</p>
                    <Link className="back-link" to="/profile" >
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea type="ext" placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="" placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="button-group" >
                        <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
