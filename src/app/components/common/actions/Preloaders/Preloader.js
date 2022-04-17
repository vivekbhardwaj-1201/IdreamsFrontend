// import ReactLoading from "react-loading";
import React from 'react';
import { Dots } from 'react-preloaders2';
// import styles from './Preloader.module.css';


const Preloader = (props) => {
    return (
        <>
            <Dots customLoading={props.customLoading} background="blur" color = "#0d67dd"/>
        </>
    )
}

export default Preloader;