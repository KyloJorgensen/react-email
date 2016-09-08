'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var MAIL = {
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
};

var Start = function() {
    return (
        <p>Choose an Mail Box</p>
    );
};

var Mail = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/' + props.mailBoxName + '/' + props.id}>
                    {props.title}
                </Link>
            </strong>
            {props.from}
        </div>
    );
};

var MailBoxList = function(props) {
    var letters = Object.keys(props.mailBox).map(function(letterId, value) {
        var letter = props.mailBox[letterId];
        return(
            <li key={value}>
                <Mail id={letter.id} from={letter.from} title={letter.title} mailBoxName={props.mailBoxName} />
            </li>
        );
    });
    return (
        <ul>
            {letters}
        </ul>
    );
};

var MailBoxContainer = function(props) {
    return (  
        <div>
            <h3>{props.params.mailBoxName}</h3>
            <MailBoxList mailBox={MAIL[props.params.mailBoxName]} mailBoxName={props.params.mailBoxName} />
        </div>
    );
};

var Letter = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/' + props.mailBoxName}>
                    Back
                </Link>
            </strong>
            <div>
                <p>To: {props.letter.to}</p>
                <p>From: {props.letter.from}</p>
                <p><strong>{props.letter.title}</strong></p>
                <p>{props.letter.content}</p>
            </div>
        </div>
    );
};

var LetterContainer = function(props) {
    var letter = MAIL[props.params.mailBoxName][props.params.mailId];
    return <Letter letter={letter} mailBoxName={props.params.mailBoxName} />;
};

var SideMenu = function() {
    return (
        <div>
            Mail Boxs
            <ul>
                <li>
                    <strong>
                        <Link to={'/inbox'}>
                            INBOX
                        </Link>
                    </strong>
                </li>
                <li>
                    <strong>
                        <Link to={'/spam'}>
                            SPAM
                        </Link>
                    </strong>
                </li>
            </ul>
        </div>
    );
};

var App = function(props) {
    return (
        <div>
            <h1>
                Email App
            </h1>
            <SideMenu />
            <div>
                {props.children}
            </div>
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Start} />
            <Route path="/:mailBoxName" component={MailBoxContainer} />
            <Route path="/:mailBoxName/:mailId" component={LetterContainer} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});