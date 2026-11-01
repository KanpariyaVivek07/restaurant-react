import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const countdownTimer = () => {
      let countDate = localStorage.getItem('countdownDate');
      if (!countDate) {
        countDate = new Date();
        countDate.setDate(countDate.getDate() + 7);
        localStorage.setItem('countdownDate', countDate);
      } else {
        countDate = new Date(countDate);
      }

      const now = new Date().getTime();
      const gap = countDate - now;

      if (gap < 0) {
        const newCountDate = new Date();
        newCountDate.setDate(newCountDate.getDate() + 7);
        localStorage.setItem('countdownDate', newCountDate);
        return;
      }

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const textDay = Math.floor(gap / day);
      const textHour = Math.floor((gap % day) / hour);
      const textMinute = Math.floor((gap % hour) / minute);
      const textSecond = Math.floor((gap % minute) / second);

      setCountdown({
        days: textDay < 10 ? `0${textDay}` : textDay,
        hours: textHour < 10 ? `0${textHour}` : textHour,
        minutes: textMinute < 10 ? `0${textMinute}` : textMinute,
        seconds: textSecond < 10 ? `0${textSecond}` : textSecond
      });
    };

    const interval = setInterval(countdownTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <div className="banner_content">
        <h1>LIMITED <span>TIME</span> OFFER!</h1>
        <div className="discount_badge">
          <h2>50% <span>OFF</span></h2>
          <p>On All Pizzas & Burgers</p>
        </div>
        <div className="countdown_timer">
          <div className="timer_box">
            <span id="days">{countdown.days}</span>
            <small>Days</small>
          </div>
          <div className="timer_box">
            <span id="hours">{countdown.hours}</span>
            <small>Hours</small>
          </div>
          <div className="timer_box">
            <span id="minutes">{countdown.minutes}</span>
            <small>Mins</small>
          </div>
          <div className="timer_box">
            <span id="seconds">{countdown.seconds}</span>
            <small>Secs</small>
          </div>
        </div>
        {/* Fixed href attribute */}
        <a href="/special-offer" className="banner_btn pulse_animation">
          <i className="fa-solid fa-bolt"></i> Grab This Deal Now!
        </a>
      </div>
    </div>
  );
};

export default Banner;