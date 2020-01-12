import React, { useState } from 'react';
import { sortByAlphabetical, sortByMarks } from '../constants';
import { useDispatch } from 'react-redux';
import { sortByAlphabeticalAction, sortByMarksAction, filterByNameAction } from '../actions';
import styled from 'styled-components';

const StyleSortButton = styled.button`
height: 35px;
color: black;
background-color: antiquewhite;
outline:none;
`;

const ContainerHeader = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-around;
margin-top:10px;
outline:none;
`;

const StyleFilteNameInput = styled.input`
placeholder:Seacrch By Name;
border: 2px solid blue;
outline:none;
`;



function Header() {
    const dispatch = useDispatch();
    const [orderByAlpha, setALphaOrder] = useState(sortByAlphabetical.ALPHABETCAL);
    const [sortByMarksOrder, setSortMarksOrder] = useState(sortByMarks.INCREASING);

    const handleAlphaOrder = () => {
        if (orderByAlpha === sortByAlphabetical.ALPHABETCAL) {
            setALphaOrder(sortByAlphabetical.REVERSE_ALPHABETCAL);
            sortByAlphabeticalAction(dispatch, sortByAlphabetical.ALPHABETCAL);
        }
        else {
            setALphaOrder(sortByAlphabetical.ALPHABETCAL);
            sortByAlphabeticalAction(dispatch, sortByAlphabetical.REVERSE_ALPHABETCAL);
        }
    }
    const handleSortMarks = () => {
        if (sortByMarksOrder === sortByMarks.INCREASING) {
            setSortMarksOrder(sortByMarks.DECREASING);
            sortByMarksAction(dispatch, sortByMarks.INCREASING);
        }
        else {
            setSortMarksOrder(sortByMarks.INCREASING);
            sortByMarksAction(dispatch, sortByMarks.DECREASING);
        }
    }
    const handleFilterByName = (e) => {
        const { value } = e.target;
        filterByNameAction(dispatch, value);
    }

    return (
        <ContainerHeader><StyleSortButton onClick={handleAlphaOrder}>Sort Name By {orderByAlpha}</StyleSortButton>
            <StyleSortButton onClick={handleSortMarks}>Sort By Marks in {sortByMarksOrder} order </StyleSortButton>
            <StyleFilteNameInput placeholder="Seacrch By Name" type="text" onChange={handleFilterByName}></StyleFilteNameInput>
        </ContainerHeader>
    )
}

export default Header;