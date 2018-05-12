/* global gapi */
import React from 'react';
import moment from 'moment';
import './App.css';
import Calendario from './components/Calendario';
import Button from './components/Button'
import {
  CLIENT_ID as clientId,
  DISCOVERY_DOCS as discoveryDocs,
  SCOPES as scope
} from './constantes';

class App extends React.Component {

  state = {
    isSignedIn: false,
    events: [],
  }

  componentWillMount(){
    console.log("La app se montará!");
  }
  componentDidMount(){
    console.log("App montada!");
    // Init gapi
    gapi
    .load('client:auth2', () => {
      gapi
      .client
      .init({
        clientId,
        discoveryDocs,
        scope
      })
      .then(() => {
      // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });
  }

  handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
  }

  updateSigninStatus = async (isSignedIn) => {
    if (isSignedIn) {
      const events = await this.getEvents();

      this.setState({
        events,
        isSignedIn: true
      });
    } else {
      this.setState({
        events: [],
        isSignedIn: false
      });
    }
  }

  transformEventsToBigCalendar = (items) => {
    return items.map(
      ({id, summary: title, start: originalStart, end: originalEnd}) => {
        let allDay;
        let start;
        let end;

        if (originalStart.date === undefined) {
          allDay = false;
          start = moment(originalStart.dateTime).toDate();
          end = moment(originalEnd.dateTime).toDate();
        } else {
          allDay = true;
          start = moment(originalStart.date).toDate();
          end = moment.utc(originalEnd.date).toDate();
        }

        return {allDay, id, title, start, end};
      }
    );
  }

  //getEvents = () =>{console.log("Aquí podemos traer los eventos")}
  getEvents = async () => {

    try {
      const {result: {items}} = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      });
      console.log(items);

      return this.transformEventsToBigCalendar(items)
    } catch (e) {
      console.error(e);
    }
  }



  render() {
    const{
      isSignedIn,
      events,
    } = this.state;

    return (
      isSignedIn
      ?<div>
        <Button label="Logout" onClick={this.handleLogout}/>
        <Calendario { ... {events}}/>
      </div>
      : <Button label="Login" onClick={this.handleLogin}/>
    );
  }
}

export default App;
