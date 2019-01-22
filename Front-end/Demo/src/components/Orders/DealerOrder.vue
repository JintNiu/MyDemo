<template>
  <div class="mainBox">
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-mobile-phone"></i>
        </b>
        <span>
          <b>经销商订单</b>
        </span>
      </el-col>
      <el-col :span="1" :offset="20">
        <el-button type="primary" @click="dialogCreateVisible = true">添加订单</el-button>
      </el-col>
    </el-row>

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

    <!-- 订单汇总 -->
    <el-table :data="dealerOrderInfo" border>
      <el-table-column type="index" label="No." align="center"></el-table-column>
      <el-table-column prop="orderId" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="订单来源" align="center"></el-table-column>
      <el-table-column prop="totalPrice" label="订单总价" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
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
  </div>
</template>

<script>

export default {
  name: "DealerOrder",
  mounted() {
    // 加载数据
    console.log("loading data.");
    this.$ajax({
      method: "get",
      url: "http://localhost:8080/......"
    }).then(response => {
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        this.dealerOrderInfo.push(response.data[i]);
      }
    });
  },
  methods: {
    // 新建订单
    createOrder() {
      let data = this.create;
      console.log(data);
      this.$ajax
        .post("http://localhost:8080/order/saveOne/", JSON.stringify(data), {
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(response => {
          console.log(response);
          this.dialogCreateVisible = false;
          this.open2();
        })
        .catch(function(error) {
          console.log("save failed！");
        });
    }
  },
  data() {
    return {
      dealerOrderInfo: [],
      dialogCreateVisible: false,
      create: {
        orderId: "",
        orderSource: "",
        totalPrice: "",
        remark: ""
      }
    };
  }
};
</script>


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
</style>
