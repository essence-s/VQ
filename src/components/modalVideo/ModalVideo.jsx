import { useEffect, useRef, useState } from "react"
import "./modalVideo.css"
import { Button, Box, Modal } from "@mui/material"
import useVideoQuestion from "../../hooks/useVideoQuestion";
import CardVideo from "../cardVideo/CardVideo";



const ModalVideo = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    // let [nextOrSend, setNextOrSend] = useState(true)
    let [indexMV, setIndexMV] = useState(0)
    const { dataVQ, setDataVQ, open, handleClose, indexVQ, somethingRecording } = useVideoQuestion()


    let stopFunction = useRef()

    // let dino = () => {
    //     stopFunction.current.stopRecording()
    // }

    useEffect(() => {
        // setTimeout(() => {
        console.log(indexVQ.current)
        // }, 4000)

        let indexArray = dataVQ.findIndex((d) => d.id == indexVQ.current)
        setIndexMV(indexArray)

    }, [indexVQ.current])

    const ccc = () => {
        stopFunction.current.stopRecording()

        if (indexMV < dataVQ.length - 1) {
            setIndexMV(indexMV + 1)
        }
    }

    const ant = () => {

        if (indexMV > 0) {
            setIndexMV(indexMV - 1)
        }
    }

    const terminar = () => {
        handleClose()
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="contentModal">
                        <Button onClick={handleClose}>:V Apachurrame {`<--`}</Button>

                        <div className="contentVideo">
                            dsds
                        </div>
                        <CardVideo stopFunction={stopFunction} index={indexMV} width={600} dataVideo={dataVQ[indexMV]}></CardVideo>
                        <Button onClick={ant} disabled={somethingRecording}>Anterior</Button>
                        <Button onClick={ccc} disabled={somethingRecording}>Siguiente</Button>
                        <Button onClick={terminar} style={dataVQ.every((el) => el.answered == true) ? {} : { display: 'none' }}>Terminar</Button>
                        {/* <button onClick={dino}>dsada</button> */}
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalVideo