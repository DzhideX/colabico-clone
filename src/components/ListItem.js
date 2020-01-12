import React from 'react';
import {Square, CheckSquare, Trash2, Copy} from 'react-feather';

const ListItem = ({value}) => (
    <div className='list-item'>
        <div className='list-item__left'>
            <Square className='list-item__left__square' size={24} color='white'/>
            <p className='list-item__left__text'>{value}</p>
        </div>
        <div className='list-item__right'>
            <Copy className='list-item__right__copy' size={13} color='white'/>
            <Trash2 className='list-item__right__trash' size={13} color='white'/>
            <button className='list-item__right__button'>START</button>
        </div>
    </div>
);

export default ListItem;