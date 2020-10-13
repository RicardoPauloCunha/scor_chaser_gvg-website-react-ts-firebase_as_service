import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from '../../services/firebaseConfig';
import moment from 'moment';

import { PlayerPointsProps } from '../LastGvg';

import PlayerPoint from '../../components/PlayerPoint';
import { Background, TitlePage, SubtitlePage, MainG } from '../../assents/styleds/global';
import { getUserLogged } from '../../utils/localStore';
import MenuBar from '../../components/MenuBar';

const GroupInfos = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`;

const Infos = styled.div`
    &:first-child {
        margin: 1rem auto 2rem auto;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 1024px) {
        width: 45%;
        margin: 1rem auto;
    }
`;

const TTable = styled.table`
    border-collapse: collapse;
    color: var(--color-black);
`;

const TTitle = styled.th`
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border: 1px solid var(--color-blue);
`;

const TCell = styled.th`
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border: 1px solid var(--color-blue);
`;

interface LastResultGuildProps {
    adversary_guild: string;
    points: number;
    result: string;
    stars: number;
    start_date: string;
    players_points: PlayerPointsProps[];
}

function ViewPoints() {
    let [lastResult, setLastResult] = useState<LastResultGuildProps>({ adversary_guild: '', points: 0, result: '', stars: 0, start_date: '', players_points: [] });

    useEffect(() => {
        let uidGuild = getUserLogged()[1];

        firebase.firestore().collection("lasts_results_guilds").where('uid_guild', '==', uidGuild).orderBy("start_date", 'asc').limitToLast(1).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let lastResultGuildItem = doc.data() as LastResultGuildProps;
                setLastResult(lastResultGuildItem);
            })
        })
    }, []);

    function classificationPlayerPoint(playerPoint: PlayerPointsProps) {
        let total = playerPoint.atk_point + playerPoint.dfs_point;
        let classificacao = '';

        if (total >= 12) {
            classificacao = "Excelente";
        } else if (total >= 9) {
            classificacao = "Muito Bom";
        } else if (total >= 6) {
            classificacao = "Bom";
        } else if (total >= 4) {
            classificacao = "Ok";
        } else {
            classificacao = "Não Tão Bom";
        }

        return classificacao;
    }

    return (
        <Background>
            <MenuBar linkId={0} />

            <MainG>
                <TitlePage>Resultado Última GVG</TitlePage>
                <GroupInfos>
                    <Infos>
                        <SubtitlePage>Dados da GVG</SubtitlePage>
                        <TTable>
                            <tbody>
                                <tr>
                                    <TTitle>Versus Guilda</TTitle>
                                    <TCell>{lastResult.adversary_guild}</TCell>
                                </tr>
                                <tr>
                                    <TTitle>Resultado</TTitle>
                                    <TCell>{lastResult.result}</TCell>
                                </tr>
                                <tr>
                                    <TTitle>Pontos</TTitle>
                                    <TCell>{lastResult.points}</TCell>
                                </tr>
                                <tr>
                                    <TTitle>Estrelas</TTitle>
                                    <TCell>{lastResult.stars}</TCell>
                                </tr>
                                <tr>
                                    <TTitle>Data Inicio</TTitle>
                                    <TCell>{moment(lastResult.start_date).format("L")}</TCell>
                                </tr>
                            </tbody>
                        </TTable>
                    </Infos>
                    <Infos>
                        <SubtitlePage>Pontuação dos Players</SubtitlePage>
                        {lastResult.players_points.map((playerPoint: PlayerPointsProps, index: number) =>
                            (<PlayerPoint
                                key={index}
                                name={playerPoint.name_player}
                                atkPoint={playerPoint.atk_point}
                                dfsPoint={playerPoint.dfs_point}
                                totalPoint={playerPoint.atk_point + playerPoint.dfs_point}
                                classification={classificationPlayerPoint(playerPoint)} />))}
                    </Infos>
                </GroupInfos>
            </MainG>
        </Background>
    )
}

export default ViewPoints;