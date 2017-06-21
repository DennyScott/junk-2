import {createStore, compose, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/index';
import MyComputerLogo from './assets/Computer/Desktop/Icon/my_computer.png';
import NotepadLogo from './assets/Computer/Desktop/Icon/notepad.png';
import { NOTEPAD, EXPLORER } from './programs';

const loggerMiddleware = createLogger();

const defaultState = {
    programs: [{
        id: NOTEPAD,
        logo: NotepadLogo,
        name: 'Notepad',
        payload: {
            text: "I spent the last few days figuring out the password to Joel's Facebook account.  It's RonHextall27.  I've never seen someone actually give so much of a shit about some random hockey goalie to use it for a password, but hey, at least I have access to his account now!"
        }
    },
    {
        id: EXPLORER,
        logo: MyComputerLogo,
        name: 'My Computer',
        payload: {
            location: "C:",
            previousLocations: ["C:"],
            currentLocationIndex: 0,
        }
    }],
    openPrograms: [],
    switches: {},
    variables: {},
    drive: {
        'C:': {
            folders: {
                Users: {
                    folders: {
                        Joel: {
                            folders: {
                                Documents: {
                                    folders: {
                                        someRandomFolder: {
                                            folders: {
                                                youMadeItIn: {
                                                    password: 'hello'
                                                }
                                            }
                                        }
                                    }
                                },
                                Downloads: {
                                    folders: {
                                        someOtherRandomFolder: {}
                                    }
                                }
                            }
                        },
                        Ethan: {
                            folders: {
                                Documents: {
                                    folders: {
                                        hello: {}
                                    }
                                },
                                Downloads: {
                                    folders: {
                                        goodbye: {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
};

const enhancers = compose(
    applyMiddleware(loggerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export default store;