import React from 'react';
import { useSelector } from 'react-redux';
import Select from './Select';
import { dropDownSelectType } from '../constants';
import { selectOnChangeAction, selectDefaultAction } from '../actions';

function FilterDropdown() {

    const options = useSelector(state => state.selectOnChangeData);
    return (
        <Select selectType={dropDownSelectType.SINGLE}  selectOnChangeAction={selectOnChangeAction} selectDefaultOptions={selectDefaultAction} options={options} />
    )
}

export default FilterDropdown;