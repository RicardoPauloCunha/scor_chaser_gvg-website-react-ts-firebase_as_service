import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getUserLogged, removeUserLogged } from '../../utils/localStore';

import { Logo } from '../../assents/styleds/global';

const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const MenuIcons = styled.div`
    font-size: 1.5rem;
    @media (min-width: 768px) {
        display: none;
    }
`;

const Links = styled.nav`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        align-items: center;
        flex-direction: row;
    }
`;

interface MenuBarProps {
    linkId?: number;
}

const MenuBar: React.FC<MenuBarProps> = ({ linkId }) => {
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
            <Menu>
                <Logo>Scor Chaser Gvg</Logo>

                <MenuIcons>
                    {!menuOn && <FaBars onClick={() => setMenuOn(true)} />}
                    {menuOn && <FaTimes onClick={() => setMenuOn(false)} />}
                </MenuIcons>
            </Menu>

            {menuOn && (
                <Links>
                    <Link
                        className={`link--text-white ${linkId === 0 ? 'link--text-white-underline' : ''}`}
                        to="/last-gvg"
                    >Resultado Última GVG</Link>
                    {userIsAdmin && <Link
                        className={`link--text-white ${linkId === 1 ? 'link--text-white-underline' : ''}`}
                        to="/last-gvg/register"
                    >Adicionar Resultado</Link>}
                    {userIsAdmin && <Link
                        className={`link--text-white ${linkId === 2 ? 'link--text-white-underline' : ''}`}
                        to="/guild"
                    >Guilda</Link>}
                    {userIsAdmin && <Link
                        className={`link--text-white ${linkId === 3 ? 'link--text-white-underline' : ''}`}
                        to="/access-keys"
                    >Chaves de Acesso</Link>}
                    <Link
                        className="link--text-white"
                        to="/"
                        onClick={() => logout()}
                    >Sair</Link>
                </Links>)}
        </Header>
    )
}

export default MenuBar;