import { Button } from "@mui/material"
import useVideoQuestion from "../../hooks/useVideoQuestion"
import "./cardVideo.css"
import VideoRecorder from "../videoRecorder/VideoRecorder"
import { useEffect } from "react"





const CardVideo = ({ dataVideo, width, index }) => {

    let { handleOpen, indexVQ, setDataVQ, videos, setVideos } = useVideoQuestion()

    let handleOandM = () => {
        indexVQ.current = dataVideo.id
        handleOpen()
    }

    useEffect(() => {
        console.log(dataVideo)
    }, [dataVideo])

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
                <VideoRecorder setVideos={setVideos} fff={fff} dataVideo={dataVideo} width={width}></VideoRecorder>
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