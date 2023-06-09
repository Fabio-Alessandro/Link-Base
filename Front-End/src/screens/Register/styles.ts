import styled from 'styled-components/native';
import COLORS from "../../styles/theme" 

export const Container = styled.View`
padding-top:80px;
flex: 1;
align-items: center;
justify-content: center; 
width:100%;
`;

export const Title = styled.Text`
    font-family: "Outfit_700Bold";
    font-size: 30px;
    color: #464444;
    margin: 0 auto;
`;

export const Description = styled.Text`
font-family: "Outfit_300Light";
font-size: 14px;
width: 80%;
margin-top: 25px;
margin-bottom: 41px;
text-align: center;
`;

export const Input = styled.TextInput`
width: 320px;
height: 59px;
font-family: "Outfit_500Medium";
font-size: 15px;
color: #666161;
background: #F3F3F3;
box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
border-radius: 15px;
margin-bottom:12px;
padding:20px;
`;

export const Button = styled.TouchableOpacity`

width: 320px;
height: 54px;
background-color: #a0279e
box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
border-radius: 15px;
margin-top:28px;
`;
