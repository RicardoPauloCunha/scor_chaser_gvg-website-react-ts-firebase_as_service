import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Player = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border-radius: 10px;
    margin-bottom: 0.5rem;
    &:last-child {
        margin-bottom: 2rem;
    }
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

interface PlayerPointProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    atkPoint: number;
    dfsPoint: number;
    totalPoint: number;
    classification: string;
}

const PlayerPoint: React.FC<PlayerPointProps> = ({ name, atkPoint, dfsPoint, totalPoint, classification }) => {
    return (
        <Player>
            <Name>{name}</Name>
            <Point>
                <span>ATK</span>
                <span>{atkPoint}</span>
            </Point>
            <Point>
                <span>DFS</span>
                <span>{dfsPoint}</span>
            </Point>
            <Point>
                <span>Total</span>
                <span>{totalPoint}</span>
            </Point>
            <Point>
                <span>Classifição</span>
                <strong>{classification}</strong>
            </Point>
        </Player>
    )
}

export default PlayerPoint;