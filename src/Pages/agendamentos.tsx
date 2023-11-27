import React, { useEffect, useState } from "react";
import { IAgendamento } from "../types/index";
import './agendamentos.css';
import agendamentosServices from "../services/agendamentosServices";
import Cadastrar from "../modais/cadastrar";
import Visualizar from "../modais/visualizar";
import image from '../iconpencil.png';


export default function Inicial(){

    const [agendamento, setAgendamento ] = useState<IAgendamento[]>([]);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<IAgendamento | null>(null);


    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const [mesAtual, setMesAtual] = useState(new Date());
    const [indexDia, setIndexDia ] = useState(0);
    const [diaSelecionado, setDiaSelecionado] = useState<Date[]>([]);

    const [modal, setmodal] = useState(false);
    const [modalvisu, setmodalvisu] = useState(false);

    const modalCadastro = (show: boolean) => {
        setmodal(show);
    }

    const modalVisualizar = (show: boolean, agendamento?: IAgendamento) => {
        setmodalvisu(show);
        setAgendamentoSelecionado(agendamento || null);

    }

 
    useEffect(() => {
        gerarAgendamentos()
    }, [diaSelecionado])

    const gerarCalendario = () => {

        const primeiroDia = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), 1);
        const ultimoDia = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1);
        const dias = []
        let dia = new Date(primeiroDia)

        while( dia <= ultimoDia){
            dias.push(new Date(dia));
            dia.setDate(dia.getDate() + 1);
        }

        return dias;
    }

    const mesAnterior = () => {
        setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1))
    }

    const proximoMes = () => {
        setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1))
    }

    const semanaAnterior = () => {
        setIndexDia(Math.max(indexDia - 7,0))
    }

    const proximaSemana = () => {
        const mes = gerarCalendario();
        if(indexDia + 7 < mes.length){
            setIndexDia(indexDia + 7)
        }
    }

    const selecionarDia = (dia: Date) => {
        const selecionado = diaSelecionado.some((diasSelecionado) => diasSelecionado.getTime() === dia.getTime());

        if(selecionado){
            const atualizarDia = diaSelecionado.filter((diasSelecionado) => diasSelecionado.getTime() !== dia.getTime())
            setDiaSelecionado(atualizarDia);
            setAgendamentoSelecionado(null);
        } else{
            setDiaSelecionado([dia]);
            setAgendamentoSelecionado(agendamentoSelecionado);
        }
    }

    const gerarAgendamentos = () => {
        if(diaSelecionado.length === 0){
            agendamentosServices.getAll()
            .then((response: any) => {
                setAgendamento(response.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
        } else{
            const diaFormatado = diaSelecionado.map((dia) => dia.toISOString().split('T')[0]);
            agendamentosServices.getDia(diaFormatado)
            .then((response: any) =>{
                setAgendamento(response.data);
                console.log(response.data)
            }).catch((erro:any) => {
                console.log(erro);
            })
        }
    }


    return(
        <div >
            <div className="calendario">
                <div className="mes">
                    <button onClick={mesAnterior}>Mês Anterior</button>
                    <span>{mesAtual.toLocaleString('default', {month: "long", year: "numeric"})}</span>
                    <button onClick={proximoMes}>Próximo Mês</button>
                </div>
                <div className="botoes">
                    <button onClick={semanaAnterior}>anterior</button>
                    <span>Semana {indexDia / 7 + 1}</span>
                    <button onClick={proximaSemana}>proxima</button>
                </div>
                <div className="dias">
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                {gerarCalendario().slice(indexDia, indexDia + 7).map((dia, index) => (
                                    <td key={index}>{diasDaSemana[dia.getDay()]}</td>
                                ))}
                            </tr>
                            <tr>
                                {gerarCalendario().slice(indexDia, indexDia + 7).map((dia, index) => (
                                    <td key={index}
                                    className={diaSelecionado.some((diasSelecionado) => 
                                        diasSelecionado.getTime() === dia.getTime() ) ? 'selected': ''}
                                    onClick={() => selecionarDia(dia)}
                                    >{dia.getDate()}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="addAgendamento" onClick={() => modalCadastro(true)}>+</button>
            <div className="agendamentos">
                {diaSelecionado.map((diasSelecionado, index) => (
                <div key={index}>
                    <p><b>{diasSelecionado.toLocaleDateString()}</b></p>
                    <table >
                        <thead></thead>
                        <tbody>
                            { agendamento.map((agendamentos) => (
                                <tr key={agendamentos.id}>
                                    <td>{agendamentos.hinicial} - {agendamentos.hfinal}</td>
                                    <td>{agendamentos.servico}</td>
                                    <td>R$ {agendamentos.valor}</td>
                                    <td>
                                        <button className="btnmodel" onClick={() => modalVisualizar(true, agendamentos)}>
                                            <img src={image} alt="botao" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                        
                </div>
                ))}
            </div>
            <Cadastrar visualizar={modal} fechar={() => modalCadastro(false)} agendamento={null} />
            <Visualizar visualizar={modalvisu} fechar={() => modalVisualizar(false)} agendamento={agendamentoSelecionado}/>
        </div>
    )
}