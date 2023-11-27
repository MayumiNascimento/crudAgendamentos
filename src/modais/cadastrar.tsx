import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { IAgendamento } from "../types";
import { useState } from "react";
import agendamentosServices from "../services/agendamentosServices";
import Swal from "sweetalert2";

interface IProps{
    visualizar: boolean;
    fechar: () => void;
    agendamento?: IAgendamento | null;
}

export default function Cadastrar({visualizar, fechar, agendamento}: IProps){

        const [agendamentoNovo, setAgendamentoNovo] = useState<IAgendamento>()
        const [servico, setServico] = useState<string>("")
        const [cliente, setcliente] = useState<string>("")
        const [hinicial, sethinicial] = useState<string>("")
        const [hfinal, sethfinal] = useState<string>("")
        const [dia, setdia] = useState<string>("")
        const [valor, setvalor] = useState<number>(0)
        const [descricao, setdescricao] = useState<string>("")
        const [id, setID] = useState<number>(0)
        const [isConcluido, setisConcluido] = useState<boolean>(false)


        const submit = async (event:React.FormEvent) => {
            event.preventDefault();

            try{
                const novoAgendamento : IAgendamento = {
                    id,
                    servico,
                    cliente,
                    hinicial,
                    hfinal,
                    valor,
                    dia,
                    descricao,
                    isConcluido
                };
                if(agendamento?.id){
                    const response = await
                    agendamentosServices.update(agendamento.id, novoAgendamento)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      
                    setAgendamentoNovo(response.data)
                } else{
                    const response = await 
                    agendamentosServices.create(novoAgendamento)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Agendamento cadastrado com sucesso",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      
                    setAgendamentoNovo(response.data)
                }
            } catch (erro){
                console.log(erro)
            }
        }


    return(
        <Modal size="md" isOpen={visualizar}>
            <ModalHeader toggle={fechar}>Cadastrar Agendamento</ModalHeader>
            <ModalBody>
                <form onSubmit={submit}>
                    <label htmlFor="servico">Serviço</label>
                    <input type="text" name="servico" 
                        value={servico} 
                        onChange={(e) => setServico(e.target.value)} 
                        className="form-control" />
                    <label htmlFor="cliente">Cliente</label>
                    <input type="text" name="cliente" 
                    value={cliente} 
                    onChange={(e) => setcliente(e.target.value)} 
                    className="form-control"/>

                    <div className="row">
                        <div className="col">

                            <label htmlFor="hinicial">Hora inicial</label>
                            <input type="time" name="hinicial" 
                            value={hinicial} 
                            onChange={(e) => sethinicial(e.target.value)}
                            className="form-control" />
                        </div>
                        <div className="col">
                            <label htmlFor="hfinal">Término</label>
                            <input type="time" name="hfinal" 
                            value={hfinal} 
                            onChange={(e) => sethfinal(e.target.value)}
                            className="form-control" />
                        </div>
                    </div>

                    <label htmlFor="dia">Dia</label>
                    <input type="date" name="dia" 
                    value={dia} 
                    onChange={(e) => setdia(e.target.value)}
                    className="form-control" />
                    <label htmlFor="descricao">Descrição</label>
                    <textarea name="descricao" id="descricao" 
                    value={descricao} 
                    onChange={(e) => setdescricao(e.target.value)}
                    className="form-control">
                    </textarea>
                    <label htmlFor="valor" className="label-control">Valor </label>
                    <input type="number" name="valor" 
                    value={valor} 
                    onChange={(e) => setvalor(parseInt(e.target.value))}
                    className="form-control" />

                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" onClick={submit}>Agendar</button>
                <button className="btn btn-light"onClick={fechar}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}