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
          <textarea name id cols="150" rows="20" v-model="filelist"></textarea>
          <div>
            <Button @click="beginDown" type="primary">开始下载</Button>
            <Button @click="open" type="primary">打开文件位置</Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>


<script>
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const shell = require("electron").shell;
import titleTxt from "@/components/base-components/title";
export default {
  name: "downloadfile",
  data() {
    return {
      titleOptions: {
        text: "下载文件",
        isicon: true,
        imgname: "ionic"
      },
      filelist: "https://wwwt.bus365.cn/public/www/js/common.js",
      downloadPath: `${process.cwd()}/resources/dist/electron/downloadfile/` //文件保存路径
    };
  },
  components: { titleTxt },
  methods: {
    /**
     * 下载文件
     */
    beginDown() {
      const that = this;
      const filelist = this.filelist.split("\n");
      filelist.forEach((o, i) => {
        that.download(o, o.split("/").reverse()[0]);
      });
    },
    download(u, p) {
      const that = this;
      return fetch(u, {
        method: "GET",
        headers: { "Content-Type": "application/octet-stream" }
      })
        .then(res => res.buffer())
        .then(_ => {
          // 没有文件夹
          // console.log(that.fsExistsSync(that.downloadPath));
          // if (!that.fsExistsSync(that.downloadPath)) {
          //   console.log(that.downloadPath);
          //   fs.mkdir(that.downloadPath, { recursive: true }, err => {
          //     if (err) throw err;
          //     fs.writeFile(that.downloadPath + p, _, "binary", function(err) {
          //       console.log(err || p);
          //     });
          //   });
          // } else {
          //   fs.writeFile(that.downloadPath + p, _, "binary", function(err) {
          //     console.log(err || p);
          //   });
          // }
          let downloadPath = that.downloadPath + this.getCurrentYYMMDD();
          this.mkdirs(downloadPath, () => {
            fs.writeFile(downloadPath + "/" + p, _, "binary", function(err) {
              console.log(err || p);
            });
          });
        });
    },
    /**
     * 打开文件目录
     */
    open() {
      shell.showItemInFolder(this.downloadPath);
    },
    mkdirs(dirname, callback) {
      const that = this;
      fs.exists(dirname, function(exists) {
        if (exists) {
          callback();
        } else {
          //console.log(path.dirname(dirname));
          that.mkdirs(path.dirname(dirname), function() {
            fs.mkdir(dirname, callback);
          });
        }
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
    },
    getCurrentYYMMDD() {
      return (
        new Date().getFullYear() +
        "_" +
        (new Date().getMonth() + 1) +
        "_" +
        new Date().getDate() +
        "_" +
        new Date().getHours() +
        "_" +
        new Date().getMinutes()
      );
    }
  }
};
</script>
