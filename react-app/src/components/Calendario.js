import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const style={
  height: '100vh'
};

const events = [{
  start: new Date(),
  end: new Date(moment().add(1, "days")),
  title: "Mi título"
}];

class Calendario extends React.Component{
  render() {
    return(
      <div style={style}>
        <BigCalendar events={this.props.events} />
      </div>
    );
  }
}

export default Calendario;
