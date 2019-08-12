<template>
  <Row>
    <Col span="24">
      <Card>
        <Row slot="title" class="clearfix">
          <titleTxt class="fl" :titleOptions="titleOptions"></titleTxt>
        </Row>
        <Row class="transtype">
          <label for>请选择类型&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <RadioGroup v-model="transtype" type="button">
            <Radio label="html2wxml">html转wxml</Radio>
            <Radio label="wxml2html">wxml转html</Radio>
          </RadioGroup>
        </Row>

        <Row class="transinput">
          <div>
            <label for>请输入比例值</label>
            <Input placeholder="1rem等于多少px？默认100" v-model="transUnit" style="width: 300px" />
            <!-- <Button type="primary" @click="px2rem">转换</Button> -->
            <Button type="primary" @click="beginTrans">转换</Button>
          </div>
        </Row>
        <Row class="clearfix" :gutter="22">
          <div class="demo-split">
            <Split v-model="split1">
              <div slot="left" class="demo-split-pane">
                <p>原代码</p>
                <Input type="textarea" v-model="initcode" :rows="20" placeholder="原代码" />
              </div>
              <div slot="right" class="demo-split-pane">
                <p>转换结果</p>
                <Input type="textarea" v-model="transcode" :rows="20" placeholder="这里展示转换后的代码" />
              </div>
            </Split>
          </div>
          <!-- <Col span="10">
            <p>转换前</p>
            <Input type="textarea" v-model="initcode" :rows="20" placeholder="原代码" />
          </Col>
          <Col span="10">
            <p>转换后</p>
            <Input type="textarea" v-model="transcode" :rows="20" placeholder="这里展示转换后的代码" />
          </Col> -->
        </Row>
      </Card>
    </Col>
  </Row>
</template>


<script>
import titleTxt from "@/components/base-components/title";
export default {
  name: "html-trans",
  data() {
    return {
      titleOptions: {
        text: "html转换",
        isicon: true,
        imgname: "ionic"
      },
      split1: 0.5,
      transtype: "",
      transUnit: 100, //转换单位 默认按照750的设计稿
      initcode: "", //原始代码
      transcode: "" //转换后代码
    };
  },
  methods: {
    beginTrans() {
      if (!this.transtype) {
        this.$Message.warning("请选择转换类型");
        return;
      }
      if (this.transtype == "html2wxml") {
        this.html2wxml();
      } else {
        this.wxml2html();
      }
    },
    html2wxml() {
      let initcode = this.initcode;
      if (!initcode) {
        this.$Message.warning("请输入要转换的代码");
        return;
      }

      initcode = initcode.replace(
        /<div |<p |<table |<tr |<ul |<dl |<h1 |<h2 |<h3 |<h4 |<h5 |<h6 |<nav |<head |<header |<footer |<article |<aside /gi,
        "<view "
      );
      initcode = initcode.replace(
        /<div>|<p>|<table>|<tr>|<ul>|<dl>|<h1>|<h2>|<h3>|<h4>|<h5>|<h6>|<nav>|<head>|<header>|<footer>|<article>|<aside>/gi,
        "<view>"
      );
      initcode = initcode.replace(
        /<\/div>|<\/p>|<\/table>|<\/tr>|<\/ul>|<\/dl>|<\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h6>|<\/h6>|<\/nav>|<\/head>|<\/header>|<\/footer>|<\/article>|<\/aside>/gi,
        "</view>"
      );

      initcode = initcode.replace(/textarea/gi, "rich-text");

      initcode = initcode.replace(/<span |<th |<td |<li |<dt /gi, "<text ");
      initcode = initcode.replace(/<a href/gi, "<navigator url");
      initcode = initcode.replace(/<\/a>/gi, "</navigator>");
      
      initcode = initcode.replace(/<br>/gi, "");

      initcode = initcode.replace(
        /<span>|<th>|<td>|<li>|<dt>/gi,
        "<text>"
      );
      initcode = initcode.replace(
        /<\/span>|<\/th>|<\/td>|<\/li>|<\/dt>/gi,
        "</text>"
      );

      initcode = initcode.replace(/<img /gi, "<image ");
      initcode = initcode.replace(/<img>/gi, "<image>");
      initcode = initcode.replace(/\/>/gi, "></image>");

      initcode = initcode.replace(/onclick/gi, "bindtap");
      // 标签里面含有样式rpx
      var reg1 = /-?\d+(\.\d+)?px/gi;
      var reg2 = /-?\d+px/gi;
      var reg3 = /-?\d+(\.\d+)?rem/gi;
      var reg4 = /-?\d+rem/gi;
      initcode = this.replaceAll(reg1, initcode, 2, "rpx");
      initcode = this.replaceAll(reg2, initcode, 2, "rpx");
      initcode = this.replaceAll(reg3, initcode, 100, "rpx");
      initcode = this.replaceAll(reg4, initcode, 100, "rpx");
      this.transcode = initcode;
    },
    wxml2html() {
      let initcode = this.initcode;
      if (!initcode) {
        this.$Message.warning("请输入要转换的代码");
        return;
      }
      initcode = initcode.replace(
        /<view |<scroll-view |<cover-view |<swiper |<swiper-item |<checkbox-group |<radio-group /gi,
        "<div "
      );
      initcode = initcode.replace(
        /<view>|<scroll-view>|<cover-view>|<swiper>|<swiper-item>|<checkbox-group>|<radio-group>/gi,
        "<div>"
      );
      initcode = initcode.replace(
        /<\/view>|<\/scroll-view>|<\/cover-view>|<\/swiper>|<\/swiper-item>|<\/checkbox-group>|<\/radio-group>/gi,
        "</div>"
      );

      initcode = initcode.replace(/<text /gi, "<span ");
      initcode = initcode.replace(/<text>/gi, "<span>");
      initcode = initcode.replace(/<\/text>/gi, "</span>");

      initcode = initcode.replace(/<checkbox /gi, '<input type="checkbox" ');
      initcode = initcode.replace(/<checkbox>/gi, '<input type="checkbox"> ');
      initcode = initcode.replace(/<\/checkbox>/gi, "");
      initcode = initcode.replace(/<radio /gi, '<input type="radio" ');
      initcode = initcode.replace(/<radio>/gi, '<input type="radio"> ');
      initcode = initcode.replace(/<\/radio>/gi, "");

      initcode = initcode.replace(/<image |<cover-image /gi, "<img ");
      initcode = initcode.replace(/<image>|<cover-image>/gi, "<img>");
      initcode = initcode.replace(/<\/image>|<\/cover-image>/gi, "");
      
      initcode = initcode.replace(/<navigator url/gi, "<a href");
      initcode = initcode.replace(/<\/navigator>/gi, "</a>");

      initcode = initcode.replace(/bindtap/gi, "onclick");

      initcode = initcode.replace(/rich-text/gi, "textarea");

      // 标签里面含有样式px
      var reg1 = /-?\d+(\.\d+)?rpx/gi;
      var reg2 = /-?\d+rpx/gi;
      initcode = this.replaceAll(reg1, initcode, 0.5, "px");
      initcode = this.replaceAll(reg2, initcode, 0.5, "px");

      this.transcode = initcode;
    },
    // 按照正则reg把target找出并用replace按照scale（和unit单位）批量替换掉
    replaceAll(reg, target, scale, unit) {
      var result = target.match(reg);
      for (var i in result) {
        target = target.replace(
          result[i],
          parseFloat(result[i]) * scale + unit
        );
        console.log(result[i], parseFloat(result[i]) * scale + unit);
        console.log(target);
      }
      return target;
    }
  },
  components: { titleTxt }
};
</script>

<style lang="scss" scoped>
.transinput,
.transtype {
  margin-bottom: 20px;
}
.demo-split {
  height: 450px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>


