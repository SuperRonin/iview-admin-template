<template>
  <div class="container">
    <Row>
      <Col span="24">
        <Card>
          <Row slot="title" class="clearfix">
            <titleTxt class="fl" :titleOptions="titleOptions"></titleTxt>
            <!-- <headerButton
              class="fr"
              @onHeaderButtonClick="onHeaderButtonClick"
              :headerButton="headerButton"
            ></headerButton>-->
          </Row>
          <div>
            <!-- <Button type="primary">Primary</Button> -->
            <Button @click="downPlugin" type="primary">下载依赖</Button>
            <Button @click="run" type="primary">开始运行</Button>
            <Button @click="getComponent" type="primary">获取文件</Button>
            <Button @click="writeComponent" type="primary">写入文件</Button>
          </div>
          <textarea name id cols="100" rows="35" readonly v-model="logs"></textarea>
          <textarea name id cols="100" rows="35" v-model="writeComponentHtml"></textarea>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
const fs = require("fs");
const path = require("path");
import titleTxt from "@/components/base-components/title";
export default {
  name: "createpage",
  data() {
    return {
      titleOptions: {
        text: "骨架屏",
        isicon: true,
        imgname: "ionic"
      },
      writeComponentHtml: "",
      tplPath: `${process.cwd()}/resources/dist/electron/skeletonProject/src/components/HelloWorld.vue`,
      logs: ""
    };
  },
  components: { titleTxt },
  created() {},
  methods: {
    /**
     * 下载依赖
     */
    downPlugin() {
      // 任何你期望执行的cmd命令，ls都可以
      let cmdStr = "cnpm install asar -g";
      // 执行cmd命令的目录，如果使用cd xx && 上面的命令，这种将会无法正常退出子进程
      let cmdPath = "resources";
      console.log(
        "========================开始解压缩文件========================="
      );
      this.runExecFun(cmdStr, cmdPath, "开始执行命令").then(() => {
        let cmdStr = "asar extract app.asar ./";
        let cmdPath = "resources";
        this.runExecFun(cmdStr, cmdPath, "解压缩文件").then(() => {
          console.log(
            "========================解压缩完成========================="
          );
          const that = this;
          setTimeout(function() {
            let cmdStr = "npm install";
            let cmdPath = "resources/dist/electron/skeletonProject";
            console.log(
              "========================开始下载依赖包========================="
            );
            that.runExecFun(cmdStr, cmdPath, "下载依赖包").then(() => {
              console.log(
                "========================依赖包下载完成========================="
              );
            });
          }, 800);
        });
      });
    },
    /**
     * 开始运行
     */
    run() {
      // 任何你期望执行的cmd命令，ls都可以
      let cmdStr = "npm run dev";
      // 执行cmd命令的目录，如果使用cd xx && 上面的命令，这种将会无法正常退出子进程
      let cmdPath = "resources/dist/electron/skeletonProject";
      this.runExecFun(cmdStr, cmdPath, "运行项目");
    },
    /**
     * 命令封装
     * @param cmdStr 命令
     * @param cmdPath 命令执行的文件夹
     * @param cmdName 当前执行的命令叫什么
     */
    runExecFun(cmdStr, cmdPath, cmdName) {
      const that = this;
      return new Promise(function(resolve, reject) {
        const exec = require("child_process").exec;
        if (cmdStr == "npm install") {
          that.logs += `====================${cmdName}==时间为3分钟左右，请耐心等待====================`;
        }
        // 子进程名称
        let workerProcess;
        // 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
        workerProcess = exec(cmdStr, { cwd: cmdPath });
        // 不受child_process默认的缓冲区大小的使用方法，没参数也要写上{}：workerProcess = exec(cmdStr, {})

        // 打印正常的后台可执行程序输出
        workerProcess.stdout.on("data", function(data) {
          console.log(data);
          that.logs += data;
        });

        // 打印错误的后台可执行程序输出
        workerProcess.stderr.on("data", function(data) {
          console.log(data);
          that.logs += data;
          reject("");
        });

        // 退出之后的输出
        workerProcess.on("close", function(code) {
          console.log("执行完成");
          that.logs += `========================${cmdName}==执行完成========================\n`;
          resolve("");
        });
      });
    },
    /**
     * 获取文件
     */
    getComponent() {
      const that = this;
      console.log(process.cwd());
      console.log(that.tplPath);
      fs.readFile(that.tplPath, "utf8", (err, data) => {
        console.log(err);
        console.log(data);
        that.writeComponentHtml = data;
      });
    },
    /**
     *写入文件
     */
    writeComponent() {
      const that = this;
      // release环境
      const data = new Uint8Array(Buffer.from("Node.1"));
      fs.writeFile(that.tplPath, data, err => {
        console.log(this.writeComponentHtml);
        const data = new Uint8Array(Buffer.from(this.writeComponentHtml));
        fs.writeFile(that.tplPath, data, err => {
          if (err) throw err;
          console.log("文件已被保存");
        });
      });

      // dev环境本地测试
      // const data = new Uint8Array(Buffer.from('Node.1'));
      // fs.writeFile(`${process.cwd()}/skeletonProject/src/components/HelloWorld.vue`, data , err => {
      //   console.log(this.writeComponentHtml)
      //   const data = new Uint8Array(Buffer.from(this.writeComponentHtml));
      //   fs.writeFile(`${process.cwd()}/skeletonProject/src/components/HelloWorld.vue`, data , err => {
      //   if (err) throw err;
      //   console.log("文件已被保存");
      // });
      // });
    }
  }
};
</script>


<style lang="less" scoped>
textarea {
  margin-top: 10px;
}
</style>
