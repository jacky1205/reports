import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectOnChangeAction } from '../actions';
import styled from 'styled-components';
import { dropDownSelectType } from '../constants';

const Container = styled.div`
margin-top:20px;
`;

const DropdownContainer = styled.div`
display:flex;
flex-direction:column;
margin-left: 30px;
width: 250px;
`;

const Dropdown = styled.div`
display:flex;
flex-direction:column;
flex-direction: column;
width: 100%;
align-items: start;

`;

const SelectedOptionLabel = styled.div`
display:flex;
margin-left:30px;
margin-bottom:10px;
`;

const FilterInput = styled.input`
width:100%;
height: 23px;
`;

const SelectedLabelItems = styled.div`
display:flex;
width: 10%;
justify-content: space-between;
margin-right: 10px;
border: 1px solid blue;
`;

const DropdownLabel = styled.label`
width:100%;
display:flex;
border:1px solid gray;
`;


function Select(props) {
    const dispatch = useDispatch();
    const [checkedOptions, setCheckedOptions] = useState(new Map());
    const showSelectedOptLabel = [...checkedOptions.values()].includes(true);
    const { search } = props;
    const { selectType } = props;

    const handleOnSelectOption = (e) => {
        const { id, checked } = e.target;

        if (selectType === dropDownSelectType.SINGLE) {
            setCheckedOptions((new Map()).set(id, checked));
        }
        else if (selectType === dropDownSelectType.MULTIPLE) {
            setCheckedOptions(new Map(checkedOptions.set(id, checked)));
        }
    }

    const handleRemoveOption = (e) => {
        const { id } = e.target;
        setCheckedOptions(new Map(checkedOptions.set(id, false)));
    }

    const handleFilterInput = (e) => {
        const { value } = e.target;
        selectOnChangeAction(dispatch, value)
    }

    useEffect(() => {
        selectOnChangeAction(dispatch, '') //temporary for mock data after that remove whole useEffect
    }, [])

    const selectOnChangeData = useSelector(state => state.selectOnChangeData);

    return (
        <Container>
            {showSelectedOptLabel && <SelectedOptionLabel>{
                [...checkedOptions.keys()].filter(id => checkedOptions.get(id)).map((id) => {
                    return <SelectedLabelItems><div>{id}</div><div onClick={handleRemoveOption} id={id}>X</div></SelectedLabelItems>
                })
            }</SelectedOptionLabel>}

            <DropdownContainer>

                {search && <FilterInput placeholder='Search' onChange={handleFilterInput}></FilterInput>}
                <Dropdown>
                    {selectOnChangeData.length ? selectOnChangeData.map((option) => {
                        return <DropdownLabel>
                            <input type={selectType} name={selectType} id={option} onClick={handleOnSelectOption} checked={checkedOptions.get(option)} /> {option}
                        </DropdownLabel>
                    }) : <div>No Option availabe</div>}
                </Dropdown>
            </DropdownContainer>
        </Container>
    )
}

export default Select;