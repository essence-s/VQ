import { useContext, useState } from "react"
import { VQContext } from '../context/VideoQuestionContext'
const useVideoQuestion = () => {

    let { dataVQ, setDataVQ, open, handleClose, handleOpen, indexVQ } = useContext(VQContext)
    // let [videoQuestion, setVideoQuestion] = useState([])

    let getDataVQ = () => {
        return dataVQ
    }


    return {
        dataVQ, getDataVQ,
        open, handleClose, handleOpen,
        indexVQ,
    }
}

export default useVideoQuestion