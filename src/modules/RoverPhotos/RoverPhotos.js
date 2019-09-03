import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure, changeSol } from './actions';

const sol = handleActions(
    {
        [changeSol]: (_state, action) => ({
            current: action.payload,
            min: 1,
            max: 100
        })
    },
    {
        current: 1,
        min: 1,
        max: 100
    }
)

const photos = handleActions(
    {
        [fetchPhotosRequest]: (_state, action) => {
            const { name, sol } = action.payload

            return {
                ..._state,
                [name]: {
                    ..._state[name],
                    [sol]: {
                        photos: [],
                        isLoading: true,
                        isLoaded: false
                    }
                }
            }
        },

        [fetchPhotosSuccess]: (_state, action) => {
            const { photos, name, sol } = action.payload;

            return {
                ..._state,
                [name]: {
                    ..._state[name],
                    [sol]: {
                        photos,
                        isLoading: false,
                        isLoaded: true
                    }
                }
            }
        },

        [fetchPhotosFailure]: (_state, action) => {
            const { name, sol } = action.payload;

            return {
                ..._state,
                [name]: {
                    ..._state[name],
                    [sol]: {
                        photos: [],
                        isLoading: false,
                        isLoaded: true
                    }
                }
            }
        }
    }, 
    {
        curiosity: {},
        opportunity: {},
        spirit: {}
    }
);

export const rovers = ['curiosity', 'opportunity', 'spirit']
export const getSol = state => state.roverPhotos.sol
export const getPhotos = state => state.roverPhotos.photos
export default combineReducers({ sol, photos })
