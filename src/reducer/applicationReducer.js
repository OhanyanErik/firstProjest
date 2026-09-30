import { APPLICATION_ACTIONS } from "./applicationActions";

export function applicationReducer(state,action){
    switch (action.type) {
        case APPLICATION_ACTIONS:
            return{
                ...state,
                appications: action.payload,
                loading: false,
                error: null,
            }
            
            case APPLICATION_ACTIONS.ADD_APPLICATIONS:
                return{
                    ...state,
                    appications: [action.payload, ...state.applications],
                }
            case APPLICATION_ACTIONS.DELETE_APPLICATION:
                return{
                    ...state,
                    appications: state.appications.filter((application)=>application.id !== action.payload),
                };
          case APPLICATION_ACTIONS.UPDATE_APPLICATION:
            return{
            ...state,
            appications:state.appications.map((application)=> application.id===application.payload.id?
        {...application, status: action.payload.status}
        :application
    ),
            };
            case APPLICATION_ACTIONS.SET_APPLICATIONS:
                return{
                    ...state,
                   loading: action.payload
                };
            case APPLICATION_ACTIONS.SET_ERROR:
                return{
                    ...state,
                    eror: action.payload
                    
                }

        default:
            return state;
    }
}