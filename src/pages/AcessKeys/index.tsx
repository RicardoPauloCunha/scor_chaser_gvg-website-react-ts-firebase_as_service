import React, { useEffect, useState } from 'react';

import firebase from '../../firebase/firebaseConfig';
import { generateKey } from '../../utils/generate';
import { getUserLogged } from '../../utils/localStore';

import { BlockKey, Key, KeyText } from './styles';
import { Bar, Main } from '../../styles/global';
import Button from '../../components/Button';
import Menu from '../../components/Menu';

const AccessKeys: React.FC = () => {
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
        <>
            <Menu />
            <Main>
                <h1>Cadastrar Guilda</h1>

                <BlockKey>
                    <Key>
                        <span>Chave dos membros</span>
                        <KeyText>{keyMember}</KeyText>
                    </Key>
                    <Button onClick={() => handlerKey(true)}>Atualizar</Button>
                </BlockKey>

                <Bar />

                <BlockKey>
                    <Key>
                        <span>Chave dos admins</span>
                        <KeyText>{keyAdmin}</KeyText>
                    </Key>
                    <Button onClick={() => handlerKey(false)}>Atualizar</Button>
                </BlockKey>

            </Main>
        </>
    )
}

export default AccessKeys;