import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import firebase from '../../services/firebaseConfig';
import { generateKey } from '../../utils/generate';

import Button from '../../components/Button';
import MenuBar from '../../components/MenuBar';
import { Bar, Background, TitlePage, MainG } from '../../assents/styleds/global';
import { getUserLogged } from '../../utils/localStore';

const BlockKey = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const KeyText = styled.span`
    background-color: var(--color-white-smoke);
    padding: 0.5rem 0.9rem;
    border-radius: 30px;
    margin: 0.7rem 0 0 0;
    color: var(--color-black);
`

const Key = styled.div`
    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        width: 100%auto;
    }
`;

function AccessKeys() {
    let [uidKeyGuild, setUidKeyGuild] = useState("");
    let [keyMember, setKeyMember] = useState("");
    let [keyAdmin, setKeyAdmin] = useState("");

    useEffect(() => {
        getKeyGuild();
    }, []);

    function getKeyGuild() {
        let uidGuild = getUserLogged()[1];

        firebase.firestore().collection("keys_guilds").where('uid_guild', '==', uidGuild).get().then(snapshot => {
            snapshot.docs.forEach(keyGuild => {
                setUidKeyGuild(keyGuild.id);

                let data = keyGuild.data();

                setKeyMember(data.key_member);
                setKeyAdmin(data.key_admin);
            });
        });
    }

    function handlerKey(keyMember: boolean) {
        let field = keyMember ? 'key_member' : 'key_admin';

        firebase.firestore().collection("keys_guilds").doc(uidKeyGuild).update({ [field]: generateKey() }).then(() => {
            getKeyGuild();
        })
    }

    return (
        <Background>
            <MenuBar linkId={3} />
            <MainG>
                <TitlePage>Cadastrar Guilda</TitlePage>

                <Key>
                    <BlockKey>
                        <span>Chave dos membros</span>
                        <KeyText>{keyMember}</KeyText>
                    </BlockKey>
                    <Button onClick={() => handlerKey(true)}>Atualizar</Button>
                </Key>

                <Bar />

                <Key>
                    <BlockKey>
                        <span>Chave dos admins</span>
                        <KeyText>{keyAdmin}</KeyText>
                    </BlockKey>
                    <Button onClick={() => handlerKey(false)}>Atualizar</Button>
                </Key>

            </MainG>
        </Background>
    )
}

export default AccessKeys;