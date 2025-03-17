import axios from "@/axios/default-axios.ts";

export interface ImageServer {
    id: number;
    templateName: string;
    name: string;
    interfaceType: string;
    host: string;
    path: string;
    apiKey: string;
    apiSecret: string;
    appId: string;
    model: string;
    temperature: number;
    maxTokens: number;
    active: boolean;
}

export interface GenerateImageRequest {
    prompt: string;
    negativePrompt: string;
    width: number;
    height: number;
    steps: number;
    cfgScale: number;
    sampler: string;
    seed: number;
}

export function queryImageServers(page: number = 1, size: number = 10) {
    return axios.get<{
        records: ImageServer[],
        total: number,
        size: number,
        current: number
    }>(`/api/v1/image-servers?page=${page}&size=${size}`);
}

export function createImageServer(params: ImageServer) {
    return axios.post('/api/v1/image-servers', params);
}

export function updateImageServer(params: ImageServer) {
    return axios.put(`/api/v1/image-servers/${params.id}`, params);
}

export function deleteImageServer(id: number) {
    return axios.delete(`/api/v1/image-servers/${id}`);
}

export function activateImageServer(id: number) {
    return axios.put(`/api/v1/image-servers/${id}/activate`);
}

export function generateImage(params: GenerateImageRequest) {
    return axios.post<string>('/api/v1/image-servers/generate', params);
} 