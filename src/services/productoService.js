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
        return api.put(`/productos/${id}`, formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    },

    delete(id){
        return api.delete(`/productos/${id}`);
    }

}