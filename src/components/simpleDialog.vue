<template>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="400px">
        <span>{{dialogMsg}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="clickDialog()" class="full-button">确 定</el-button>
  </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
           dialogVisible1:false, 
        }
    },
    created() {
    	console.log(this.dialogVisible);
        this.dialogVisible1 = this.dialogVisible;
    },
    props: ['dialogVisible','dialogMsg'],
    mounted: () => {
    	    console.log("==================");
            this.dialogVisible1 = this.dialogVisible;
    },
    methods: {
        //初始化获取数据
        initData() {},
        clickDialog(){
            this.dialogVisible1 = false;
            this.$emit('clickDialog');
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{font-size: 18px}

</style>