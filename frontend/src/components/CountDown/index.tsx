import { Alert, AlertProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICountDown extends AlertProps {
  redirectURL: string;
  time: number;
  startCounting: boolean;
}

export default function Countdown({
  time,
  redirectURL,
  startCounting,
  ...props
}: ICountDown) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(time);

  useEffect(() => {
    if (startCounting) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      if (!countdown) {
        clearInterval(interval);
        navigate(redirectURL);
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [startCounting, countdown]);

  return (
    <>
      {startCounting && (
        <Alert
          {...props}
          type={props.type}
          showIcon={props.showIcon}
          className={props.className}
          message={`${props.message} ${countdown}s`}
        />
      )}
    </>
  );
}
