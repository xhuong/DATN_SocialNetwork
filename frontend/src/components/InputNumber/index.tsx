import { InputNumber as InputNumberAnt } from "antd";
import styled from "styled-components";

const InputNumber = styled(InputNumberAnt)`
  height: 38px;
  margin-left: 12px;

  .ant-input-number-focused {
    border-color: #a487db;
  }
  .ant-input-number:focus {
    border-color: #a487db;
  }

  .ant-input-number-input-wrap {
    height: 100%;
    .ant-input-number-input {
      height: 100%;
    }
  }
`;
export default InputNumber;
