import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import io from 'socket.io-client'
import { useParams } from 'react-router-dom';
const socket = io.connect( 'http://localhost:5174' )
function randomID ( len ) {
    let result = '';
    if ( result ) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for ( i = 0; i < len; i++ ) {
        result += chars.charAt( Math.floor( Math.random() * maxPos ) );
    }
    return result;
}

export function getUrlParams (
    url = window.location.href
) {
    let urlStr = url.split( '?' )[1];
    return new URLSearchParams( urlStr );
}

export default function VideoCallZego () {
    const { caller_id, receiver_id } = useParams()
    const roomID = getUrlParams().get( 'roomID' ) || randomID( 5 );
    let myMeeting = async ( element ) => {

        // generate Kit Token
        const appID = 990334025;
        const serverSecret = "e57355405e19d8727587472c0abd6883";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest( appID, serverSecret, roomID, randomID( 5 ), randomID( 5 ) );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create( kitToken );
        // start the call
        const shareableLink = window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID

        zp.joinRoom( {
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url: shareableLink
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        } );


        socket.emit( 'answer_call', {
            caller_id,
            receiver_id,
            shareableLink
        } )



    };

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
}