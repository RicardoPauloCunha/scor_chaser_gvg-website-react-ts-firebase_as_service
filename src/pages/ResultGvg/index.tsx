import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/firebaseConfig';
import moment from 'moment';

import { getUserLogged } from '../../utils/localStore';
import { ResultGvgs, PlayerPoints } from '../../firebase/models';

import { GroupInfos, Infos, CellTable, Table, HeaderTable, Warn } from './styles';
import { Main } from '../../styles/global';
import PlayerPoint from '../../components/PlayerPoint';
import Menu from '../../components/Menu';

const ResultGvg: React.FC = () => {
    let [lastResult, setLastResult] = useState<ResultGvgs>({ adversary_guild: '', points: 0, result: '', stars: 0, start_date: '', players_points: [] });

    useEffect(() => {
        let uidGuild = getUserLogged()[1];

        firebase.firestore().collection("results_gvgs").where('uid_guild', '==', uidGuild).orderBy("start_date", 'asc').limitToLast(1).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let resultGvgsItem = doc.data() as ResultGvgs;
                setLastResult(resultGvgsItem);
            })
        })
    }, []);

    function classificationPlayerPoint(playerPoint: PlayerPoints) {
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
        <>
            <Menu />

            <Main>
                <h1>Resultado Última GVG</h1>
                {lastResult.adversary_guild !== '' && <GroupInfos>
                    <Infos>
                        <h2>Dados da GVG</h2>
                        <Table>
                            <tbody>
                                <tr>
                                    <HeaderTable>Versus Guilda</HeaderTable>
                                    <CellTable>{lastResult.adversary_guild}</CellTable>
                                </tr>
                                <tr>
                                    <HeaderTable>Resultado</HeaderTable>
                                    <CellTable>{lastResult.result}</CellTable>
                                </tr>
                                <tr>
                                    <HeaderTable>Pontos</HeaderTable>
                                    <CellTable>{lastResult.points}</CellTable>
                                </tr>
                                <tr>
                                    <HeaderTable>Estrelas</HeaderTable>
                                    <CellTable>{lastResult.stars}</CellTable>
                                </tr>
                                <tr>
                                    <HeaderTable>Data Inicio</HeaderTable>
                                    <CellTable>{moment(lastResult.start_date, 'YYYY-MM-DD').format("DD/MM/YYYY")}</CellTable>
                                </tr>
                            </tbody>
                        </Table>
                    </Infos>
                    <Infos>
                        <h2>Pontuação dos Players</h2>
                        {lastResult.players_points.map((playerPoint: PlayerPoints, index: number) =>
                            (<PlayerPoint
                                key={index}
                                name={playerPoint.name_player}
                                atkPoint={playerPoint.atk_point}
                                dfsPoint={playerPoint.dfs_point}
                                totalPoint={playerPoint.atk_point + playerPoint.dfs_point}
                                classification={classificationPlayerPoint(playerPoint)} />))}
                    </Infos>
                </GroupInfos>}
                {lastResult.adversary_guild === '' && <Warn>Nenhum resultado de GvG foi adicionado.</Warn>}
            </Main>
        </>
    )
}

export default ResultGvg;