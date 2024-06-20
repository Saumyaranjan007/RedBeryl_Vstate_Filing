// src/Chatbot.js
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Avatar } from 'primereact/avatar';
import Typewriter from '../utils/TypeWritter';
import { Button } from 'primereact/button';
import html2canvas from 'html2canvas';
// import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isActive, setIsActive] = useState(false)
    const chatWindowRef = useRef(null)
    function getCurrentTimeWithAMPM() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hoursStr = hours < 10 ? '0' + hours : hours
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;

        const timeString = hoursStr + ':' + minutesStr + ' ' + ampm;
        return timeString;
    }
    const handleSend = async () => {
        setIsActive(true)
        if (input.trim()) {
            const userMessage = { sender: 'user', text: input, flag: 'user-text', time: getCurrentTimeWithAMPM() };
            setMessages([...messages, userMessage]);

            try {
                const response = await axios.post('http://192.168.1.108:8000/ask', { question: input })
                    .then((res) => {
                        console.log(res)
                        setIsActive(false)
                        const botMessage = { sender: 'bot', text: res.data.answer, flag: 'bot-text', time: getCurrentTimeWithAMPM() };
                        setMessages((prevMessages) => [...prevMessages, botMessage]);
                    })
                    .catch((err) => {
                        console.log(err)
                        setIsActive(false)
                        const botMessage = { sender: 'bot', text: "Failed to generate , Please Try Again", flag: 'bot-text', time: getCurrentTimeWithAMPM() };
                        setMessages((prevMessages) => [...prevMessages, botMessage]);
                    });

            } catch (error) {
                setIsActive(false)
                console.error('Error sending message:', error);
            }

            setInput('');
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };


    const exportChat = async () => {
        try {
            // const canvas = await html2canvas(chatWindowRef.current);
            const chatWindow = chatWindowRef.current
            const scale = 2;
            const canvas = await html2canvas(chatWindow, {
                scale,
                useCORS: true,
                allowTaint: true,
                logging: true,
                windowWidth: chatWindow.scrollWidth,
                windowHeight: chatWindow.scrollHeight,
                width: chatWindow.scrollWidth,
                height: chatWindow.scrollHeight,
            });
            const imgData = canvas.toDataURL('image/png');
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            .chat-image {
                                width: 100%;
                                height: auto;
                            }
                        </style>
                    </head>
                    <body>
                        <img src="${imgData}" class="chat-image" alt="Chat Export" />
                    </body>
                </html>
            `;

            const blob = new Blob([htmlContent], { type: 'text/html' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'chat.html';
            link.click();
        } catch (error) {
            console.error('Error exporting chat:', error);
        }
    };




    return (
        <div className="chatbot" style={{ backgroundColor: 'whitesmoke' }}>

            <div className="chat-window" ref={chatWindowRef}>
                <div className='bot-text'>
                    <Avatar icon="pi pi-user" className='mr-2' style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                    <div className='mt-1'>
                        <h6>vState</h6>
                        <div className={`message bot font-fam-for-all`} >

                            <Typewriter text="Hello! How can I assist with vState Filling today ?" speed={50} />
                        </div>

                    </div>

                </div>

                {messages.map((msg, index) => (
                    <>
                        {
                            msg.sender === "bot" ? <>
                            <div className='bot-text'>
                                <Avatar icon="pi pi-user" className='mr-2' style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                                <div className='mt-1'>
                                    <h6>vState</h6>
                                    <div className={`message bot font-fam-for-all`} >

                                        <Typewriter text={msg.text} speed={50} />
                                    </div>

                                </div>
                                </div>
                            </> : <div className={`msg ${msg.flag} font-fam-for-all`}>
                                <div key={index} className={`message ${msg.sender} font-fam-for-all`}>
                                    {/* {msg.text} */}
                                    {msg.text}

                                </div>


                            </div>
                        }

                        <div className={`msg ${msg.flag} font-fam-for-all`}>
                            <small style={msg.sender === "user" ? { alignSelf: 'flex-end', fontSize: '12px' } : { alignSelf: 'flex-start', fontSize: '12px',marginLeft:"40px" }}>
                                {msg.time}
                            </small>
                        </div>
                    </>


                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    disabled={isActive}
                    className='font-fam-for-all'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                />
                <Button icon="pi pi-send" className='mr-0 panel-Btn panel-Btn-Label' disabled={isActive} onClick={handleSend}></Button>
                <Button icon="pi pi-book" className='mr-0 panel-Btn panel-Btn-Label' onClick={exportChat}></Button>
            </div>
        </div>
    );
};

export default Chatbot;
