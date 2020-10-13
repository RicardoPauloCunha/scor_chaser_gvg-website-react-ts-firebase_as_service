import React, { FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import PlayerRegister from '../../components/PlayerRegister';
import MenuBar from '../../components/MenuBar';

import { Bar, Background, TitlePage, SubtitlePage, ListPlayers, MainG, Message } from '../../assents/styleds/global';
import { getUserLogged, setConcludedPage } from '../../utils/localStore';

const GroupInput = styled.div`
    @media (min-width: 768px)
    {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

export interface PlayerPointsProps {
    name_player: string;
    atk_point: number;
    dfs_point: number;
}

interface GuildProps {
    name: string;
    players: string[];
}

function LastGvg() {
    const history = useHistory();
    const [uidGuild, setUidGuild] = useState("");

    const [guild, setGuild] = useState<GuildProps>({ name: "", players: [] });

    let [adversary_guild, setAdversaryGuild] = useState("");
    let [result, setResult] = useState("");
    let [points, setPoints] = useState("");
    let [stars, setStars] = useState("");
    let [start_date, setStartDate] = useState("");

    let [name_player, setNamePlayer] = useState("");
    let [atk_point, setAtkPoint] = useState(0);
    let [dfs_point, setDfsPoint] = useState(0);
    let [indexPlayerPoint, setIndexPlayerPoint] = useState(-1);
    let [players_points, setPlayersPoints] = useState<PlayerPointsProps[]>([]);

    const resultList = [
        "Vitória",
        "Derrota"
    ];

    useEffect(() => {
        let uid = getUserLogged()[1];
        setUidGuild(uid);

        firebase.firestore().collection('guilds').doc(uid).get().then(g => {
            let guildItem = g.data() as GuildProps;

            setGuild(guildItem);
        });
    }, []);

    function handlerPlayersPoints() {
        if (indexPlayerPoint !== -1) {
            players_points[indexPlayerPoint] = { name_player, atk_point, dfs_point };
            setPlayersPoints([...players_points]);
            setIndexPlayerPoint(-1);
        } else {
            setPlayersPoints([...players_points, { name_player, atk_point, dfs_point }]);
        }
        setNamePlayer("");
        setAtkPoint(0);
        setDfsPoint(0);
    }

    function editPlayerPoint(index: number) {
        let p = players_points[index];

        setNamePlayer(p.name_player);
        setAtkPoint(p.atk_point);
        setDfsPoint(p.dfs_point);

        setIndexPlayerPoint(index);
    }

    function removePlayerPoint(index: number) {
        players_points.splice(index, 1);
        setPlayersPoints([...players_points]);
    }

    function registerLastGvg(e: FormEvent) {
        e.preventDefault();

        let lastGvg = {
            adversary_guild,
            result,
            points,
            stars,
            start_date,
            players_points,
            uid_guild: uidGuild
        }

        firebase.firestore().collection("lasts_results_guilds").add(lastGvg).then(() => {
            setConcludedPage(1);

            history.push("/concluded");
        }).catch(err => {
            alert("Ocorreu um erro interno ao registrar o resultado da GVG")
        });
    }

    return (

        <Background>
            <MenuBar linkId={1} />

            <MainG>
                <TitlePage>Adicionar Resultados Última GVG</TitlePage>

                <form onSubmit={registerLastGvg}>
                    <GroupInput>
                        <Input
                            label="Versus Guilda"
                            name="versusGuild"
                            placeholder="Nome da guilda adversária"
                            type="text"
                            value={adversary_guild}
                            onChange={(e) => setAdversaryGuild(e.target.value)}
                            required
                        />
                        <Select
                            label="Resultado"
                            name="result"
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            options={resultList.map(r => ({ label: r, value: r }))}
                        />
                    </GroupInput>
                    <GroupInput>
                        <Input
                            label="Pontos"
                            name="points"
                            placeholder="Pontos"
                            type="text"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            required
                        />
                        <Input
                            label="Estrelas"
                            name="stars"
                            placeholder="Estrelas"
                            type="text"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                            required
                        />
                        <Input
                            label="Data Início"
                            name="dataStart"
                            type="date"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </GroupInput>

                    <Bar />

                    <SubtitlePage>Adicionar Pontuação Players</SubtitlePage>

                    <GroupInput>
                        <Select
                            label="Player"
                            name="player"
                            value={name_player}
                            onChange={(e) => setNamePlayer(e.target.value)}
                            options={guild.players.map(p => ({ label: p, value: p }))}
                        />
                        <Input
                            label="Pontos de ataque"
                            name="atkPoints"
                            placeholder="Estrelas ganhas"
                            type="text"
                            value={atk_point}
                            onChange={(e) => setAtkPoint(Number(e.target.value))}
                        />
                        <Input
                            label="Pontos de defesa"
                            name="dfsPoints"
                            placeholder="Estrelas defendidas"
                            value={dfs_point}
                            onChange={(e) => setDfsPoint(Number(e.target.value))}
                            type="text"
                        />
                    </GroupInput>

                    <Button type="button" onClick={() => handlerPlayersPoints()}>{indexPlayerPoint !== -1 ? 'Salvar' : 'Adicionar'}</Button>

                    <ListPlayers>
                        {players_points.map((player: PlayerPointsProps, index) =>
                            <PlayerRegister
                                key={index}
                                atkPoint={player.atk_point}
                                dfsPoint={player.dfs_point}
                                name={player.name_player}
                                editPlayer={() => editPlayerPoint(index)}
                                removePlayer={() => removePlayerPoint(index)}
                            />)}
                        {players_points.length === 0 && (
                            <Message>Adicione os Players da sua guilda</Message>
                        )}
                    </ListPlayers>

                    <Bar />

                    <Button>Lançar pontuação</Button>
                </form>
            </MainG>
        </Background>
    )
}

export default LastGvg;