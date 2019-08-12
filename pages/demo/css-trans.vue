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
            <Radio label="px2rem">px转rem</Radio>
            <Radio label="rem2rpx">rem转rpx</Radio>
            <Radio label="rem2px">rem转px</Radio>
            <Radio label="rpx2rem">rpx转rem</Radio>
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

        <Row class="clearfix" :gutter="18">
          <div class="demo-split">
            <Split v-model="split1">
              <div slot="left" class="demo-split-pane">
                <p>原代码</p>
                <Input type="textarea" :rows="20" v-model="initcode" placeholder="原代码" />
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
          </Col>-->
        </Row>
      </Card>
    </Col>
  </Row>
</template>


<script>
import titleTxt from "@/components/base-components/title";
export default {
  name: "css-trans",
  data() {
    return {
      titleOptions: {
        text: "css转换",
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
      switch (this.transtype) {
        case "px2rem":
          this.px2rem();
          break;
        case "rem2rpx":
          this.rem2rpx();
          break;
        case "rem2px":
          this.rem2px();
          break;
        case "rpx2rem":
          this.rpx2rem();
          break;
      }
    },
    px2rem() {
      if (!this.initcode) {
        this.$Message.warning("请输入要转换的代码");
        return;
      }
      var str = this.initcode;
      var unit = this.transUnit;
      var reg = /(\d)+(px)/gi;
      var arr = str.match(reg);
      for (let i = 0, len = arr.length; i < len; i++) {
        str = str.replace(arr[i], parseInt(arr[i]) / unit + "rem");
      }
      this.transcode = str;
    },
    rem2rpx() {
      if (!this.initcode) {
        this.$Message.warning("请输入要转换的代码");
        return;
      }
      var cssString,
        reg,
        i = 0,
        result,
        st,
        ed,
        final;
      cssString = this.initcode;

      reg = new RegExp(/(\d+\.\d+|\.\d+|\d)rem/g);

      // rem 单位的值转换为 rpx
      while ((result = reg.exec(cssString)) != null) {
        (st = result.index), (ed = reg.lastIndex);
        var matchedValue = Number(cssString.slice(st, ed - 3));
        console.log(matchedValue);
        // 16 为 html 的 font-size
        // 多了一个 "* 2" 是由于除发现页之外, 之前所有页面使用的 rem 都是基于 375 的设计稿开发的(750/2)
        var rpxValue = matchedValue * 50 * 2;
        cssString = cssString.split("");
        cssString.splice(st, ed - st, rpxValue + "rpx");
        cssString = cssString.join("");
        i++;

        this.transcode = cssString;
      }
    },
    rem2px() {
      if (!this.initcode) {
        this.$Message.warning("请输入要转换的代码");
        return;
      }
      var str = this.initcode;
      var unit = this.transUnit;
      var reg = /(\d)+(rem)/gi;
      var arr = str.match(reg);
      for (let i = 0, len = arr.length; i < len; i++) {
        str = str.replace(arr[i], parseInt(arr[i]) * unit + "px");
      }
      this.transcode = str;
    },
    rpx2rem() {
      if (!this.initcode) {
        this.$Message.warning("请输入要转换的代码");
        return;
      }
      var cssString,
        reg,
        i = 0,
        result,
        st,
        ed,
        final;
      cssString = this.initcode;

      reg = new RegExp(/(\d+\d+|\d+|\d)rpx/g);

      // rem 单位的值转换为 rpx
      while ((result = reg.exec(cssString)) != null) {
        (st = result.index), (ed = reg.lastIndex);
        var matchedValue = Number(cssString.slice(st, ed - 3));
        console.log(matchedValue);
        // 16 为 html 的 font-size
        // 多了一个 "* 2" 是由于除发现页之外, 之前所有页面使用的 rem 都是基于 375 的设计稿开发的(750/2)
        var rpxValue = matchedValue / 50 / 2;
        cssString = cssString.split("");
        cssString.splice(st, ed - st, rpxValue + "rem");
        cssString = cssString.join("");
        i++;

        this.transcode = cssString;
      }
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


