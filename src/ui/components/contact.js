const contactTemplate = () => {
    return `
        <span>{{$ctrl.data.name}}</span>
        <span>{{$ctrl.data.job}}</span>
        <span>{{$ctrl.data.company_name}}</span>
        <span>{{$ctrl.data.phone}}</span>
    `
}
class ContactCtrl {
    constructor() {}
}
//name, job, phone, company, image url, logo url
const contactConfig = {
    controller: ContactCtrl,
    template: contactTemplate(),
    bindings: {
        data: '='
    }
}

export default contactConfig;
