import { useEffect, useRef, useState } from "react";
import './videoRecorder.css'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { set } from "lodash";

const VideoRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [downloadLink, setDownloadLink] = useState("");
    const streamRecorderRef = useRef(null);
    const [audioSource, setAudioSource] = useState("");
    const [videoSource, setVideoSource] = useState("");
    const [audioSourceOptions, setAudioSourceOptions] = useState([]);
    const [videoSourceOptions, setVideoSourceOptions] = useState([]);
    const [error, setError] = useState(null);
    const chunks = useRef([]);

    const timerRef = useRef(null)
    const [timeCounter, setTimeCounter] = useState(0)
    const totalDuration = 120
    const interval = useRef(null)

    let clearIntervalTimerCounter = () => {
        console.log(':V clear  ')

        clearInterval(interval.current)
        // interval.current = null
        console.log(interval.current)
        console.log(interval)
        setTimeCounter(0)
        // setCorriendo(false);
    }
    let createIntervalTimerCounter = () => {

        console.log(':V create')
        console.log(interval.current)
        console.log(interval)
        interval.current = setInterval(() => {
            setTimeCounter((tiempo) => tiempo + 1);
        }, 1000);


    }


    const timeFormater = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const missingSeconds = seconds % 60;
        return `${minutes}:${missingSeconds.toString().padStart(2, '0')}`;
    };


    function startRecording() {

        if (isRecording) {
            return;
        }
        if (!streamRef.current) {
            return;
        }


        streamRecorderRef.current = new MediaRecorder(streamRef.current);
        streamRecorderRef.current.start();
        streamRecorderRef.current.ondataavailable = function (event) {
            if (chunks.current) {
                chunks.current.push(event.data);
            }
        };
        setIsRecording(true);
        timerRef.current = setTimeout(() => {
            stopRecording();
        }, 2 * 60 * 1000); // 2 minutos en milisegundos
    }

    useEffect(function () {
        console.log(isRecording)
        console.log(chunks.current)
        if (isRecording) {
            createIntervalTimerCounter()
            return;
        }
        if (chunks.current.length === 0) {
            return;
        }

        const blob = new Blob(chunks.current, {
            type: "video/x-matroska;codecs=avc1,opus",
        });
        setDownloadLink(URL.createObjectURL(blob));



        chunks.current = [];
    }, [isRecording])

    function stopRecording() {

        console.log(streamRecorderRef.current)
        if (!streamRecorderRef.current) {
            return;
        }
        streamRecorderRef.current.stop();

        setTimeout(() => {
            setIsRecording(false);
            clearIntervalTimerCounter()
        }, 100)


    }

    useEffect(function () {
        async function prepareStream() {
            function gotStream(stream) {
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }

            async function getStream() {
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach((track) => {
                        track.stop();
                    });
                }
                const constraints = {
                    audio: {
                        deviceId: audioSource !== "" ? { exact: audioSource } : undefined,
                    },
                    video: {
                        deviceId: videoSource !== "" ? { exact: videoSource } : undefined,
                        width: { ideal: 100 },
                        height: { ideal: 150 },
                    },
                };
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    gotStream(stream);
                } catch (error) {
                    setError(error);
                }
            }

            function getDevices() {
                return navigator.mediaDevices.enumerateDevices();
            }

            function gotDevices(deviceInfos) {
                const audioSourceOptions = [];
                const videoSourceOptions = [];
                for (const deviceInfo of deviceInfos) {
                    if (deviceInfo.kind === "audioinput") {
                        audioSourceOptions.push({
                            value: deviceInfo.deviceId,
                            label: deviceInfo.label || `Microphone ${deviceInfo.deviceId}`,
                        });
                    } else if (deviceInfo.kind === "videoinput") {
                        videoSourceOptions.push({
                            value: deviceInfo.deviceId,
                            label: deviceInfo.label || `Camera ${deviceInfo.deviceId}`,
                        });
                    }
                }
                setAudioSourceOptions(audioSourceOptions);
                setVideoSourceOptions(videoSourceOptions);
            }

            await getStream();
            const mediaDevices = await getDevices();
            gotDevices(mediaDevices);
        }
        prepareStream();

        return () => clearIntervalTimerCounter()
    }, []);

    return (
        <div className="videoRecorder">
            {/* <div>
                <select id="videoSource" name="videoSource" value={videoSource}>
                    {videoSourceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select id="audioSource" name="audioSource" value={audioSource}>
                    {audioSourceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div> */}
            {isRecording && <div className="rec">{timeFormater(timeCounter) + '/' + timeFormater(totalDuration)}< div className="rec-circle"></div></div>}

            {
                isRecording ? <div>
                    <video ref={videoRef} autoPlay muted playsInline></video>
                </div> :
                    <div>
                        {downloadLink && <video src={downloadLink} controls></video>}
                        {downloadLink && (
                            <a href={downloadLink} download="file.mp4">
                                Descargar
                            </a>
                        )}
                    </div>
            }


            <div className="option-VQ">
                {
                    isRecording ? <button onClick={stopRecording} disabled={!isRecording}>
                        <StopIcon></StopIcon>
                    </button> : <button onClick={startRecording} disabled={isRecording}>
                        <VideoCameraFrontIcon></VideoCameraFrontIcon>
                    </button>
                }
            </div>
            <div>{error && <p>{error.message}</p>}</div>
        </div >
    );
}

export default VideoRecorder;