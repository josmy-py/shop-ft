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
import Textarea from 'primevue/textarea'; 
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import InputSwitch from 'primevue/inputswitch';

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
    app.component('Textarea', Textarea)
    app.component('InputNumber', InputNumber)
    app.component('Dropdown', Dropdown)
    app.component('FileUpload', FileUpload)
    app.component('InputSwitch', InputSwitch)
}