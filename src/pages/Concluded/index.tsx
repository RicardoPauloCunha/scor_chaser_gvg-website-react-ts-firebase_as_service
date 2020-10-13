import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Background, TitlePage } from '../../assents/styleds/global';

import Button from '../../components/Button';
import { getConcludedPage, removeConcludedPage } from '../../utils/localStore';

const Main = styled.div`
    width: 90%;
    margin: 5rem auto 0 auto;
    background-color: var(--color-strong-gray);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 7%;
    text-align: center;
    @media (min-width: 768px) {
        width: 60%;
        padding: 5%;
    }
    @media (min-width: 1024px) {
        width: 40%;
        padding: 3%;
    }
`;

interface ConcludedProps {
    title: string;
    link: string;
    buttonLabel: string;
}

function Concluded() {
    let [concluded, setConcluded] = useState<ConcludedProps>({ title: '', link: '', buttonLabel: '' });

    useEffect(() => {
        let concludedId = getConcludedPage();

        if (concludedId === 0) {
            setConcluded({ title: "Guilda registrada com sucesso", link: "/last-gvg/register", buttonLabel: "Adicionar Resultado Última GVG" });
        } else if (concludedId === 1) {
            setConcluded({ title: "Registro última GvG criada com sucesso", link: "/last-gvg", buttonLabel: "Visualizar registro" });
        } else if (concludedId === 2) {
            setConcluded({ title: "Dados da guilda salvos com sucesso", link: "/guild", buttonLabel: "Concluir" });
        } else {
            setConcluded({ title: "Nenhuma ação realizada", link: "/", buttonLabel: "Entendi" });
        }

        removeConcludedPage();

    }, []);

    return (
        <Background>
            <Main>
                <TitlePage>{concluded.title}</TitlePage>
                <Link className="link--text" to={concluded.link}>
                    <Button>{concluded.buttonLabel}</Button>
                </Link>
            </Main>
        </Background>
    )
}

export default Concluded;