import { IAgendamento } from "../types/index";
import { api } from "./api";

class agendamentosServices{

    getAll(){
        return api.get<IAgendamento>('/agendamento');
    }

    getDia(dia: string[]){
        return api.get<IAgendamento>("/agendamento/" + dia);
    }

    getId(id: number){
        return api.get<IAgendamento>("/agendamento/id=" + id);
    }

    create(data: IAgendamento){
        return api.post('/agendamento/novo', data);
    }

    update(id: number, data: IAgendamento){
        return api.put<IAgendamento>("/agendamento/"+id, data);
    }

    delete(id: number){
        return api.delete<IAgendamento>("/agendamento/" + id);
    }

}

export default new agendamentosServices();