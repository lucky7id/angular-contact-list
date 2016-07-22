const contactTemplate = () => {
    return `
        <div class="overlay">
            <div class="logo" style="background: url({{$ctrl.data.icon}}) 0% 0% / cover;"></div>
            <div class="logo bg"></div>
            <h4>{{$ctrl.data.name}}</h4>
            <div>{{$ctrl.data.job}} | @{{$ctrl.data.company_name}}</div>
            <br>
            <div class="detail"><i ng-if="$ctrl.data.phone" class="material-icons">phone</i> {{$ctrl.data.phone || '&nbsp;'}}</div>
            <div class="detail"><i ng-if="$ctrl.data.email" class="material-icons">email</i>{{$ctrl.data.email || '&nbsp;'}}</div>
        </div>
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
