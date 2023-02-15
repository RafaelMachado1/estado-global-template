import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleCadastro, handleCart } from "../Router/cordinator";
import CardFrutas from "../components/CardFrutas";
import styled from "styled-components";

export default function Mercadinho(props) {
    
    const navigate = useNavigate();

    function comprar(id) {

        const i = props.carrinho.findIndex((item) => item.id === id);
        
        if (i !== -1) {
          props.carrinho[i] = { ...props.carrinho[i], amount: props.carrinho[i].amount + 1 };
        } else {
          const frutaEncontrada = props.frutas.find((fruta) => fruta.id === id);
          const novaFruta = { ...frutaEncontrada, amount: 1 };
          const novaLista = [...props.carrinho, (props.carrinho[1] = novaFruta)];

          props.setCarrinho(novaLista);
    }
}

   
    return (
        <MercadinhoContainer>
            <h1>Mercadinho</h1>
            <button onClick={() => handleCart(navigate)}>Vá para Carrinho </button>
            <button onClick={()=> handleCadastro(navigate)}>Cadastro de Frutas</button>
            <FrutasContainer>
                {props.frutas.map((fruta) => {
                    return (
                        <CardFrutas
                            id={fruta.id}
                            name={fruta.name}
                            image={fruta.url}
                            price={fruta.price}
                            comprar={comprar}
                        />
                    )
                })}
            </FrutasContainer>
        </MercadinhoContainer>
    );
}
const FrutasContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;
const MercadinhoContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;