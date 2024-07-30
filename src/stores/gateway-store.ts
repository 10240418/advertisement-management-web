
import { defineStore } from "pinia";

export const useGatewayStore =  defineStore('gateways', {
    state: () => {
        return {
            gateways: {},
        }
    },
    getters:{
    
    }
})
