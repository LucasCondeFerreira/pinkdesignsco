import React, { Component } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Div = styled("div")`
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.primary.light};

  > form {
    background-color: ${({ theme }) => theme.palette.primary.light};
    padding-bottom: 3rem;
    width: 50%;
  }

  > form > button {
    display: block;
    width: 50%;
    margin: 0 auto;
  }

  > form > div > label {
    white-space: normal !important;
    font-family: "Karla";
  }

  > form > div > div {
    font-family: "Karla";
  }

  @media (min-width: 1025px) and (max-width: 1310px) {
    > form {
      width: 65%;
    }
  }

  @media (min-width: 481px) and (max-width: 1024px) {
    > form > div > div {
      margin-top: 2.5rem;
    }

    > form {
      width: 80%;
    }
  }

  @media (min-width: 1px) and (max-width: 480px) {
    > form > div > div {
      margin-top: 4rem;
    }
    > form {
      width: 80%;
    }
  }
`;


const fields = [
  { name: "um", label: "Qual o nome do seu negócio?" },
  { name: "dois", label: "Você possui identidade visual?" },
  { name: "tres", label: "Você tem alguma paleta de cores estabelecida?" },
  { name: "quatro", label: "Quantas páginas o seu PDF terá? (Aproximadamente)" },
  { name: "cinco", label: "Você tem algum PDF referência?" },
  { name: "seis", label: "Qual será o segmento do curso?" },
  { name: "sete", label: "Qual o público alvo?" },
  { name: "oito", label: "Você possui website?" },
  { name: "nove", label: "Alguma info adicional, que não tenha sido citada acima?" },
];

const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});

const Div = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    const { um, dois, tres, quatro, cinco, seis, sete, oito, nove } = this.state;
    const message =
      `https://api.whatsapp.com/send?phone=5551990186409&text=` +
      `Aqui está a resposta do briefing referente a compra de uma identidade visual 💜\n\n` +
      `Qual o nome do seu negócio?\n\n${um}\n\n` +
      `Você possui identidade visual?\n\n${dois}\n\n` +
      `Você tem alguma paleta de cores estabelecida?\n\n${tres}\n\n` +
      `Quantas páginas o seu PDF terá? (Aproximadamente)\n\n${quatro}\n\n` +
      `Você tem algum PDF referência?\n\n${cinco}\n\n` +
      `Qual será o segmento do curso?\n\n${seis}\n\n` +
      `Qual o público alvo?\n\n${sete}\n\n` +
      `Você possui website?\n\n${oito}\n\n` +
      `Alguma info adicional, que não tenha sido citada acima?\n\n${nove}\n\n.`;

    window.location.href = encodeURI(message);
    event.preventDefault();
  }

  handleInputChange(event, fieldName) {
    this.setState({ [fieldName]: event.target.value

  render() {
    return (
      <Div>
        <Box
          component="form"
          onSubmit={this.handleSubmit}
          sx={{
            "& > :not(style)": {
              m: 1,
              margin: "1.5rem auto",
              width: "100%",
              whiteSpace: "none",
            },
  
            ":not(style)": {
              m: 1,
              margin: "0 auto",
            },
          }}
          noValidate
          autoComplete="off"
        >
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              variant="standard"
              required
              onChange={(event) => this.handleInputChange(event, field.name)}
              value={this.state[field.name]}
            />
          ))}
          <Button type="submit" value="Send" variant="outlined">
            Enviar Briefing
          </Button>
        </Box>
      </Div>
    );
  }
  