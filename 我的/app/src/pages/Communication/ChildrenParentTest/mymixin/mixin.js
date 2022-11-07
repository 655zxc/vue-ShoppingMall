export default {
    methods:{
        tinghua(){
            console.log('我是XX，我听爸爸的话');
        },
        geiQian(money){
           this.money-=money;
           this.$parent.money+=money;
        }
    }
}