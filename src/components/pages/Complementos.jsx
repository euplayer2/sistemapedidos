import { useState } from 'react';
import styles from './Complementos.module.css';
import boneca from "../img/boneca.png";

function Complementos() {
  const [etapa, setEtapa] = useState(1);
  const [numeroAcais, setNumeroAcais] = useState(1);
  const [acaiComplementos, setAcaiComplementos] = useState([[]]);
  const [acaiMls, setAcaiMls] = useState([300]);
  const [formaPagamento, setFormaPagamento] = useState('não informado');
  const [checkboxStates, setCheckboxStates] = useState([{}]);
  const [caldas, setCaldas] = useState(Array(8).fill(''));
  const [frutas, setFrutas] = useState(Array(8).fill([]));

  const opcoesMls = [
    { valor: 300, preco: 12 },
    { valor: 400, preco: 14 },
    { valor: 500, preco: 17 },
    { valor: 700, preco: 27 },
    { valor: 1000, preco: 30 },
    { valor: "Barca 1L", preco: 35 },
    { valor: "Barca 2L", preco: 65 } 
  ];

  const limiteComplementosPorMl = {
    300: 3,
    400: 4,
    500: 5,
    700: 5,
    1000: 6,
    "Barca 1L": 6,
    "Barca 2L": 6,
  };

  const handleNumeroAcaisChange = (e) => {
    const quantidade = Number(e.target.value);
    setNumeroAcais(quantidade);
    setAcaiComplementos(Array(quantidade).fill([]));
    setAcaiMls(Array(quantidade).fill(300));
    setCheckboxStates(Array(quantidade).fill({}));
    setCaldas(Array(quantidade).fill(''));
    setFrutas(Array(quantidade).fill([]));
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
    const ml = event.target.value;
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

    setCaldas((prev) => {
      const novasCaldas = [...prev];
      novasCaldas[indexAcai] = '';
      return novasCaldas;
    });

    setFrutas((prev) => {
      const novasFrutas = [...prev];
      novasFrutas[indexAcai] = [];
      return novasFrutas;
    });
  };

  const handleCaldaChange = (indexAcai, event) => {
    const { value, checked } = event.target;
    setCaldas((prev) => {
      const novasCaldas = [...prev];
      if (checked) {
        novasCaldas[indexAcai] = value;
      } else {
        novasCaldas[indexAcai] = '';
      }
      return novasCaldas;
    });
  };

  const handleFrutasChange = (indexAcai, event) => {
    const { value, checked } = event.target;

    setFrutas((prevFrutas) => {
      const novasFrutas = [...prevFrutas];
      if (checked && novasFrutas[indexAcai].length < 2) {
        novasFrutas[indexAcai].push(value);
      } else if (!checked) {
        novasFrutas[indexAcai] = novasFrutas[indexAcai].filter((fruta) => fruta !== value);
      }
      return novasFrutas;
    });
  };

  const gerarPedido = () => {
    let mensagem = 'Olá, este é o meu pedido\n';

    acaiComplementos.forEach((complementos, index) => {
      mensagem += `Açaí ${index + 1} (${acaiMls[index]} ml)\n∙ ${complementos.join('\n∙ ')}\n`;
      mensagem += `Calda: ${caldas[index]}\n`;
      mensagem += `Frutas: ${frutas[index].join(', ')}\n`;
    });

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
          <img src={boneca} alt="" className={styles.img} />
        </div>
      )}

      {etapa === 2 && (
        <div className={styles.proximo}>
          {Array.from({ length: numeroAcais }).map((_, index) => (
            <div key={index} className={styles.estilo}>
              <h3>Quantas ml para o Açaí {index + 1}?</h3>
              <select value={acaiMls[index]} onChange={(event) => handleMlChange(index, event)}>
                {opcoesMls.map(({ valor, preco }) => (
                  <option key={valor} value={valor}>
                    {valor} ml - R$ {preco.toFixed(2)}
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
                  name="Farinha Lacta"
                  checked={checkboxStates[index]?.['Farinha Lacta'] || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Farinha Lacta
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Jujuba"
                  checked={checkboxStates[index]?.Jujuba || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Jujuba
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Cereja"
                  checked={checkboxStates[index]?.Cereja || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Cereja
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Amendoim Triturado"
                  checked={checkboxStates[index]?.AmendoimTriturado || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Amendoim Triturado
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Flocos de Arroz"
                  checked={checkboxStates[index]?.FlocosdeArroz || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Flocos de Arroz
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Jujuba"
                  checked={checkboxStates[index]?.Jujuba || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Jujuba
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Amendoim Inteiro"
                  checked={checkboxStates[index]?.AmendoimInteiro || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Amendoim Inteiro
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Chocoball"
                  checked={checkboxStates[index]?.Chocoball || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Chocoball
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Tapioca"
                  checked={checkboxStates[index]?.Tapioca || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Tapioca
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Paçoca"
                  checked={checkboxStates[index]?.Paçoca || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Paçoca
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Colorete"
                  checked={checkboxStates[index]?.Colorete || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Colorete
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Granola"
                  checked={checkboxStates[index]?.Granola || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Granola
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Castanha"
                  checked={checkboxStates[index]?.Castanha || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Castanha
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Gotas de Chocolate"
                  checked={checkboxStates[index]?.GotasdeChocolate || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Gotas de Chocolate
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Biscoito"
                  checked={checkboxStates[index]?.Biscoito || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Biscoito
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Sucrilhos"
                  checked={checkboxStates[index]?.Sucrilhos || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Sucrilhos
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Granulado"
                  checked={checkboxStates[index]?.Granulado || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Granulado
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Marshmallow"
                  checked={checkboxStates[index]?.Marshmallow || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Marshmallow
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Coco Ralado"
                  checked={checkboxStates[index]?.CocoRalado || false}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
                Coco Ralado
              </label>
            </div>
          ))}
          <button onClick={() => setEtapa(1)}>Voltar</button>
          <button onClick={() => setEtapa(3)}>Próximo</button>
        </div>
      )}

      {etapa === 3 && (
        <div className={styles.proximo}>
          {Array.from({ length: numeroAcais }).map((_, index) => (
            <div key={index} className={styles.estilo}>
              <h3>Escolha a cobertura do Açaí {index + 1}:</h3>
              <label>
                <input
                  type="checkbox"
                  value="Chocolate"
                  checked={caldas[index] === 'Chocolate'}
                  onChange={(event) => handleCaldaChange(index, event)}
                />
                Chocolate
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Morango"
                  checked={caldas[index] === 'Morango'}
                  onChange={(event) => handleCaldaChange(index, event)}
                />
                Morango
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Leite Condensado"
                  checked={caldas[index] === 'Leite Condensado'}
                  onChange={(event) => handleCaldaChange(index, event)}
                />
                Leite Condensado
              </label>

              <h3>Agora as frutas do Açaí {index + 1} (até 2):</h3>
              <label>
                <input
                  type="checkbox"
                  value="Banana"
                  checked={frutas[index].includes('Banana')}
                  onChange={(event) => handleFrutasChange(index, event)}
                />
                Banana
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Morango"
                  checked={frutas[index].includes('Morango')}
                  onChange={(event) => handleFrutasChange(index, event)}
                />
                Morango
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Kiwi"
                  checked={frutas[index].includes('Kiwi')}
                  onChange={(event) => handleFrutasChange(index, event)}
                />
                Kiwi
              </label>
      
              
            </div>
          ))}
          <button onClick={() => setEtapa(2)}>Voltar</button>
          <button onClick={() => setEtapa(4)}>Próximo</button>
        </div>
      )}

      {etapa === 4 && (
        <div>
          <h3>Forma de pagamento:</h3>
          <select value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
            <option value="não informado">Selecione aqui</option>
            <option value="Pix">PIX</option>
            <option value="Cartão">CARTÃO</option>
            <option value="Dinheiro">DINHEIRO</option>
          </select>
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
