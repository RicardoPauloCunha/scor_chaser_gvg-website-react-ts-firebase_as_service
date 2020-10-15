import React, { InputHTMLAttributes } from 'react';

import { Player, Point, Name } from './styles';

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