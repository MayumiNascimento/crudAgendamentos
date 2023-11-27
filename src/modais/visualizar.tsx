import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { IAgendamento } from "../types";
import { useEffect, useState } from "react";
import agendamentosServices from "../services/agendamentosServices";

interface IProps{
    visualizar: boolean;
    fechar: () => void;
    agendamento?: IAgendamento | null;
}

export default function Visualizar({visualizar, fechar, agendamento}: IProps) {

    const [agendamentoNovo, setAgendamentoNovo] = useState<IAgendamento >()
    const [servico, setServico] = useState<string>("")
    const [cliente, setcliente] = useState<string>("")
    const [hinicial, sethinicial] = useState<string>("")
    const [hfinal, sethfinal] = useState<string>("")
    const [dia, setdia] = useState<string>("")
    const [valor, setvalor] = useState<number>(0)
    const [descricao, setdescricao] = useState<string>("")
    const [id, setID] = useState<number>(0)
    const [isConcluido, setisConcluido] = useState<boolean>(false)

    useEffect(() => {
        if(agendamentoNovo?.id){
            agendamentosServices.getId(agendamentoNovo.id).then((response) => {
                setAgendamentoNovo(response.data);
            })
        }
    },[agendamentoNovo])
    return(

        <Modal isOpen={visualizar}>
            <ModalHeader toggle={fechar}></ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
            <input type="text" name="" 
                        value={servico} 
                        onChange={(e) => setServico(e.target.value)} 
                        className="form-control" readOnly/>
            </ModalFooter>
        </Modal>
    )
} 