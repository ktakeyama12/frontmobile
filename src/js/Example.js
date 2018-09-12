import React from 'react';
import YouTube from 'react-youtube';


class Example extends React.Component {
    onStateChange = (event) => {
        // do something with the state change event
    };

    onReady = (event) => {
        // your player is now ready
    };

    onPlayer = (player) => {
        // save your player reference for later
        this.player = player;
    };

    // onClick = (event) => {
    //     // interact with your player using javascript methods
    //     if (this.player) this.player.loadVideoById('Zi_XLOBDo_Y');
    // };
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        return (
            <YouTube
                videoId={this.props.videoId}
                opts={opts}
                onStateChange={this.onStateChange}
                onReady={this.onReady}
                onPlayer={this.onPlayer}
            />
        );
    }

    // _onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.playVideo();
    // }
    // _onStateChange(event){
    //     event.target.
    // }
}
export default Example;