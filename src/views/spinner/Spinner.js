import React from "react";
import "./spinner.css";
import Lottie from "react-lottie";
import animationData from '../../lottie/loading-spinner2.json'

export default function LoadingSpinner() {

    const defaultOptions = {
        loop:true,
        autoplay:true,
        animationData:animationData,

    }
    return(
        <div className="spinner-container">
        
            <Lottie options={defaultOptions}
                    className="loading-spinner"
            >
            </Lottie>
        </div>
    )
}