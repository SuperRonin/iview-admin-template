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
          <Button @click="open" type="primary">浏览目录</Button>
          <Row>
            <h2 style="margin: 20px 0 5px 0;">要筛选的文件类型</h2>
            <CheckboxGroup v-model="filetype">
              <Checkbox label="css"></Checkbox>
              <Checkbox label="js"></Checkbox>
              <Checkbox label="image"></Checkbox>
              <Checkbox label="html"></Checkbox>
            </CheckboxGroup>
          </Row>
          <Row>
            <Input type="textarea" size="large" :rows="20" v-model="resultFileString" ></Input>
          </Row>
          
        </Card>
      </Col>
    </Row>
  </div>
</template>


<script>
const fs = require("fs");
const path = require("path");
const shell = require("electron").shell;
import { ipcRenderer } from "electron";
import titleTxt from "@/components/base-components/title";
import { debug } from "util";
export default {
  name: "file-address",
  data() {
    return {
      titleOptions: {
        text: "生成文件地址",
        isicon: true,
        imgname: "ionic"
      },
      resultList: [],
      resultFileString: "",
      filetype: ["css", "js", "image", "html"], //所要筛选的文件类型
      filelist: "",
      filePath: "" //选择的文件夹
    };
  },
  components: { titleTxt },
  methods: {
    /**
     * 打开文件目录
     */
    open() {
      console.log(this.filetype)
      const that = this;
      ipcRenderer.send("open-directory-dialog", "openDirectory");
      ipcRenderer.once("selectedItem", function(e, path) {
        console.log(path);
        that.filePath = path;
        that.searchFile();
      });
      //   shell.showItemInFolder("桌面");
    },
    /**
     * 搜索文件
     */
    searchFile(filedir) {
      const that = this;
      const filePath = filedir || this.filePath;
      this.resultList = filedir ? this.resultList : [];
      // this.readfile(filePath);

      //遍历读取到的文件列表
      fs.readdir(filePath, function(err, filelist) {
        console.log(filelist);
        filelist.forEach(function(o, i) {
          if (o.indexOf(".") != -1) {
            let fileExtension = o.split(".")[1];
                  fileExtension = (fileExtension == "jpg" || fileExtension == "png" || fileExtension == "gif") ? "image" : fileExtension;
            if(that.filetype.indexOf(fileExtension) != -1){
              that.resultList.push(path.join(filePath, o));
            }
            
          } else {
            //获取当前文件的绝对路径
            var filedir = path.join(filePath, o);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            fs.stat(filedir, function(err, stats) {
              if (err) {
                console.err("获取文件stats失败");
              } else {
                var isFile = stats.isFile(); //是文件
                var isDir = stats.isDirectory(); //是文件夹
                if (isFile) {
                  that.resultList.push(filedir);
                } else if (isDir) {
                  that.searchFile(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
              }
            });
          }
          if (i == filelist.length - 1) {
            that.resultFileString = that.resultList.join("\n");
            console.log(that.resultFileString);
          }
        });
      });
    },
    //检测文件或者文件夹存在
    fsExistsSync(path) {
      try {
        fs.lstatSync(path, fs.F_OK);
      } catch (e) {
        return false;
      }
      return true;
    }
  }
};
</script>
