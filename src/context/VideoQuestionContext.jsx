import { createContext, useEffect, useRef, useState } from "react";
import { keyBy } from "lodash";

const VQContext = createContext()

let videoList = [
    {
        id: '1VQ',
        answered: false,
        question: 'Cual fue tu videojuego favorito durante tu infancia?'
    },
    {
        id: '2VQ',
        answered: false,
        question: 'Cual es tu comida favorita?'
    },
    {
        id: '3VQ',
        answered: false,
        question: 'Que libros son los que mas te gustan?'
    },
    {
        id: '4VQ',
        answered: false,
        question: 'Como ha sido tu infancia?'
    },
    {
        id: '5VQ',
        answered: false,
        question: 'Este estadio está lleno?mas te vale'
    }
]

// let videosArray = []

// const videoListById = keyBy(videoList, "id")
// console.log(videoListById)

const VQProvider = ({ children, data }) => {
    let [dataVQ, setDataVQ] = useState(videoList)
    let [videos, setVideos] = useState([])

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    let indexVQ = useRef()

    useEffect(() => {
        console.log(dataVQ)
    }, [dataVQ])
    useEffect(() => {
        console.log(videos)
    }, [videos])

    return (
        <VQContext.Provider value={{
            data,
            dataVQ, setDataVQ,
            open, handleClose, handleOpen,
            indexVQ,
            videos, setVideos,

        }}>
            {children}
        </VQContext.Provider>
    )
}

export { VQContext, VQProvider }