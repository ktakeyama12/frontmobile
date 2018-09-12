import React from 'react';
import '../css/search.css';

import Button from '@material-ui/core/Button';

import {
    Page,
    Switch,
    ListItem
} from 'react-onsenui';

import NavBar from './NavBar';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components-blue-theme.css';

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            vocab: '',
            keyword: '',
            formFlg: false
        };

        this.handleChangeVocab = this.handleChangeVocab.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    OnClickChange(){
        this.setState({formFlg : !this.state.formFlg})
    }
    handleChangeVocab(event) {
        this.setState({vocab: event.target.value});
    }

    handleChangeKeyword(event) {
        this.setState({keyword: event.target.value});
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.vocab + this.state.keyword);
        event.preventDefault();
        this.loadDoc();
        this.props.changeVocab(this.state.vocab);
        this.props.changeKeyword(this.state.keyword);
        this.props.changePage('SearchResults')
    }

    loadDoc() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
            }
        };
        let vocab = this.state.vocab;
        let keyword = this.state.keyword;
        // 逆にしてる
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();
    }

    render(){
        return(
            <div className={"search"}>
            <Page renderToolbar={() => <NavBar title='Find Words on Youtube'/>}>
                <div className="header col-xs-12">
                    <img src="pictures/ManaTube.png" className={"ManaTube_left"}/>
                    <h1 className="text-center"><span className={"f"}>F</span>ind <span className={"w"}>W</span>ords <span className={"o"}>O</span>n <span className={"y"}>Y</span>outube!</h1>
                </div>
                <div className="contents col-xs-offset-1 col-xs-10">
                    <div className="col-xs-12">
                        <form role="form"  onSubmit={this.handleSubmit}>
                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <h3>Searching Vocab</h3>

                                <input className="form-control" placeholder="e.g. this" type="text" value={this.state.value} onChange={this.handleChangeVocab} />
                            </div>

                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <h3>Keyword on Youtube</h3>
                                {/*<input className="form-control" type="text" placeholder="e.g. katy perry" ref="keyword"/>*/}
                                <input className="form-control" placeholder="e.g. this" type="text" value={this.state.value} onChange={this.handleChangeKeyword} />

                            </div>

                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <h3>Category</h3>
                                <div className="sample">
                                <ListItem>
                                <Switch/> Music
                                </ListItem>
                                <ListItem>
                                <Switch/> Movie
                                </ListItem>
                                <ListItem>
                                <Switch/> Anime
                                </ListItem>
                                <ListItem>
                                <Switch/> Game
                                </ListItem>
                                <ListItem>
                                <Switch/> TED
                                </ListItem>
                                <ListItem>
                                <Switch/> Keyword
                                </ListItem>



                                </div>
                            </div>
                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8" style={{ display: this.state.formFlg ? '' : 'none' }}>
                                <h3>Keyword on Youtube</h3>
                                {/*<input className="form-control" type="text" placeholder="e.g. katy perry" ref="keyword"/>*/}
                                <input className="form-control" placeholder="e.g. this" type="text" value={this.state.value} onChange={this.handleChangeKeyword} />
                            </div>
                            <div className="col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                {/*<button type="submit" className="btn btn-success btn-block">Search けんさく</button>*/}
                                <p className="text-center">
                                <Button color="primary" type="submit" variant="extendedFab" aria-label="Delete" className="text-center">
                                    Search けんさく
                                </Button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                </Page>
            </div>

        )
    }
}

export default Search;