export interface IAgendamento{
    id: number;
    servico: string;
    cliente: string;
    hinicial: string;
    hfinal: string;
    dia: string;
    valor: number;
    descricao: string;
    isConcluido: boolean;
}