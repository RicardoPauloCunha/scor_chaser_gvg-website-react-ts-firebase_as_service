import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { setUserLogged, getUserLogged } from '../../utils/localStore';
import Input from '../../components/Input';
import Message from '../../components/Message';
import Button from '../../components/Button';
import { Bar, Background, Logo } from '../../assents/styleds/global';

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

interface KeysGuildProps {
    uid_guild: "";
    key_member: "";
    key_admin: "";
}

let typeMember: [string, string] = ["member", "key_member"];
let typeAdmin: [string, string] = ["admin", "key_admin"];

function Login() {
    const history = useHistory();

    let [key, setKey] = useState("");
    let [message, setMessage] = useState("");

    async function verifyUserLogged() {
        let userLogged = getUserLogged();

        if (userLogged !== "") {
            redirectPage();
        }
    }

    useEffect(() => {
        verifyUserLogged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function login(e: FormEvent) {
        e.preventDefault();

        await verifyKey(typeMember[1]).then((hasKeyValidMember) => {
            if (!hasKeyValidMember) {
                verifyKey(typeAdmin[1]).then((hasKeyValidAdmin) => {
                    if (!hasKeyValidAdmin) {
                        setMessage("Chave Inválida");
                    }
                })
            }
        })
    }

    async function verifyKey(labelKey: string) {
        let hasDocs: boolean = false;

        await firebase.firestore().collection("keys_guilds").where(labelKey, '==', key).get().then(snapshot => {
            hasDocs = snapshot.docs.length !== 0;

            if (hasDocs) {
                snapshot.docs.forEach(doc => {
                    let keysGuild = doc.data() as KeysGuildProps;

                    let userLogged = {
                        uidGuild: keysGuild.uid_guild,
                        userType: labelKey === typeMember[1] ? typeMember[0] : typeAdmin[0]
                    }

                    setUserLogged(userLogged.userType, userLogged.uidGuild);

                    redirectPage();
                });
            }
        });

        return hasDocs
    }

    function redirectPage() {
        history.push("/last-gvg");
    }

    return (
        <Background>
            <Main>
                <Logo>Scor Chaser Gvg</Logo>
                <Bar />
                <form onSubmit={login}>
                    <Input
                        label="Coloque a chave de acesso da sua guilda"
                        name="key"
                        placeholder="Chave de acesso"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        type="text"
                        required
                    />
                    <Button>Entrar</Button>
                </form>

                <Link className="link--text" to="#">Esqueceu a chave?</Link>

                {message !== "" && <Message message={message} />}
                
                <Bar />
                <p>Sua guilda ainda não foi registrada?</p>
                <Link className="link--text" to="guild">Adicionar guilda</Link>
            </Main>
        </Background>
    )
}

export default Login;