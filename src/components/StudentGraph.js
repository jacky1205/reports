import React, { useEffect, useState } from 'react';
import { getAllStudentsDetails } from '../components/Students';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CanvasJSReact from '../assets/canvasjs.react';
import Parent from '../components/Parent';
import styled from 'styled-components';
import Logout from '../components/Logout';

const GraphContainer = styled.div`
  margin-top: 50px;
`;

const MarksDescContainer = styled.div`
  display:flex;
  justify-content:space-between;
  margin:30px;
`;

function StudentGraph() {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const { id } = useParams();
    const [subjetsMarks, updateMarks] = useState();
    const [curStudentDetails, setCurStudentDetails] = useState([]);
    const studentsDetails = useSelector(state => state.studentsDetails);

    useEffect(() => {
        if (Object.keys(studentsDetails).length) {
            const getCurStudentDetails = getAllStudentsDetails(studentsDetails).filter(student => student.id === id);
            const subjetsMarks = Object.keys(getCurStudentDetails[0].marks).map(subject => {
                return { label: subject, y: getCurStudentDetails[0].marks[subject] }
            })
            updateMarks(subjetsMarks);
            setCurStudentDetails(getCurStudentDetails);
        }
    }, [studentsDetails]);

    const plotGraph = {
        title: {
            text: "Marks Obtained"
        },
        data: [
            {
                type: "column",
                dataPoints: subjetsMarks
            }
        ]
    }

    return (
        curStudentDetails.length ? <div>
            <Logout />
            <MarksDescContainer><div><div>Name </div><div>{curStudentDetails[0].name}</div> </div>  <div><div>Class</div><div>{curStudentDetails[0].class}</div></div> <div><div>ID</div><div>{curStudentDetails[0].id}</div></div> <div><div>Roll No</div><div>{curStudentDetails[0].rollNo}</div></div><div><div>Total Marks</div><div>{curStudentDetails[0].totalMarks}</div></div></MarksDescContainer>
            <GraphContainer>
                <CanvasJSChart options={plotGraph} />
            </GraphContainer>
        </div> : <div>Data Loading ...</div>
    )
}

export default Parent(StudentGraph);