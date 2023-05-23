import { useState } from 'react'
import './App.css'
import { ContainerVQ, ContainerVideoCard, ModalVideo, VideoRecorder } from './components'
import { VQProvider } from './context/VideoQuestionContext'
function App() {





  return (

    <>

      <VQProvider>
        <ModalVideo></ModalVideo>
        <ContainerVQ>
          <ContainerVideoCard></ContainerVideoCard>
        </ContainerVQ>
      </VQProvider>
    </>


  )
}

export default App
