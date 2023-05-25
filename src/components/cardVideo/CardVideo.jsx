import { Button } from "@mui/material"
import useVideoQuestion from "../../hooks/useVideoQuestion"
import "./cardVideo.css"
import VideoRecorder from "../videoRecorder/VideoRecorder"
import { useEffect, useRef } from "react"





const CardVideo = ({ dataVideo, width, index, showRecButton = true }) => {

    let { handleOpen, indexVQ, setIndexVQ, dataVQ, setDataVQ, videos, setVideos, setSomethingRecording } = useVideoQuestion()



    let handleOandM = () => {
        // indexVQ.current = dataVideo.id
        handleOpen()

        let indexArray = dataVQ.findIndex((d) => d.id == dataVideo.id)
        setIndexVQ(indexArray)
        setSomethingRecording(false)
    }


    let fff = (dtra) => {
        setDataVQ((prev) =>
            prev.map((d) => {
                if (d.id !== dtra.id) return d

                return {
                    ...d,
                    ...dtra
                }
            })
        )
    }

    return (
        <div className="video-card" style={{ width }}>
            <div className="video-card__video">
                <VideoRecorder showRecButton={showRecButton} videos={videos} setVideos={setVideos} fff={fff} dataVideo={dataVideo} width={width}></VideoRecorder>
            </div>
            <div className="video-card__question-box" onClick={handleOandM}>
                <div className="video-card__question-square"></div>
                <Button title={dataVideo.question}>{dataVideo.question}</Button>
                {/* <div className="video-card__question-text">{dataVideo.question}</div> */}
                <div className="video-card__question-square"></div>
            </div>
            {/* <button onClick={dino}>dsada</button> */}
        </div>
    )
}

export default CardVideo