import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from '@unform/web';
import * as Yup from 'yup';
import firebase from 'firebase';

import { KeysGuild } from '../../firebase/models';
import { typeAdmin, typeMember } from '../../utils/defaultValues';
import { setUserLogged } from '../../utils/localStore';
import { getUserLogged } from '../../utils/localStore';
import getValidationErros from '../../utils/getValidationErrors';

import { MainLogin } from './styles';
import { Bar, Logo, MessageLink } from '../../styles/global';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MessageWarn from '../../components/MessageWarn';

interface FormDataLogin {
    key: string
}

const Login: React.FC = () => {
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);

    let [message, setMessage] = useState("");

    useEffect(() => {
        verifyUserLogged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const verifyUserLogged = () => {
        let userLogged = getUserLogged();

        if (userLogged !== "") {
            redirectPage();
        }
    }

    const handleSubmit: SubmitHandler<FormDataLogin> = async (data) => {
        try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
                key: Yup.string()
                .required("Informe a chave de acesso")
            });

            await shema.validate(data, {
                abortEarly: false
            });

            await verifyKey(data.key, typeMember[1]).then((hasKeyValidMember) => {
                if (hasKeyValidMember) {
                    redirectPage();
                } else {
                    verifyKey(data.key, typeAdmin[1]).then((hasKeyValidAdmin) => {
                        if (hasKeyValidAdmin) {
                            redirectPage();
                        } else {
                            setMessage("Chave Inválida");
                        }
                    })
                }
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErros(err);

                formRef.current?.setErrors(errors);
            }
        }
    }

    const verifyKey = async (key: string, labelKey: string) => {
        let hasDocs = false;

        await firebase.firestore().collection("keys_guilds").where(labelKey, '==', key).get().then(snapshot => {
            hasDocs = snapshot.docs.length !== 0;

            if (hasDocs) {
                snapshot.docs.forEach(doc => {
                    let keysGuild = doc.data() as KeysGuild;

                    let userLogged = {
                        uidGuild: keysGuild.uid_guild,
                        userType: labelKey === typeMember[1] ? typeMember[0] : typeAdmin[0]
                    }

                    setUserLogged(userLogged.userType, userLogged.uidGuild);
                });
            }
        });

        return hasDocs
    }

    function redirectPage() {
        history.push("/result-gvg");
    }

    return (
        <MainLogin>
            <Logo>Scor Chaser Gvg</Logo>
            <Bar />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                    label="Coloque a chave de acesso da sua guilda"
                    name="key"
                    placeholder="Chave de acesso"
                    type="text"
                    required
                />

                {message !== "" && <MessageWarn messageText={message} />}

                <Button>Entrar</Button>
            </Form>

            <Link className="link--text" to="#"><MessageLink>Esqueceu a chave?</MessageLink></Link>

            <Bar />
            <p>Sua guilda ainda não foi registrada?</p>
            <Link className="link--text" to="guild"><MessageLink>Registrar guilda</MessageLink></Link>
        </MainLogin>
    )
}

export default Login;