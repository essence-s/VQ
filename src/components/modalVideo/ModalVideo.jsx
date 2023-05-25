import { useEffect, useRef, useState } from "react"
import "./modalVideo.css"
import { Button, Box, Modal } from "@mui/material"
import useVideoQuestion from "../../hooks/useVideoQuestion";
import CardVideo from "../cardVideo/CardVideo";


import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


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
    const { dataVQ, setDataVQ, open, handleClose, indexVQ, setIndexVQ, somethingRecording } = useVideoQuestion()






    useEffect(() => {

        setIndexMV(indexVQ)

    }, [indexVQ])

    const ccc = () => {


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
        setIndexVQ('')
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
                        <Button onClick={terminar}>{`<--`} Volver</Button>

                        {/* <div className="contentVideo">
                            dsds
                        </div> */}
                        <CardVideo index={indexMV} width={600} dataVideo={dataVQ[indexMV]}></CardVideo>
                        <div className="modal__contentButton">

                            <div className="modal__groupButtons">
                                <Button onClick={ant} disabled={somethingRecording}>Anterior</Button>
                                <Button onClick={ccc} disabled={somethingRecording}>Siguiente</Button>

                            </div>
                            {/* <Button onClick={terminar} style={dataVQ.every((el) => el.answered == true) ? {} : { display: 'none' }}>Terminar</Button> */}

                            <div className="legenda">
                                {dataVQ.map((d, i) => {

                                    return d.answered ? <CheckCircleIcon key={i + 'lgen'} style={{ color: '#444', ...(i == indexMV ? { fontSize: '2rem' } : {}) }}></CheckCircleIcon> : <ErrorOutlineIcon key={i + 'lgen'} style={{ color: '#444', ...(i == indexMV ? { fontSize: '2rem' } : {}) }}></ErrorOutlineIcon>
                                })}
                            </div>
                        </div>

                        {/* <button onClick={dino}>dsada</button> */}
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalVideo