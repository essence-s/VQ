import { useContext, useState } from "react"
import { VQContext } from '../context/VideoQuestionContext'
const useVideoQuestion = () => {

    let { dataVQ, setDataVQ, open, handleClose, handleOpen, indexVQ, setIndexVQ, videos, setVideos, somethingRecording, setSomethingRecording } = useContext(VQContext)
    // let [videoQuestion, setVideoQuestion] = useState([])

    let getDataVQ = () => {
        return dataVQ
    }


    return {
        dataVQ, setDataVQ,
        open, handleClose, handleOpen,
        indexVQ, setIndexVQ,
        videos, setVideos,
        somethingRecording, setSomethingRecording
    }
}

export default useVideoQuestion