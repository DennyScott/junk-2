import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getOpenPrograms, getExplorerOpenPrograms, getNotepadOpenPrograms } from '../../../selectors/openPrograms';
import { openProgram } from '../../../actions/openProgram';
import { storeVariable } from '../../../actions/variable';
import Icon from '../../../components/Computer/Desktop/Icon/icon';
import Notepad from '../../../components/Computer/Desktop/Window/Programs/notepad';
import Explorer from './Window/Programs/explorer';
import { NOTEPAD, EXPLORER } from '../../../programs';

import './desktop.css';

const DesktopDiv = styled.div`
    height: calc(100% - 50px);
    top:0;
    left: 0;
    right: 0;
    bottom: 50px;
    position: fixed;
`

const OpenWindows = styled.div`
    height: 100%;
`

const DesktopIcons = styled.div`
    height: 100%;
`

class Desktop extends Component {
    render() {
        return (
            <DesktopDiv>
                <DesktopIcons> 
                    {this.props.programs.map(program =>
                        <Icon key={program.id} onDoubleClick={() => this.props.openProgram(program.id, program.payload)} name={program.name} logo={program.logo}/>
                    )}
                </DesktopIcons>

                <OpenWindows>
                    {this.props.notepadOpenPrograms.map(program => <Notepad key={program.windowId} program={program} text={program.payload.text}/>)}
                    {this.props.explorerOpenPrograms.map(program => <Explorer key= {program.windowId} program={program}/>)}    
                </OpenWindows>          
            </DesktopDiv>
        );
    }
}

const mapStateToProps = state => ({
    programs: state.programs,
    notepadOpenPrograms: getNotepadOpenPrograms(state),
    explorerOpenPrograms: getExplorerOpenPrograms(state),
});

const mapDispatchToProps = dispatch => ({
    openProgram: (programId, payload) => dispatch(openProgram(programId, payload)),
    createVariable: (variableName, payload) => dispatch(storeVariable(variableName, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);