import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getConcludedPage, removeConcludedPage } from '../../utils/localStore';

import { MainConcluded } from './styles';
import Button from '../../components/Button';

interface ConcludedProps {
    title: string;
    link: string;
    buttonLabel: string;
}

const Concluded: React.FC = () => {
    let [concluded, setConcluded] = useState<ConcludedProps>({ title: '', link: '', buttonLabel: '' });

    useEffect(() => {
        let concludedId = getConcludedPage();

        if (concludedId === 0) {
            setConcluded({ title: "Guilda registrada com sucesso", link: "/result-gvg/register", buttonLabel: "Adicionar resultado da GvG" });
        } else if (concludedId === 1) {
            setConcluded({ title: "Registro GvG criada com sucesso", link: "/result-gvg", buttonLabel: "Visualizar registro" });
        } else if (concludedId === 2) {
            setConcluded({ title: "Dados da guilda salvos com sucesso", link: "/guild", buttonLabel: "Concluir" });
        } else {
            setConcluded({ title: "Nenhuma ação realizada", link: "/", buttonLabel: "Entendi" });
        }

        removeConcludedPage();

    }, []);

    return (
        <MainConcluded>
            <h1>{concluded.title}</h1>
            <Link className="link--text" to={concluded.link}>
                <Button>{concluded.buttonLabel}</Button>
            </Link>
        </MainConcluded>
    )
}

export default Concluded;