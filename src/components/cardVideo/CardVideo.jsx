import { Button } from "@mui/material"
import useVideoQuestion from "../../hooks/useVideoQuestion"
import "./cardVideo.css"
import VideoRecorder from "../videoRecorder/VideoRecorder"





const CardVideo = ({ dataVideo }) => {

    let { handleOpen, indexVQ } = useVideoQuestion()

    let handleOandM = () => {
        indexVQ.current = dataVideo.id
        handleOpen()
    }
    return (
        <div className="video-card">
            <div className="video-card__video">
                <VideoRecorder></VideoRecorder>
            </div>
            <div className="video-card__question-box" onClick={handleOandM}>
                <div className="video-card__question-square"></div>
                <Button title={dataVideo.question}>{dataVideo.question}</Button>
                {/* <div className="video-card__question-text">{dataVideo.question}</div> */}
                <div className="video-card__question-square"></div>
            </div>
        </div>
    )
}

export default CardVideo