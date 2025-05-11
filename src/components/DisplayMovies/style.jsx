import styled from 'styled-components';

export const Img = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

export const MovieButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
  width: 100%;
`;

export const InfoList = styled.ul`
  padding-left: 0;
  list-style: none;
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
  max-height: 120px;
  overflow-y: auto; 
`;

export const FixedInfo = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  padding: 10px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
