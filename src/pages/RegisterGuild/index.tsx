import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import firebase from '../../firebase/firebaseConfig';
import { generateKey } from '../../utils/generate';
import { getUserLogged, setConcludedPage, setUserLogged } from '../../utils/localStore';
import { Guild } from '../../firebase/models';
import getValidationErros from '../../utils/getValidationErrors';

import { FormPlayers } from './styles';
import { Bar, ListPlayers, Main, MessageListPlayer } from '../../styles/global';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PlayerRegister from '../../components/PlayerRegister';
import MessageWarn from '../../components/MessageWarn';
import Menu from '../../components/Menu';

interface FormData {
    name: string;
    email_recovery: string;
}

const RegisterGuild: React.FC = () => {
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);

    let [uidGuild, setUidGuild] = useState("");
    let [namePlayer, setNamePlayer] = useState("");
    let [indexPlayer, setIndexPlayer] = useState(-1);
    let [players, setPlayers] = useState<string[]>([]);
    let [message, setMessage] = useState("");

    useEffect(() => {
        let userLogged = getUserLogged();

        if (userLogged !== "") {
            let uid = userLogged[1];

            setUidGuild(uid);

            firebase.firestore().collection("guilds").doc(uid).get().then(snapshot => {
                let { name, email_recovery, players } = snapshot.data() as Guild;

                formRef.current?.setData({ name, email_recovery });
                setPlayers(players);
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

    const handlerSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
                name: Yup.string()
                .required("Informe o nome da guilda"),
                email_recovery: Yup.string()
                .email("Insira um email válido")
                .required("Informe um email"),
            });

            await shema.validate(data, {
                abortEarly: false
            });

            console.log("passou")

            let guild = {
                name: data.name,
                email_recovery: data.email_recovery,
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
                    setMessage("Ocorreu um erro interno ao cadastrar a guilda");
                });
            } else {
                firebase.firestore().collection("guilds").doc(uidGuild).update(guild).then(() => {
                    setConcludedPage(2);
                    history.push("/concluded");
                }).catch(err => {
                    setMessage("Ocorreu um erro interno ao alterar a guilda");
                });
            }
        } catch (err) {
            console.log(err)
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErros(err);

                formRef.current?.setErrors(errors);
            }
        }
    }

    return (
        <>
            {uidGuild !== "" && <Menu />}
            <Main>
                <h1>{uidGuild !== "" ? 'Editar Guilda' : 'Cadastrar Guilda'}</h1>
                <Form ref={formRef} onSubmit={handlerSubmit}>
                    <Input
                        label="Nome da guilda"
                        name="name"
                        placeholder="Chase Guilda"
                        type="text"
                        required
                    />
                    <Input
                        label="Email de recuperação"
                        name="email_recovery"
                        placeholder="chaser@guild.com"
                        type="email"
                        required
                    />

                    <Bar />
                    <FormPlayers>
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
                                <MessageListPlayer>Adicione os Players da sua guilda</MessageListPlayer>
                            )}
                        </ListPlayers>
                    </FormPlayers>
                    <Bar />

                    <Button>{uidGuild !== "" ? 'Salvar' : 'Cadastrar Guilda'}</Button>
                </Form>

                {message !== "" && <MessageWarn messageText={message} />}
            </Main>
        </>
    )
}

export default RegisterGuild;