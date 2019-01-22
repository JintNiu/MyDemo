<template>
  <div class="mainBox">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-mobile-phone"></i>
        </b>
        <span>
          <b>工厂订单</b>
        </span>
      </el-col>
      <el-col :span="1" :offset="20">
        <el-button type="primary" @click="dialogCreateVisible = true">添加订单</el-button>
      </el-col>
    </el-row>

    <!-- 订单汇总 -->
    <el-table :data="FactoryOrderInfo" border>
      <el-table-column type="index" label="No." align="center"></el-table-column>
      <el-table-column prop="orderId" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="订单来源" align="center"></el-table-column>
      <el-table-column prop="totalPrice" label="订单总价" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="setCurrent(scope.row)"
          >编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建订单 -->
    <el-dialog title="创建订单" :visible.sync="dialogCreateVisible">
      <el-form id="#create" :model="create" ref="create" label-width="100px">
        <el-form-item label="订单编号" prop="username">
          <el-input v-model="create.orderId"></el-input>
        </el-form-item>
        <el-form-item label="订单来源" prop="name">
          <el-input v-model="create.orderSource"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="password">
          <el-input v-model="create.totalPrice" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="checkpass">
          <el-input v-model="create.remark" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">取 消</el-button>
        <el-button type="primary" @click="createOrder">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改订单 -->
    <el-dialog
      title="修改订单信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form id="#update" :model="update" ref="update" label-width="100px">
        <el-form-item label="订单编号" prop="orderId">
          <el-input :disabled="true" v-model="update.orderId"></el-input>
        </el-form-item>
        <el-form-item label="订单来源" prop="orderSource">
          <el-input v-model="update.orderSource"></el-input>
        </el-form-item>
        <el-form-item label="订单总价" prop="totalPrice">
          <el-input v-model="update.totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="totalPrice">
          <el-input v-model="update.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOrder">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "MainBox",
  inject:['reload'],
  methods: {
    // 新建订单
    createOrder() {
      let data = this.create;
      console.log(data);
      this.$ajax.post('http://localhost:8080/order/saveOne/', JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json;charset=UTF-8'}
        }
      ).then(response=> {
        console.log(response);
        this.dialogCreateVisible=false;
        this.open2();
      }).catch(function (error){
        console.log("save failed！")
      });
    },
    setCurrent(currentOrder) {
      console.log(currentOrder);
      this.update.orderId = currentOrder.orderId;
      this.update.orderSource = currentOrder.orderSource;
      this.update.totalPrice = currentOrder.totalPrice;
      this.update.remark = currentOrder.remark;
      this.dialogUpdateVisible = true;
      console.log(this.dialogUpdateVisible);
    },
    updateOrder() {
      let data ={
        orderId:this.update.orderId,
        orderSource:this.update.orderSource,
        totalPrice:this.update.totalPrice,
        remark:this.update.remark
      };
      console.log(data);
      this.$ajax.post('http://localhost:8080/order/updateOne/', JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json;charset=UTF-8'}
        }
      ).then(response=> {
        console.log(response);
        this.dialogCreateVisible=false;
        this.open3();
        this.reload();
      }).catch(function (error){
        console.log("update failed！")
      });
    },
    // 删除订单
    removed(currentOrder) {
      console.log("删除订单");
      this.$confirm(
        "此操作将永久删除订单 " + currentOrder.orderId + ", 是否继续?",
        "提示",
        {
          type: "warning"
        }
      ).then(() => {
          console.log("确认删除订单");
          // 向请求服务端删除
          let orderId = currentOrder.orderId;
          console.log(orderId);
          this.$ajax.get('http://localhost:8080/order/deleteOne/'+orderId,).then(response=> {
            console.log(response);
            if(response.data=="success"){
              this.open1();
            }
          }).catch(function (error){
            console.log("delete failed！")
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    open1() {
      this.$message({
        message: '恭喜你，删除成功',
        type: 'success'
      });
      this.reload();
    },
    open2() {
      this.$message({
        message: '恭喜你，添加成功',
        type: 'success'
      });
      this.reload();
    },
    open3() {
      this.$message({
        message: '恭喜你，修改成功',
        type: 'success'
      });
    },
    open4() {
      this.$message({
        message: '恭喜你，修改成功',
        type: 'warning'
      });
    },
  },
  mounted(){
   // 加载数据
    console.log("loading data.")
    this.$ajax({
      method:'get',
      url:'http://localhost:8080/order/findAll',
    }).then(response=>{
      console.log(response.data);
      for(let i= 0; i<response.data.length;i++) {
        this.FactoryOrderInfo.push(response.data[i]);
      }
    });
  },
  data() {
    return {
      dialogCreateVisible: false,
      dialogUpdateVisible: false,
      create: {
        orderId: "",
        orderSource: "",
        totalPrice: "",
        remark: ""
      },
      update: {
        orderId: "",
        orderSource: "",
        totalPrice: "",
        remark: ""
      },
      FactoryOrderInfo: [],
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.orderTitle {
  border-bottom: 2px #409eff solid;
  font-size: 24px;
  padding-bottom: 10px;
}
</style>
