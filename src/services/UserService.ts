import api from '../api/axios';

export interface ComboItem {
    id?: string;
    codigo?: string;
    nombre?: string;
}

export interface ComboResponse {
    list: ComboItem[];
    size: number;
}

export interface UsuarioComboResponse {
    tipoDocumento?: ComboResponse;
    rol?: ComboResponse;
}

export interface UsuarioRequest {
    usuarioId?: string;
    rolId?: string;
    primerNombre?: string;
    segundoNombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    correo?: string;
    celular?: string;
    tipoDocumentoCodigo?: string;
    documento?: string;
}

export interface BaseOperacionResponse {
    codigo: string;
    mensaje: string;
}

export const UserService = {
    initForm: async (): Promise<UsuarioComboResponse> => {
        const response = await api.get<UsuarioComboResponse>('/usuario/initForm');
        return response.data;
    },

    saveOrUpdate: async (data: UsuarioRequest): Promise<BaseOperacionResponse> => {
        const response = await api.post<BaseOperacionResponse>('/usuario/saveOrUpdate', data);
        return response.data;
    }
};
