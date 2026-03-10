import PrimeVue from 'primevue/config'

//servicios
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice'

//componentes
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Card from 'primevue/card';


export default function setupPrimeVue(app){
    //registramos en app
    app.use(PrimeVue)
    //registramos los servicios
    app.use(ToastService)
    app.use(ConfirmationService)
    //componentes
    app.component('Button', Button)
    app.component('Dialog', Dialog)
    app.component('InputText', InputText)
    app.component('DataTable', DataTable)
    app.component('Column', Column)
    app.component('Toolbar', Toolbar)
    app.component('Toast', Toast)
    app.component('ConfirmDialog', ConfirmDialog)
    app.component('Card', Card)
}