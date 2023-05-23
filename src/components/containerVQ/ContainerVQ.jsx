import "./ContainerVQ.css"


const ContainerVQ = ({ children }) => {

    return (
        <div className="containervq">
            <div className="containervq__title"><h1>VIDEO QUESTIONS</h1></div>
            <div className="containervq__videoContent">{children}</div>
            <div className="containervq__sendButton">
                <button>Enviar</button>
            </div>
        </div>
    )
}



export default ContainerVQ