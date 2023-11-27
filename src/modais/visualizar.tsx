import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { IAgendamento } from "../types";
import { useEffect, useState } from "react";
import agendamentosServices from "../services/agendamentosServices";
import swal from 'sweetalert2';

interface IProps{
    visualizar: boolean;
    fechar: () => void;
    agendamento?: IAgendamento | null;
}

export default function Visualizar({visualizar, fechar, agendamento}: IProps) {

    const [agendamentoNovo, setAgendamentoNovo] = useState<IAgendamento| null>(null);

    useEffect(() => {
        if (agendamentoNovo && agendamento) {
            agendamentosServices.getId(agendamentoNovo.id).then((response) => {
                setAgendamentoNovo(response.data);
                setAgendamentoNovo(agendamento);
                console.log(response.data)
            }).catch((error) => {
               alert(error);
            });
        }
    }, [agendamentoNovo?.id]);

    const deletarAgendamento = () => {
        if (agendamentoNovo && agendamento) {
            swal.fire({
                title: "Excluir",
                text: `Todos os dados do agendamento ${agendamentoNovo.servico} serão excluídos. Deseja continuar?`,
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sim",
                confirmButtonColor: "#F90006"
              }).then((result) => {
                if (result.isConfirmed) {
                  agendamentosServices.delete(agendamentoNovo.id)
                    .then(() => {
                      
                      swal.fire({ title: "", text: "Exclusão realizada com sucesso!", icon: "success", confirmButtonColor: "#F90006" });
                        fechar();
                    }, (err) => {
                      swal.fire({ title: "Ocorreu um erro", text: err, icon: "error", confirmButtonColor: "#F90006" });
                    });
                }
              })
            }
          };
    
    return(

        <Modal isOpen={visualizar}>
            <ModalHeader toggle={fechar}>Detalhes do Agendamento</ModalHeader>
            <ModalBody>
            { agendamento && (
                <div className="container-md">
                    <div className="text-center">
                        <p><strong>{agendamento.servico.toUpperCase()}</strong> </p>
                        <p ><strong>Dia:</strong> {agendamento.dia}</p>
                    </div>
                    <p><strong>Cliente:</strong> {agendamento.cliente}</p>
                    <p><strong>Inicio:</strong> {agendamento.hinicial}h <strong>Término:</strong> {agendamento.hfinal}h</p>
                    <p><strong>Descrição:</strong></p>
                    <p>
                        {agendamento.descricao}
                    </p>
                    <p><strong>Valor a receber:</strong> R$ {agendamento.valor}</p>
                    <p><strong>Concluído:</strong> {agendamento.isConcluido ? 'Sim' : 'Não'}</p>
                    <button 
                    className="btn btn-light" 
                    onClick={deletarAgendamento}
                    style={{float: 'right'}}
                    >Deletar</button>
                </div>
            ) }
            </ModalBody>

        </Modal>
    )
} 