import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Header from './Header';
import { sortByAlphabetical, sortByMarks } from '../constants';
import { Link } from 'react-router-dom';
import Parent from '../components/Parent';
import Logout from '../components/Logout';

const GridContainer = styled.div`
display:grid;
grid-template-columns: 33% 33% 33% ;
justify-content: space-evenly;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 50px;
margin:50px;
`;

const StudentReportsCard = styled.div`
width:auto;
height: 240px;
border: 1px gray solid;
padding:20px;
`;

const AlignedCardDetails = styled.div`
display:flex;
justify-content:space-between;
padding:5px;
color:gray;
`;



const StyleCardLink = styled(Link)`
textDecoration: 'none';
&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`;

export const getAllStudentsDetails = (studentsDetails) => {
    const studentsIDs = Object.keys(studentsDetails);
    return studentsIDs.length ? studentsIDs.reduce((detailsAllStudents, IDs) => {
        const curStudentDetails = studentsDetails[IDs];
        const subject = Object.keys(curStudentDetails.marks);
        const totalMarks = subject.reduce((totalMarks, subject) => {
            totalMarks += curStudentDetails.marks[subject]
            return totalMarks;
        }, 0)
        curStudentDetails.id = IDs;
        curStudentDetails.totalMarks = totalMarks;
        detailsAllStudents.push(curStudentDetails);
        return detailsAllStudents
    }, []) : [];
}

function Students() {
    const studentsDetails = useSelector(state => state.studentsDetails);
    const orderAlphabetical = useSelector(state => state.orderAlphabetical);
    const marksOrder = useSelector(state => state.marksOrder);
    const queryName = useSelector(state => state.queryName);

    const sortNameAlphabetically = (order, studentsData) => {
        if (studentsData.length && order === sortByAlphabetical.ALPHABETCAL) {
            return studentsData.sort((student1, student2) => {
                const name1 = student1.name.toUpperCase();
                const name2 = student2.name.toUpperCase();
                if (name1 < name2) {
                    return -1;
                }
                if (name1 > name2) {
                    return 1;
                }
                return 0;
            });
        }
        else if (studentsData.length && order === sortByAlphabetical.REVERSE_ALPHABETCAL) {
            return studentsData.sort((student1, student2) => {
                const name1 = student1.name.toUpperCase();
                const name2 = student2.name.toUpperCase();
                if (name1 > name2) {
                    return -1;
                }
                if (name1 < name2) {
                    return 1;
                }
                return 0;
            });

        }
    }

    const sortByTotalMarks = (order, studentsData) => {
        if (studentsData.length && order === sortByMarks.INCREASING) {
            return studentsData.sort((student1, student2) => {
                return student1.totalMarks - student2.totalMarks;
            })
        }
        else if (studentsData.length && order === sortByMarks.DECREASING) {
            return studentsData.sort((student1, student2) => {
                return student2.totalMarks - student1.totalMarks;
            })
        }
    }

    const filterByName = (queryName, studentsData) => {
        return studentsData.filter(student => student.name.toUpperCase().startsWith(queryName.toUpperCase()));
    }

    const redirectStudentInfoPage = (id) => {
        return `student/${id}`;
    }

    const [studentsData, filterStudentsByDetails] = useState([]);

    useEffect(() => {
        filterStudentsByDetails(getAllStudentsDetails(studentsDetails))
    }, [studentsDetails]);

    useEffect(() => {
        const sortedByAlphabetically = sortNameAlphabetically(orderAlphabetical, getAllStudentsDetails(studentsDetails));
        filterStudentsByDetails(sortedByAlphabetically);
    }, [orderAlphabetical]);

    useEffect(() => {
        const sortedByMarks = sortByTotalMarks(marksOrder, getAllStudentsDetails(studentsDetails));
        filterStudentsByDetails(sortedByMarks);
    }, [marksOrder]);

    useEffect(() => {
        const filteredByName = filterByName(queryName, getAllStudentsDetails(studentsDetails));
        filterStudentsByDetails(filteredByName);
    }, [queryName])


    return (
        <div>
            <Logout />
            <Header />
            <GridContainer>
                {studentsData.length ? studentsData.map(report => {
                    return <StudentReportsCard> <StyleCardLink to={() => redirectStudentInfoPage(report.id)}><AlignedCardDetails> <div>Name</div> <div>{report.name} </div></AlignedCardDetails>
                        <AlignedCardDetails> <div>Id</div> <div>{report.id} </div></AlignedCardDetails>
                        <AlignedCardDetails>  <div>Marks</div> </AlignedCardDetails>{Object.keys(report.marks).map(subject => <AlignedCardDetails><div>{subject}</div><div>{report.marks[subject]}</div></AlignedCardDetails>)}
                        <AlignedCardDetails> <div>Total Marks</div> <div>{report.totalMarks} </div></AlignedCardDetails>

                    </StyleCardLink> </StudentReportsCard>
                        ;
                }) : <div>No data available</div>}
            </GridContainer>
        </div>
    )
}

export default Parent(Students);