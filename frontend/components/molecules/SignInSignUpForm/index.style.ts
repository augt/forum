import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInfoMessage = styled.div`
  width: 300px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
  margin-top: 10px;
`;

export const StyledApiResponseMessage = styled.div`
  margin-top: 10px;
`;
