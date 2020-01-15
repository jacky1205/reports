import React, { useState, useEffect, useRef, } from 'react';
import { useDispatch } from 'react-redux';
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

const SelectedOptionLabel = styled.div`
display:flex;
margin-left:30px;
margin-bottom:10px;
`;

const FilterInput = styled.input`
height: 23px;
width: auto;
`;

const SelectedLabelItems = styled.div`
width: 10%;
display:flex;
justify-content:space-between;
margin-right: 10px;
border: 1px solid blue;
`;

const OptionList = styled.li`
border: 1px solid gray;
`;

const OptionsUl = styled.ul`
list-style: none;
padding: 0;
margin: 0;
text-align: left;
`;

const DropIcon = styled.img`
height:15px;
width:15px;
`;

const DropIconContainer = styled.div`
border: 1px solid gray;
display: flex;
justify-content: ${props => props.selectedLabel ? 'space-between' : 'flex-end'};
`;

const SelectedSingleSearchableItem = styled.div`
display:flex;
justify-content: space-between;
width:150px;
border: 1px solid blue;
`;

const CrossIcon = styled.div`
&:hover {
    cursor:pointer;
}
`;

function Options(props) {
    const { options, handleOptionOnClick, selectType, checkedOptions } = props;
    const showableOptions = options.filter(option => !option.disable);

    return (
        <OptionsUl> {showableOptions.length ? showableOptions.map(option =>
            <OptionList><input type={selectType} id={option.title} checked={checkedOptions.get(option.title) ? true : false} onClick={handleOptionOnClick} />{option.title}</OptionList>
        ) : <OptionList>No option availabe</OptionList>}</OptionsUl>
    )
}



function Select(props) {
    const dispatch = useDispatch();
    const [checkedOptions, setCheckedOptions] = useState(new Map());
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const node = useRef();

    const { searchable, selectType, selectOnChangeAction, selectDefaultOptions, options } = props;

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
        selectOnChangeAction(dispatch, value);
        setIsDropdownVisible(true)

    }

    const handleDefaultOptions = () => {
        selectDefaultOptions(dispatch);
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleOutsideClick = (e) => {
        if (node.current.contains(e.target)) {
            return;
        }
        setIsDropdownVisible(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    const showSelectedItemsLable = () => {

        const isSingleAndNotsearchable = !searchable && selectType === dropDownSelectType.SINGLE;
        return !isSingleAndNotsearchable;

    }
    const showSelectedItemsLableNotSearchable = () => {
        const isSingleSelectedType = selectType === dropDownSelectType.SINGLE;
        return isSingleSelectedType;
    }

    return (
        <Container ref={node}>
            {showSelectedItemsLable() && <SelectedOptionLabel>{
                [...checkedOptions.keys()].filter(id => checkedOptions.get(id)).map((id) => {
                    return <SelectedLabelItems><div>{id}</div><CrossIcon onClick={handleRemoveOption} id={id}>X</CrossIcon></SelectedLabelItems>
                })
            }</SelectedOptionLabel>}

            <DropdownContainer >
                {searchable && <FilterInput placeholder='Search' onChange={handleFilterInput}></FilterInput>}
                {!searchable && <DropIconContainer onClick={handleDefaultOptions} selectedLabel={[...checkedOptions.keys()].filter(id => checkedOptions.get(id)).length > 0 && selectType === dropDownSelectType.SINGLE}>
                    {showSelectedItemsLableNotSearchable() &&
                        [...checkedOptions.keys()].filter(id => checkedOptions.get(id)).map((id) => {
                            return <SelectedSingleSearchableItem >{id}</SelectedSingleSearchableItem>
                        })
                    }
                    <DropIcon src='https://image.flaticon.com/icons/svg/54/54785.svg' />
                </DropIconContainer>}
                {isDropdownVisible && <Options options={options} handleOptionOnClick={handleOnSelectOption} selectType={selectType} checkedOptions={checkedOptions} />}
            </DropdownContainer>
        </Container >
    )
}

export default Select;