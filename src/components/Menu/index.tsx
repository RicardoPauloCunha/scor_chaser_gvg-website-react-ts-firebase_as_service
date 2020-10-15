import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getUserLogged, removeUserLogged } from '../../utils/localStore';

import { MenuElement, MenuIcons, Links, Header, MessageMenuLink } from './styles';
import { Logo } from '../../styles/global';

const Menu: React.FC = () => {
    let [menuOn, setMenuOn] = useState(false);
    let [userIsAdmin, setUserIsAdmin] = useState(false);

    useEffect(() => {
        if (window.innerWidth >= 768) {
            setMenuOn(true);
        }

        setUserIsAdmin(getUserLogged()[0] === 'admin');
    }, []);

    function logout() {
        removeUserLogged();
    }

    return (
        <Header>
            <MenuElement>
                <Logo>Scor Chaser Gvg</Logo>

                <MenuIcons>
                    {!menuOn && <FaBars onClick={() => setMenuOn(true)} />}
                    {menuOn && <FaTimes onClick={() => setMenuOn(false)} />}
                </MenuIcons>
            </MenuElement>

            {menuOn && (
                <Links>
                    <Link to="/result-gvg" >
                        <MessageMenuLink>Resultado GvG</MessageMenuLink>
                    </Link>
                    {userIsAdmin && <Link to="/result-gvg/register">
                        <MessageMenuLink>Adicionar Resultado</MessageMenuLink>
                    </Link>}
                    {userIsAdmin && <Link to="/guild" >
                        <MessageMenuLink>Guilda</MessageMenuLink>
                    </Link>}
                    {userIsAdmin && <Link to="/access-keys" >
                        <MessageMenuLink>Chaves de Acesso</MessageMenuLink>
                    </Link>}
                    <Link to="/" onClick={() => logout()} >
                        <MessageMenuLink>Sair</MessageMenuLink>
                    </Link>
                </Links>)}
        </Header>
    )
}

export default Menu;