import React, { InputHTMLAttributes } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

const Player = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border-radius: 10px;
    margin-bottom: 0.5rem;
    &:last-child {
        margin-bottom: 2rem;
    }
`;

const PlayerInfos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Point = styled.div`
    color: var(--color-black);
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Name = styled.span`
    color: var(--color-black);
    font-weight: 700;
`;

const Button = styled.button`
    background-color: var(${props => props.color || '--color-blue'}) ;
    border: none;
    border-radius: 30px;
    margin: 0.7rem 0;
    border: none;
    text-align: center;
    padding: 0.5rem 1rem;
    transition: 0.5s;
    outline: none;
    font-size: 1rem;
    color: var(--color-white-smoke);
    margin: 0 0.3rem;
    cursor: pointer;
    &:active {
        background-color: var(--color-blue-secondary);
        opacity: 1;
    }
    &:hover {
        opacity: 0.7;
    };
`

interface PlayerRegisterProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    atkPoint?: number;
    dfsPoint?: number;
    editPlayer?(): void;
    removePlayer?(): void;
}

const PlayerRegister: React.FC<PlayerRegisterProps> = ({ name, atkPoint, dfsPoint, editPlayer, removePlayer }) => {
    return (
        <Player>
            <PlayerInfos>
                <Name>{name}</Name>
                {atkPoint != null && <Point>
                    <span>ATK</span>
                    <span>{atkPoint}</span>
                </Point>}
                {dfsPoint != null && <Point>
                    <span>DFS</span>
                    <span>{dfsPoint}</span>
                </Point>}
                <div>
                    {editPlayer !== undefined && <Button
                        type="button"
                        onClick={() =>
                            editPlayer()}
                    ><FaEdit /></Button>}
                    {removePlayer !== undefined && <Button
                        type="button"
                        onClick={() => removePlayer()}
                        color="--color-red"
                    ><FaTrashAlt /></Button>}
                </div>
            </PlayerInfos>
        </Player>
    )
}

export default PlayerRegister;