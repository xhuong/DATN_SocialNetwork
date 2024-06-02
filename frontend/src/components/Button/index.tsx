import { Button as AntButton } from "antd";
import styled from "styled-components";

type Props = {
  btnType: string;
  btnSize?: string;
  isRounded?: boolean;
  isFullWidth?: boolean;
  mt12?: boolean;
};
const Button = styled(AntButton)`
  height: unset;
  padding: 8px 16px;
  ${(props: Props) =>
    props.btnType === "primary" &&
    `
  border: 1px solid #000000;
  color: #000000;
  background-color: #ffffff;

  &:hover,
  &:focus{
    color: #ffffff;
    background-color: #000000;
    border-color: #000000;
  }
  `}

  ${(props) =>
    props.btnType === "secondary" &&
    `
  border: none;
  color: #ffffff;
  background-color: #a487db;
  border-radius: unset;

  &:hover,
  &:focus{
    color: #ffffff;
    background-color: #a487db;
  }`}

  ${(props) =>
    props.isRounded &&
    `
    border-radius: 4px;
  `}
  ${(props) =>
    props.isFullWidth &&
    `
    width: 100%;
  `}
  ${(props) =>
    props.mt12 &&
    `
   margin-top: 12px;
  `}

  svg {
    margin-left: 8px;
  }
`;

export default Button;
