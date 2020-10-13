import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import firebase from '../../services/firebaseConfig';
import { generateKey } from '../../utils/generate';

import Input from '../../components/Input';
import Button from '../../components/Button';
import PlayerRegister from '../../components/PlayerRegister';
import MenuBar from '../../components/MenuBar';
import { Bar, Background, TitlePage, ListPlayers, MainG, Message } from '../../assents/styleds/global';
import { getUserLogged, setConcludedPage, setUserLogged } from '../../utils/localStore';

const Players = styled.div`
    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

interface GuildFullProps {
    name: string;
    email_recovery: string;
    players: string[];
}

function Guild() {
    const history = useHistory();

    let [uidGuild, setUidGuild] = useState("");
    let [name, setName] = useState("tt");
    let [email_recovery, setEmailRecovery] = useState("t@t.com");
    let [namePlayer, setNamePlayer] = useState("tt");
    let [indexPlayer, setIndexPlayer] = useState(-1);
    let [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        let userLogged = getUserLogged();

        if (userLogged !== "") {
            let uid = userLogged[1];

            setUidGuild(uid);

            firebase.firestore().collection("guilds").doc(uid).get().then(snapshot => {
                let { name: _name, email_recovery: _email_recovery, players: _players } = snapshot.data() as GuildFullProps;

                setName(_name);
                setEmailRecovery(_email_recovery);
                setPlayers(_players);
            });
        }
    }, []);

    function handlerPlayers() {
        if (indexPlayer !== -1) {
            players[indexPlayer] = namePlayer;
            setPlayers([...players]);
            setIndexPlayer(-1);
        } else {
            setPlayers([...players, namePlayer]);
        }
        setNamePlayer("");
    }

    function editPlayer(index: number) {
        setNamePlayer(players[index]);
        setIndexPlayer(index);
    }

    function removePlayer(index: number) {
        players.splice(index, 1);
        setPlayers([...players]);
    }

    function saveGuild(e: FormEvent) {
        e.preventDefault();

        let guild = {
            name,
            email_recovery,
            players
        }

        if (uidGuild === "") {
            let transaction = firebase.firestore().batch();

            let guildRef = firebase.firestore().collection("guilds").doc();
            transaction.set(guildRef, guild);

            let keys = {
                key_member: generateKey(),
                key_admin: generateKey(),
                uid_guild: guildRef.id
            }

            let keysRef = firebase.firestore().collection("keys_guilds").doc();
            transaction.set(keysRef, keys);

            transaction.commit().then(() => {
                setUserLogged('admin', guildRef.id);
                setConcludedPage(0);

                history.push("/concluded");
            }).catch(err => {
                alert("Ocorreu um erro interno ao cadastrar a guilda")
            });
        } else {
            firebase.firestore().collection("guilds").doc(uidGuild).update(guild).then(() => {
                setConcludedPage(2);
                history.push("/concluded");
            }).catch(err => {
                alert("Ocorreu um erro interno ao cadastrar a guilda")
            });
        }
    }

    return (
        <Background>
            {uidGuild !== "" && <MenuBar linkId={2} />}
            <MainG>
                <form onSubmit={saveGuild}>
                    <TitlePage>{uidGuild !== "" ? 'Editar Guilda' : 'Cadastrar Guilda'}</TitlePage>
                    <Input
                        label="Nome da guilda"
                        name="name"
                        placeholder="Chase Guilda"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <Input
                        label="Email de recuperação"
                        name="email"
                        placeholder="chaser@guild.com"
                        type="email"
                        onChange={(e) => setEmailRecovery(e.target.value)}
                        value={email_recovery}
                        required
                    />

                    <Bar />
                    <Players>
                        <div>
                            <Input
                                label="Nome do player"
                                name="namePlayer"
                                placeholder="chasePlayer"
                                type="text"
                                onChange={(e) => setNamePlayer(e.target.value)}
                                value={namePlayer}
                            />
                            <Button type="button" onClick={() => handlerPlayers()}>{indexPlayer !== -1 ? 'Salvar' : 'Adicionar'}</Button>
                        </div>
                        <ListPlayers>
                            {players.map((player, index) =>
                                <PlayerRegister
                                    key={index}
                                    name={`${player}`}
                                    editPlayer={() => editPlayer(index)}
                                    removePlayer={() => removePlayer(index)}
                                />)}
                            {players.length === 0 && (
                                <Message>Adicione os Players da sua guilda</Message>
                            )}
                        </ListPlayers>
                    </Players>
                    <Bar />

                    <Button>{uidGuild !== "" ? 'Salvar' : 'Cadastrar Guilda'}</Button>
                </form>
            </MainG>
        </Background>
    )
}

export default Guild;