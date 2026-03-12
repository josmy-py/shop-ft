import api from "./api";

export default {

    getAll(){
        return api.get("/productos");
    },

    store(formData){
        return api.post("/productos", formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    },

    update(id, formData){
        return api.post(`/productos/${id}?_method=PUT`, formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    },

    delete(id){
        return api.delete(`/productos/${id}`);
    },
    //método agregado para activar/desactivar
    toggleActivo(id){
        return api.patch(`/productos/${id}/toggle-activo`)
    },

}