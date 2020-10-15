import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Guild, PlayerPoints } from '../../firebase/models';
import { getUserLogged, setConcludedPage } from '../../utils/localStore';

import { GroupInput } from './styles';
import { Bar, ListPlayers, Main, MessageListPlayer } from '../../styles/global';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import PlayerRegister from '../../components/PlayerRegister';
import Menu from '../../components/Menu';
import MessageWarn from '../../components/MessageWarn';

interface FormData {
    adversary_guild: string;
    result: string;
    points: number;
    stars: number;
    start_date: string;
}

const RegisterResultGvg: React.FC = () => {
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);
    const [uidGuild, setUidGuild] = useState("");

    const [guild, setGuild] = useState<Guild>({ name: "", email_recovery: '', players: [] });

    let [name_player, setNamePlayer] = useState("");
    let [atk_point, setAtkPoint] = useState(0);
    let [dfs_point, setDfsPoint] = useState(0);
    let [indexPlayerPoint, setIndexPlayerPoint] = useState(-1);
    let [players_points, setPlayersPoints] = useState<PlayerPoints[]>([]);
    let [message, setMessage] = useState("");

    const resultList = [
        "Vitória",
        "Derrota"
    ];

    useEffect(() => {
        let uid = getUserLogged()[1];
        setUidGuild(uid);

        firebase.firestore().collection('guilds').doc(uid).get().then(g => {
            let guildItem = g.data() as Guild;

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

    const handlerSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
                adversary_guild: Yup.string()
                    .required("Informe o nome da guilda adversária"),
                result: Yup.string()
                    .required("Informe o resultado"),
                points: Yup.number()
                    .integer()
                    .typeError("Digite o número de pontos")
                    .required("Informa a quantidade de pontos"),
                stars: Yup.number()
                    .typeError("Digite o número de entrelas")
                    .required("Informe a quantidade de estrelas"),
                start_date: Yup.string()
                    .required("Informe a data de inicio")
            });

            await shema.validate(data, {
                abortEarly: false
            });

            let lastGvg = {
                adversary_guild: data.adversary_guild,
                result: data.result,
                points: data.points,
                stars: data.stars,
                start_date: data.start_date,
                players_points,
                uid_guild: uidGuild
            }

            firebase.firestore().collection("results_gvgs").add(lastGvg).then(() => {
                setConcludedPage(1);

                history.push("/concluded");
            }).catch(err => {
                setMessage("Ocorreu um erro interno ao registrar o resultado da GvG")
            });
        } catch (err) {
            const validationErros: any = {
                adversary_guild: '',
                result: '',
                points: 0,
                stars: 0,
                start_date: '',
            };

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(({ path, message }) => {
                    validationErros[path] = message;
                });

                formRef.current?.setErrors(validationErros);
            }
        }
    }

    return (
        <>
            <Menu />

            <Main>
                <h1>Adicionar Resultados GvG</h1>

                <Form ref={formRef} onSubmit={handlerSubmit}>
                    <GroupInput>
                        <Input
                            label="Versus Guilda"
                            name="adversary_guild"
                            placeholder="Nome da guilda adversária"
                            type="text"
                        />
                        <Select
                            label="Resultado"
                            name="result"
                            options={resultList.map(r => ({ label: r, value: r }))}
                        />
                    </GroupInput>
                    <GroupInput>
                        <Input
                            label="Pontos"
                            name="points"
                            placeholder="Pontos"
                            type="number"
                        />
                        <Input
                            label="Estrelas"
                            name="stars"
                            placeholder="Estrelas"
                            type="number"
                        />
                        <Input
                            label="Data Início"
                            name="start_date"
                            type="date"
                        />
                    </GroupInput>

                    <Bar />

                    <h2>Adicionar Pontuação Players</h2>

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
                        {players_points.map((player: PlayerPoints, index) =>
                            <PlayerRegister
                                key={index}
                                atkPoint={player.atk_point}
                                dfsPoint={player.dfs_point}
                                name={player.name_player}
                                editPlayer={() => editPlayerPoint(index)}
                                removePlayer={() => removePlayerPoint(index)}
                            />)}
                        {players_points.length === 0 && (
                            <MessageListPlayer>Adicione os Players da sua guilda</MessageListPlayer>
                        )}
                    </ListPlayers>

                    <Bar />

                    <Button>Adicionar Resultado</Button>
                </Form>

                {message !== "" && <MessageWarn messageText={message} />}
            </Main>
        </>
    )
}

export default RegisterResultGvg;