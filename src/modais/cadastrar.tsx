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
                    <label htmlFor="">Serviço</label>
                    <input type="text" name="" 
                        value={servico} 
                        onChange={(e) => setServico(e.target.value)} 
                        className="form-control" />
                    <label htmlFor="">Cliente</label>
                    <input type="text" name="" 
                    value={cliente} 
                    onChange={(e) => setcliente(e.target.value)} 
                    className="form-control"/>

                    <div className="row">
                        <div className="col">

                            <label htmlFor="">Hora inicial</label>
                            <input type="time" name="" 
                            value={hinicial} 
                            onChange={(e) => sethinicial(e.target.value)}
                            className="form-control" />
                        </div>
                        <div className="col">
                            <label htmlFor="">Término</label>
                            <input type="time" name="" 
                            value={hfinal} 
                            onChange={(e) => sethfinal(e.target.value)}
                            className="form-control" />
                        </div>
                    </div>

                    <label htmlFor="">Dia</label>
                    <input type="date" name="" 
                    value={dia} 
                    onChange={(e) => setdia(e.target.value)}
                    className="form-control" />
                    <label htmlFor="">Descrição</label>
                    <textarea name="descricao" id="" 
                    value={descricao} 
                    onChange={(e) => setdescricao(e.target.value)}
                    className="form-control">
                    </textarea>
                    <label htmlFor="" className="label-control">Valor </label>
                    <input type="text" name="" 
                    value={valor} 
                    onChange={(e) => setvalor(parseInt(e.target.value))}
                    className="form-control" />

                </form>
            </ModalBody>
            <ModalFooter>
                <button onClick={submit}>Agendar</button>
                <button onClick={fechar}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}