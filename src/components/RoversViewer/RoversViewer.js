// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchPhotosRequest } from '../../modules/RoverPhotos/actions';
import { getSol, getPhotos, rovers } from '../../modules/RoverPhotos/RoverPhotos';
import SelectSol from './../SelectSol';
import RoverPhotos from './../RoverPhotos';
import styles from './RoversViewer.module.css';

class RoversViewer extends PureComponent {
    componentDidMount() {
        const { sol } = this.props

        this.getPhotos(sol.current)
    }
  
    getPhotos = sol => {
        const { fetchPhotosRequest } = this.props

        rovers.forEach(name => fetchPhotosRequest({ sol, name }))
    }

    changeSol = val => this.getPhotos(val)

    render() {
        const { sol: { current, min, max }, photos } = this.props;

        return (
            <div className={styles.root}>
                <SelectSol 
                    minSol={min} 
                    maxSol={max} 
                    selectedSol={current} 
                    changeSol={this.changeSol}
                />

                <div className={styles.сontainer}>
                    {
                        rovers.map(item => {
                            const currentPhotos = photos[item][current] 
                                ? photos[item][current].photos 
                                : [];

                            return (
                                <RoverPhotos 
                                    key={item} 
                                    photos={currentPhotos} 
                                    name={item}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const MapStateToProps = state => ({
  photos: getPhotos(state),
  sol: getSol(state)
});
const MapDispatchToProps = { fetchPhotosRequest };

export default connect( MapStateToProps, MapDispatchToProps )(RoversViewer);

