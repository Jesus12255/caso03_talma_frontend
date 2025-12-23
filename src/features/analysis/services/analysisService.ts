import api from '@/api/axios';

export interface AnalysisResponse {
    // Define structure based on actual API response
    // Using explicit any to facilitate migration, user should refine this later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message?: string;
}

export const analysisService = {
    analyzeDocuments: async (formData: FormData): Promise<AnalysisResponse> => {
        const response = await api.post('/analyze', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};
