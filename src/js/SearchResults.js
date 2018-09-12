import React from 'react';
import '../css/searchresults.css';

import {
    Page,
    ListItem,
    Card
} from 'react-onsenui';

import NavBar from './NavBar';

function getThumbnailAll(obj) {
    var thumbnails = [];

    for(var i=0; i<obj.length; i++){
        thumbnails[i] = obj[i].thumbnail;
    }

    return thumbnails;
}

function getTitleAll(obj){
    var titles = [];

    for(var i=0; i<obj.length; i++){
        titles[i] = obj[i].title;
    }

    return titles;
}
function getwordHitCountAll(obj){
    var wordHitCounts = [];

    for(var i=0; i<obj.length; i++){
        wordHitCounts[i] = obj[i].wordHitCount;
    }

    return wordHitCounts;
}
function getvideoIdAll(obj) {
    var videoIds = [];

    for(var i=0; i<obj.length; i++){
        videoIds[i] = obj[i].videoId;
    }

    return videoIds;
}

const imageStyle ={
    width : "100%",
}

class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            thumbnails: [],
            titles : [],
            wordHitCounts : [],
            videoIds : [],
            all : []
        };
    }

    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            console.log(this);
            if (xhttp.readyState === 4 && xhttp.status === 200){
                console.log(this.responseText);

                let response = JSON.parse(this.responseText);
                console.log(response.length);
                let thumbnails = getThumbnailAll(response);
                let titles = getTitleAll(response);
                let wordHitCounts = getwordHitCountAll(response);
                let videoIds = getvideoIdAll(response)
                // console.log(thumbnails);
                // console.log(titles);
                // console.log(wordHitCounts);
                let all = []
                for(var i=0; i<thumbnails.length; i++){
                    all.push([thumbnails[i], titles[i], wordHitCounts[i], videoIds[i]])
                }
                console.log(all)
                self.setState({
                    thumbnails: thumbnails,
                    titles : titles,
                    wordHitCounts : wordHitCounts,
                    videoIds : videoIds,
                    all : all
                })
            }
        }
        let vocab = this.props.vocab;
        let keyword = this.props.keyword;
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();
    }

    sendVideoId(videoId){
        this.props.changeVideoId(videoId)
        this.props.changePage('Player')
    }


    render() {
        return (
            <div className={"searchresults"}>
                <Page renderToolbar={() => <NavBar title='Search Results'/>}>


                <div className="header">
                </div>
                <div className="main">
                    {this.state.all.map((all) => {
                        return (
                            <div className="row">
                                <div className="col-xs-12">
                                    <a onClick={() => this.sendVideoId(all[3])}>
                                        <Card>
                                        <ListItem>
                                        <img src={all[0]} style={imageStyle}></img>

                                        </ListItem>
                                        </Card>
                                        <ListItem>
                                        <div className="col-xs-9">
                                            <h3>{all[1]}</h3>
                                            <h3>含んでるワードの数：{all[2]}</h3>
                                        </div>
                                        </ListItem>
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {this.state.a}
                </Page>
            </div>
        )
    }
}

export default SearchResults;