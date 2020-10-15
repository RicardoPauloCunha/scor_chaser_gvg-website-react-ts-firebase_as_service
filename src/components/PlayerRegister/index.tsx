import React, { InputHTMLAttributes } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import {Button, Name, Player, PlayerInfos, Point} from './styles';

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