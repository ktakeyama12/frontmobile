import React from 'react';
import '../css/player.css';
import Example from '../js/Example';

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
            start :'',
            duration : ''

        };
    }
    onClickLoadVideo(a) {
        this.setState({start: a[0]});
        this.setState({duration: a[2]});
        if (this.player) this.player.loadVideoById({
            'videoId': this.props.videoId,
            'startSeconds': a[0],
            'endSeconds': a[0]+a[2],
            'suggestedQuality': 'default'
        });
        console.log('endSeconds');
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
                console.log(durations)
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
        }
        let videoId = this.props.videoId
        let vocab = this.props.vocab
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/subtitle/matches?v=" + videoId + "&k="  + vocab, true);
        xhttp.send();
    }

    render(){
        return(
            <div className={"player"}>
                <div className="header">
                    <h1 className="text-center">Find Words On Youtube!</h1>
                    <p className="text-center">ユーチューブでたんごをさがそう!</p>
                    <p className="text-center"><a href="/" className="btn btn-success">Home ほーむ</a></p>
                </div>
                <aside className="col-xs-4">
                    <h3>List of texts that have : {this.props.vocab}</h3>
                    {this.state.all.map((all) => {
                        return (
                            <div>
                                <a onClick={()=>this.onClickLoadVideo(all)}>
                                    <ul>
                                        <li>start:{all[0]}</li>
                                        <li>text:{all[1]}</li>
                                    </ul>
                                </a>
                            </div>
                        )
                    })}
                    <button className="SearchResults" onClick = {() => this.props.changePage('SearchResults')}>
                        SearchResults
                    </button>
                    <button className="Player" onClick = {() => this.props.changePage('Player')}>
                        Player
                    </button>
                </aside>
                <div className="main col-xs-8">
                    <Example
                        videoId={this.props.videoId}
                        start={this.state.start}
                        duration={this.state.duration}
                    />
                </div>
            </div>
        )
    }
}

export default Player;