import React from 'react'

function EmptyChatDisplay() {
    return (
        <>
            <div className="chatbarDisplay text-white d-none d-md-flex ">

                <div className="container d-none d-sm-block ">
                    <div className="chatbar-display-image text-center p-2">
                        <img src="../images/whatsapp-background/web-imgpng.png" alt="whats-app img" width="auto" height="200" />
                    </div>
                    <div className="chatbar-display-text p-2">
                        <div className="chatbar-display-text-header">
                            <h3>WhatsApp Web for Windows</h3>
                        </div>
                        <div className="chatbar-display-details pt-2">
                            <p>Make calls , share your screen  and get a faster experience  when  you use our WhatsApp web </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmptyChatDisplay