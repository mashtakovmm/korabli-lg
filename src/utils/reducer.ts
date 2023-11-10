import { ShipFilter, ActionType } from '../components/types';

export default function filtersReducer(state: ShipFilter, action: ActionType): ShipFilter {
    switch (action.type) {
        case 'ADD_LEVEL': {
            return {
                ...state,
                levels: [...state.levels, action.payload as number]
            }
        }
        case 'ADD_NATION': {
            return {
                ...state,
                nation: [...state.nation, action.payload as string]
            }
        }
        case 'ADD_CLASS': {
            return {
                ...state,
                type: [...state.type, action.payload as string]
            }
        }
        case 'DELETE_LEVEL': {
            return {
                ...state,
                levels: [...state.levels.filter(item => item != action.payload)]
            }
        }
        case 'DELETE_NATION': {
            return {
                ...state,
                nation: [...state.nation.filter(item => item != action.payload)]
            }
        }
        case 'DELETE_CLASS': {
            return {
                ...state,
                type: [...state.type.filter(item => item != action.payload)]
            }
        }
        default: {
            return { ...state }
        }
    }
}