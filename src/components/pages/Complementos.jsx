import { useState } from 'react';
import styles from './Complementos.module.css';
import boneca from "../img/boneca.png"

function Complementos() {
  const [etapa, setEtapa] = useState(1);
  const [numeroAcais, setNumeroAcais] = useState(1);
  const [acaiComplementos, setAcaiComplementos] = useState([[]]);
  const [acaiMls, setAcaiMls] = useState([300]);
  const [formaPagamento, setFormaPagamento] = useState('não informado');
  const [checkboxStates, setCheckboxStates] = useState([{}]);
  
  const [calda, setCalda] = useState('');
  const [frutas, setFrutas] = useState([]);

  // escolha de mls e n* de complementos
  const opcoesMls = [300, 400, 500];
  const limiteComplementosPorMl = {
    300: 1,
    400: 2,
    500: 3,
  };

  const handleNumeroAcaisChange = (e) => {
    const quantidade = Number(e.target.value);
    setNumeroAcais(quantidade);
    setAcaiComplementos(Array(quantidade).fill([]));
    setAcaiMls(Array(quantidade).fill(300));
    setCheckboxStates(Array(quantidade).fill({}));
  };

  const handleCheckboxChange = (indexAcai, event) => {
    const { name, checked } = event.target;
    const maxComplementos = limiteComplementosPorMl[acaiMls[indexAcai]];

    setAcaiComplementos((prev) => {
      const novosComplementos = [...prev];
      const complementosDoAcai = novosComplementos[indexAcai];

      if (checked) {
        if (complementosDoAcai.length < maxComplementos) {
          novosComplementos[indexAcai] = [...complementosDoAcai, name];
          setCheckboxStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[indexAcai] = {
              ...newStates[indexAcai],
              [name]: true,
            };
            return newStates;
          });
        } else {
          alert(
            `Você pode escolher no máximo ${maxComplementos} complementos para o Açaí ${acaiMls[indexAcai]} ml.`
          );
          setCheckboxStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[indexAcai] = {
              ...newStates[indexAcai],
              [name]: false,
            };
            return newStates;
          });
        }
      } else {
        novosComplementos[indexAcai] = complementosDoAcai.filter(
          (item) => item !== name
        );
        setCheckboxStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[indexAcai] = {
            ...newStates[indexAcai],
            [name]: false,
          };
          return newStates;
        });
      }

      return novosComplementos;
    });
  };

  const handleMlChange = (indexAcai, event) => {
    const ml = Number(event.target.value);
    setAcaiMls((prev) => {
      const novasMls = [...prev];
      novasMls[indexAcai] = ml;
      return novasMls;
    });

    setAcaiComplementos((prev) => {
      const novosComplementos = [...prev];
      novosComplementos[indexAcai] = [];
      return novosComplementos;
    });

    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[indexAcai] = {};
      return newStates;
    });
  };

  // Lógica para calda (máximo 1 calda)
  const handleCaldaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCalda(value);  // Seleciona a calda
    } else {
      setCalda('');     // Deseleciona a calda
    }
  };

  // Lógica para frutas (máximo 2 frutas)
  const handleFrutasChange = (event) => {
    const { value, checked } = event.target;

    setFrutas((prevFrutas) => {
      if (checked && prevFrutas.length < 2) {
        return [...prevFrutas, value];  // Adiciona a fruta se o limite não foi atingido
      } else if (!checked) {
        return prevFrutas.filter((fruta) => fruta !== value);  // Remove a fruta
      } else {
        return prevFrutas;  // Impede adicionar mais que duas frutas
      }
    });
  };

  // Redirecionamento para o whatsapp
  const gerarPedido = () => {
    let mensagem = `Olá, este é o meu pedido\n`;

    acaiComplementos.forEach((complementos, index) => {
        mensagem += `Açaí ${index + 1} (${acaiMls[index]} ml)\n∙ ${complementos.join('\n∙ ')}\n`;
    });

    // Inclui calda e frutas como se fossem adicionais
    mensagem += `Calda: ${calda}\nFrutas: ${frutas.join(', ')}\n`;
    mensagem += `Forma de pagamento: ${formaPagamento}`;
    const mensagemCodificada = encodeURIComponent(mensagem);

    const linkWhatsapp = `https://api.whatsapp.com/send?phone=5586988214346&text=${mensagemCodificada}`;

    window.location.href = 'https://bit.ly/47DCIYo'; 
    
    setTimeout(() => {
        window.location.href = linkWhatsapp;
    }, 200); 
};

  return (
    <div className={styles.estilo}>
      {etapa === 1 && (
        <div className={styles.estilo}>

          <h2>Quantos você deseja hoje?</h2>
          <select value={numeroAcais} onChange={handleNumeroAcaisChange}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button onClick={() => setEtapa(2)}>Próximo</button>
          <img src={boneca} alt="" className={styles.img}/>
        </div>
      )}

      {etapa === 2 && (
        <div className={styles.proximo}>
          {Array.from({ length: numeroAcais }).map((_, index) => (
            <div key={index} className={styles.estilo}>
              <h3>Quantas ml para o Açaí {index + 1}?</h3>
              <select value={acaiMls[index]} onChange={(event) => handleMlChange(index, event)} >
                {opcoesMls.map((ml) => (
                  <option key={ml} value={ml}>
                    {ml} ml
                  </option>
                ))}
              </select>

              <h3>Adicionais do Açaí {index + 1} (máximo: {limiteComplementosPorMl[acaiMls[index]]})</h3>
              <label>
                <input
                  type="checkbox"
                  name="Ovomaltine"
                  checked={checkboxStates[index]?.Ovomaltine || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Ovomaltine
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Leite em Pó"
                  checked={checkboxStates[index]?.['Leite em Pó'] || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Leite em Pó
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Leite Condensado"
                  checked={checkboxStates[index]?.['Leite Condensado'] || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Leite Condensado
              </label>
            </div>
          ))}
          <button onClick={() => setEtapa(1)}>Voltar</button>
          <button onClick={() => setEtapa(3)}>Próximo</button>
        </div>
      )}

      {/* Nova etapa para calda e frutas */}
      {etapa === 3 && (
        <div className={styles.proximo}>
          <h3>Escolha sua calda (máximo 1):</h3>
          <label>
            <input
              type="checkbox"
              value="Chocolate"
              checked={calda === 'Chocolate'}
              onChange={handleCaldaChange}
            />
            Chocolate
          </label>
          <label>
            <input
              type="checkbox"
              value="Morango"
              checked={calda === 'Morango'}
              onChange={handleCaldaChange}
            />
            Morango
          </label>
          <label>
            <input
              type="checkbox"
              value="Caramelo"
              checked={calda === 'Caramelo'}
              onChange={handleCaldaChange}
            />
            Caramelo
          </label>

          <h3>Escolha suas frutas (máximo 2):</h3>
          <label>
            <input
              type="checkbox"
              value="Banana"
              checked={frutas.includes('Banana')}
              onChange={handleFrutasChange}
            />
            Banana
          </label>
          <label>
            <input
              type="checkbox"
              value="Morango"
              checked={frutas.includes('Morango')}
              onChange={handleFrutasChange}
            />
            Morango
          </label>
          <label>
            <input
              type="checkbox"
              value="Kiwi"
              checked={frutas.includes('Kiwi')}
              onChange={handleFrutasChange}
            />
            Kiwi
          </label>
          <button onClick={() => setEtapa(2)}>Voltar</button>
          <button onClick={() => setEtapa(4)}>Próximo</button>
        </div>
      )}

      {etapa === 4 && (
        <div>
          <h1>Escolha a forma de pagamento</h1>
          <button onClick={() => setFormaPagamento('Pix')}>Pix</button>
          <button onClick={() => setFormaPagamento('Cartão')}>Cartão</button>
          <div className={styles.proximo}>
            <button onClick={() => setEtapa(3)} className={styles.botaoVoltarFinal}>Voltar</button>
            <button onClick={gerarPedido} disabled={formaPagamento === 'não informado'}>
              FAZER PEDIDO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complementos;
