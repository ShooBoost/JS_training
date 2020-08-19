var consoleState = false;
function showConsole(description,thingsYouWantToConsole){
    if (consoleState){
        console.log(description,thingsYouWantToConsole);
    };
};

var app = new Vue({
    el: '#app',
    data: {
        userAccount: {
            email: '',
            password: ''
        },
    },
    methods: {
        getToken() {
            const vm = this;
            const hexApiPath = 'https://course-ec-api.hexschool.io/';
            const myApiPath = `${hexApiPath}api/auth/login`;
            axios.post(myApiPath, vm.userAccount)
                .then(res =>{
                    showConsole('getToken 的 post res: ', res);
                    const myToken = res.data.token;
                    const expired = res.data.expired;
                    document.cookie = `tokenInCookie=${myToken}; expires=${new Date(expired * 1000)}`;
                    window.location ='week4.html'
                })
                .catch(err =>{
                    alert('try again')
                    showConsole('getToken 的 post err: ', err);
                })
        }
    }
});