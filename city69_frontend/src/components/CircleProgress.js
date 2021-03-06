import React, {useState, useEffect} from 'react';
import styled  from 'styled-components';
import { Header4 } from '../styles';

export const CircleProgress = props => {
    let { radius, stroke, progress, firstColor, secondColor, fontSize} = props;

    radius = radius || 50;
    stroke = stroke || 10;
    progress = progress;
    firstColor = firstColor || 'blue';
    secondColor = secondColor || '#D2D6E2';
    fontSize = fontSize || 18;

    const [stateProgress, setStateProgress] = useState(0);

    useEffect(() => {
        if(stateProgress < progress) {
            setTimeout(() => { 
                setStateProgress(stateProgress + 1);
            }, 1);
        }
    },[stateProgress])

    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - stateProgress / 100 * circumference;

    const bottomOffset = radius * 2 + 4;


    return (
        <Box
            height={radius * 2 + 4}
            width={radius * 2 + 4}
        >
        <TopCircle>
            <svg
                height={radius * 2}
                width={radius * 2}
                style={{transform: 'rotate(-90deg)'}}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    stroke = { firstColor }
                    fill="transparent"
                    strokeWidth={ stroke }
                    dasharray={ circumference + ' ' + circumference }
                    strokeDasharray={ circumference + ' ' + circumference }
                    style={ { strokeDashoffset } }
                    strokeWidth={ stroke }
                    strokeLinecap="round"
                    r={ normalizedRadius }
                    cx={ radius }
                    cy={ radius }
                />
            </svg>
        </TopCircle>
        
        <UnderCircle bottom = { bottomOffset }>

        <svg
            height={radius * 2}
            width={radius * 2}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                stroke= { secondColor }
                strokeOpacity = '0.3'
                fill="transparent"
                strokeWidth={ stroke }
                r={ normalizedRadius }
                cx={ radius }
                cy={ radius }
            />
        </svg>
        </UnderCircle>

        <Number bottom = { bottomOffset + radius + (fontSize)}
        >
            <Header4 style = { {
                    display: 'flex',
                    flexDirection: 'row', 
                    width: '98%',
                    justifyContent: 'center',
                    fontSize: `${fontSize}px`,
                    color: firstColor,
                } }>
                {progress}
            </Header4>
        </Number>
        </Box>
    )
}

const Box = styled.div`
    height: ${props => props.height}px;
    width: ${props => props.width}px;
`;

const TopCircle = styled.div`
    position: relative;
    z-index: 200;
`;
const UnderCircle = styled.div`
    position: relative;
    z-index: 100;
    bottom: ${props => props.bottom}px;
`;

const Number = styled.div`
    position: relative;
    z-index: 300;
    bottom: ${props => props.bottom}px;
`;


