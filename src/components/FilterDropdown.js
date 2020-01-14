import React from 'react';
import Select from './Select';
import { dropDownSelectType } from '../constants';

function FilterDropdown() {

    return (
        <Select selectType={dropDownSelectType.MULTIPLE} search={true} />
    )
}

export default FilterDropdown;