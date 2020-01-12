import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudentDetails,authenticationAction } from '../actions';

import { Loader } from '@cleartax/zoids';


function Parent(Component) {
    const Children =  function() {
        const [isLoading, updateLoading]= useState(true);
        const dispatch = useDispatch();

        useEffect(() => {
            authenticationAction(dispatch);
            fetchStudentDetails(dispatch).then(() => {
                updateLoading(false);
            })
        }, []);
    
        return isLoading ? <Loader loading={isLoading} loadingText='Fetching data...' iconSize='l' fullPage /> : <Component />;
    }
    return Children;
}
export default Parent;