import React from 'react';
import '../css/player.css';
import YouTube from "react-youtube";

import {
    Page,
    ListItem,
    Card
} from 'react-onsenui';

import NavBar from './NavBar';

function getdurationAll(obj) {
    var durations = [];

    for(var i=0; i<obj.length; i++){
        durations[i] = obj[i].dur;
    }

    return durations;
}

function getstartAll(obj) {
    var starts = [];

    for(var i=0; i<obj.length; i++){
        starts[i] = obj[i].start;
    }

    return starts;
}

function gettextAll(obj) {
    var texts = [];

    for(var i=0; i<obj.length; i++){
        texts[i] = obj[i].text;
    }

    return texts;
}

class Player extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            starts: [],
            texts: [],
            durations: [],
            all: [],
            start :'10',
            duration : '20',
            player: null
        };
        this.onReady = this.onReady.bind(this);
        this.onChangeStartVideo = this.onChangeStartVideo.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.onPauseVideo = this.onPauseVideo.bind(this);
    }
    onReady(event) {
        console.log(`YouTube Player object for videoId: "${this.props.videoId}" has been saved to state.`);
        this.setState({
            player: event.target,
        });
    }
    onPlayVideo() {
        this.state.player.playVideo();
    }
    onPauseVideo() {
        this.state.player.pauseVideo();
    }
    onChangeStartVideo(all) {
        this.state.player.loadVideoById({
            'videoId': this.props.videoId,
            'startSeconds': all[0],
            'endSeconds': all[0]+all[2],
            'suggestedQuality': 'default'
        })
    }
    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            console.log(this);
            if (xhttp.readyState === 4 && xhttp.status === 200){
                let response = JSON.parse(this.responseText);
                console.log(response);
                let starts = getstartAll(response);
                let texts = gettextAll(response);
                let durations = getdurationAll(response);
                console.log(durations);
                let all = [];
                for(var i=0; i<starts.length; i++){
                    all.push([starts[i], texts[i], durations[i]])
                }
                console.log(all);
                self.setState({
                    starts: starts,
                    texts : texts,
                    durations : durations,
                    all : all
                })
            }
        };
        let videoId = this.props.videoId;
        let vocab = this.props.vocab;
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/subtitle/matches?v=" + videoId + "&k="  + vocab, true);
        xhttp.send();
    }

    render(){
        const opts = {
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        return(
            <div className={"player"}>
             <Page renderToolbar={() => <NavBar title='Details'/>}>
                <div className="header">
                </div>

                                    <YouTube
                                        videoId={this.props.videoId}
                                        onReady={this.onReady}
                                        opts={opts}
                                    />
                                    <button onClick={this.onPlayVideo}>Play</button>
                                    <button onClick={this.onPauseVideo}>Pause</button>

                    <h3>List of texts that have : {this.props.vocab}</h3>
                    {this.state.all.map((all) => {
                        return (
                            <div>
                                <button onClick={()=>this.onChangeStartVideo(all)}>
                                        <p>start:{all[0]}<br/>text:{all[1]}</p>

                                </button>
                            </div>
                        )
                    })}


            </div>
        )
    }
}

export default Player;