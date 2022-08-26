<template>
  <div class="main-container">
    <div class="content">
      <div class="beverage-container">
        <div v-if="beverageData" class="beverage-info">
          <img :src="beverageData.img" />
          <span class="title">{{ beverageData.name.toUpperCase() }}</span>
          <div class="divider" />
          <div class="beverage-detail">
            <div class="beverage-detail-row">
              <span class="text18 bold">Type</span>
              <div class="beverage-detail-right">
                <span class="text18">{{
                  (beverageData.Type || {}).name || "-"
                }}</span>
                <div class="beverage-detail-price">
                  <span class="text18 red">{{
                    (beverageData.Type || {}).price || "0"
                  }}</span>
                  <span class="text18">฿</span>
                </div>
              </div>
            </div>
            <div v-if="beverageData.isShowTemp" class="beverage-detail-row">
              <span class="text18 bold">Temp</span>
              <div class="beverage-detail-right">
                <span class="text18">{{
                  (beverageData.Temp || {}).name || "-"
                }}</span>
                <div class="beverage-detail-price">
                  <span class="text18 red">{{
                    (beverageData.Temp || {}).price || "0"
                  }}</span>
                  <span class="text18">฿</span>
                </div>
              </div>
            </div>
            <div
              v-if="beverageData.isShowSweetness"
              class="beverage-detail-row"
            >
              <span class="text18 bold">Sweetness</span>
              <div class="beverage-detail-right">
                <span class="text18">{{
                  (beverageData.Sweetness || {}).name || "-"
                }}</span>
              </div>
            </div>
            <div class="beverage-detail-row">
              <span class="text18 bold">Option(s)</span>
              <div class="beverage-detail-right">
                <span class="text18">{{
                  beverageData.optionalList.map((e) => e.name).join(", ") || "-"
                }}</span>
              </div>
            </div>
            <div class="divider" />
            <div class="beverage-detail-row">
              <span class="text18 bold">Total</span>
              <div class="beverage-detail-price">
                <span class="text18 red">{{ getTotalPrice() }}</span>
                <span class="text18">฿</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="beverage-info">
          <img src="~/assets/images/ic-hand-click-red.svg" />
          <span class="title">SELECT</span>
          <span class="description">Your beverage</span>
          <img src="~/assets/images/ic-arrow-chevron-right.svg" />
        </div>
      </div>
      <div
        v-if="stepCurrent === stepList[0]"
        class="beverage-category-container"
      >
        <span class="beverage-category">Beverage category</span>
        <div class="beverage-type-section">
          <button
            v-for="(e, i) in beverageList"
            :key="i"
            :class="[
              'beverage-type-button',
              { active: (beverageData || {}).name === e.name },
            ]"
            @click="onClickType(e)"
          >
            <img class="img" :src="e.img" />
            <span class="text">{{ e.name }}</span>
          </button>
        </div>
        <div v-if="beverageData" class="beverage-attr-section">
          <div
            class="beverage-attr-row"
            v-for="(e, i) in beverageAttrDataList"
            :key="i"
          >
            <span class="text">{{ e.name }}</span>
            <div class="beverage-type-button-group">
              <button
                :class="[
                  'beverage-type-button',
                  {
                    active:
                      ea.type === 'Optional'
                        ? ((beverageData || {}).optionalList || [])
                            .map((e) => e.value)
                            .indexOf(ea.value) >= 0
                        : (beverageData[ea.type] || {}).name === ea.name,
                  },
                ]"
                v-for="(ea, ia) in e.dataList"
                :key="ia"
                @click="onClickAttr(ea)"
              >
                <img v-if="ea.img" class="img" :src="ea.img" />
                <span class="text">{{ ea.name }}</span>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="beverage-no-data-section">
          <img src="~/assets/images/ic-information-white.svg" />
          <span class="beverage-no-data-text"
            >Please select beverage category</span
          >
        </div>
        <div v-if="beverageData" class="beverage-footer-section">
          <button class="button-cancel" @click="onClickCancelOrder()">
            Cancel order
          </button>
          <button
            :disabled="getIsDisabledConfirmOrder()"
            :class="[
              'button-confirm',
              { disabled: getIsDisabledConfirmOrder() },
            ]"
            @click="onClickConfirmOrder()"
          >
            Confirm order
          </button>
        </div>
      </div>
      <div
        v-if="stepCurrent === stepList[1]"
        class="beverage-category-container"
      >
        <div class="beverage-input-money">
          <span class="text24 white">Enter your money (฿)</span>
          <input />
        </div>
        <div class="beverage-footer-section">
          <button class="button-cancel" @click="onClickCancelOrder()">
            Cancel order
          </button>
          <button
            :disabled="getIsDisabledConfirmOrder()"
            :class="[
              'button-confirm',
              { disabled: getIsDisabledConfirmOrder() },
            ]"
            @click="onClickConfirmOrder()"
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "IndexPage",

  data() {
    return {
      beverageList: [
        {
          value: 1,
          name: "Coffee",
          img: require("~/assets/images/ic-coffee-white.svg"),
          isShowTemp: true,
          isShowSweetness: true,
          attributes: [
            {
              value: 1,
              name: "Espresso",
              type: "Type",
              price: 25,
            },
            {
              value: 2,
              name: "Americano",
              type: "Type",
              price: 30,
            },
            {
              value: 3,
              name: "Latte",
              type: "Type",
              price: 35,
            },
            {
              value: 4,
              name: "Hot",
              type: "Temp",
              img: require("~/assets/images/ic-hot-white.svg"),
            },
            {
              value: 5,
              name: "Cold",
              type: "Temp",
              img: require("~/assets/images/ic-cold-white.svg"),
              price: 5,
            },
            {
              value: 6,
              name: "Less sugar",
              type: "Sweetness",
            },
            {
              value: 7,
              name: "Default",
              type: "Sweetness",
            },
            {
              value: 8,
              name: "More sugar",
              type: "Sweetness",
            },
            {
              value: 9,
              name: "Straw",
              type: "Optional",
              img: require("~/assets/images/ic-straw-white.svg"),
            },
            {
              value: 10,
              name: "Cover",
              type: "Optional",
              img: require("~/assets/images/ic-cup-cover-white.svg"),
            },
          ],
        },
        {
          value: 2,
          name: "Tea",
          img: require("~/assets/images/ic-tea-white.svg"),
          isShowTemp: true,
          isShowSweetness: true,
          attributes: [
            {
              value: 1,
              name: "Taiwan",
              type: "Type",
              price: 35,
            },
            {
              value: 2,
              name: "Thai",
              type: "Type",
              price: 25,
            },
            {
              value: 3,
              name: "Hot",
              type: "Temp",
              img: require("~/assets/images/ic-hot-white.svg"),
            },
            {
              value: 4,
              name: "Cold",
              type: "Temp",
              img: require("~/assets/images/ic-cold-white.svg"),
              price: 5,
            },
            {
              value: 5,
              name: "Less sugar",
              type: "Sweetness",
            },
            {
              value: 6,
              name: "Default",
              type: "Sweetness",
            },
            {
              value: 7,
              name: "More sugar",
              type: "Sweetness",
            },
            {
              value: 8,
              name: "Straw",
              type: "Optional",
              img: require("~/assets/images/ic-straw-white.svg"),
            },
            {
              value: 9,
              name: "Cover",
              type: "Optional",
              img: require("~/assets/images/ic-cup-cover-white.svg"),
            },
          ],
        },
        {
          value: 3,
          name: "Soft drink",
          img: require("~/assets/images/ic-sofe-drink-white.svg"),
          attributes: [
            {
              value: 1,
              name: "Soda",
              type: "Type",
              price: 15,
            },
            {
              value: 2,
              name: "Cola",
              type: "Type",
              price: 15,
            },
            {
              value: 3,
              name: "Energy drink",
              type: "Type",
              price: 20,
            },
            {
              value: 4,
              name: "Straw",
              type: "Optional",
              img: require("~/assets/images/ic-straw-white.svg"),
            },
            {
              value: 5,
              name: "Cover",
              type: "Optional",
              img: require("~/assets/images/ic-cup-cover-white.svg"),
            },
          ],
        },
      ],
      beverageData: undefined,
      beverageAttrDataList: [],

      stepCurrent: "order",
      stepList: ["order", "payment", "waiting cooking", "order success"],
    };
  },

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start();
      await this.getData();
      // console.log("xxx", this.dataList);
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    async getData() {
      const res = await this.$api.get("/user/list");
      const resData = res.data;
      // this.dataList = resData.data;
    },
    onClickType(data) {
      const beverageData = {};
      beverageData.name = data.name;
      beverageData.isShowTemp = data.isShowTemp;
      beverageData.isShowSweetness = data.isShowSweetness;
      beverageData.optionalList = [];

      switch (data.name) {
        case "Coffee":
          beverageData.img = require("~/assets/images/ic-coffee-red.svg");
          break;
        case "Tea":
          beverageData.img = require("~/assets/images/ic-tea-red.svg");
          break;
        case "Soft drink":
          beverageData.img = require("~/assets/images/ic-sofe-drink-red.svg");
          break;
      }
      this.beverageData = beverageData;

      const groupAttr = {};
      data.attributes.forEach((e) => {
        if (groupAttr[e.type]) {
          groupAttr[e.type].push(e);
        } else {
          groupAttr[e.type] = [e];
        }
      });
      this.beverageAttrDataList = Object.keys(groupAttr).map((key) => {
        return {
          name: key,
          dataList: groupAttr[key],
        };
      });
    },
    onClickAttr(item) {
      this.beverageData[item.type] = item;
      if (item.type === "Optional") {
        const optionalIdList = this.beverageData.optionalList.map(
          (e) => e.value
        );
        const optionalIdSelectIndex = optionalIdList.indexOf(item.value);
        if (optionalIdSelectIndex >= 0) {
          this.beverageData.optionalList.splice(optionalIdSelectIndex, 1);
        } else {
          this.beverageData.optionalList.push(item);
        }
        this.beverageData.optionalList = _.orderBy(
          this.beverageData.optionalList,
          "value"
        );
      }
      this.beverageData = _.cloneDeep(this.beverageData);
    },
    getTotalPrice() {
      let total = 0;
      if (this.beverageData && this.beverageData.Type) {
        total += this.beverageData.Type.price || 0;
      }
      if (this.beverageData && this.beverageData.Temp) {
        total += this.beverageData.Temp.price || 0;
      }
      return total;
    },
    getIsDisabledConfirmOrder() {
      let isDisable = true;
      if (this.beverageData) {
        if (this.beverageData.name === "Soft drink") {
          if (this.beverageData.Type) {
            isDisable = false;
          }
        } else {
          if (
            this.beverageData.Type &&
            this.beverageData.Temp &&
            this.beverageData.Sweetness
          ) {
            isDisable = false;
          }
        }
      }
      return isDisable;
    },
    onClickCancelOrder() {
      this.stepCurrent = this.stepList[0];
      this.beverageData = undefined;
    },
    onClickConfirmOrder() {
      console.log("this.beverageData", this.beverageData);
      this.stepCurrent = this.stepList[1];
    },
  },
};
</script>

<style lang="scss">
.main-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  justify-content: center;
  // align-items: center;
  padding: 32px;
  background-color: #111111;
  border-radius: 8px;
  width: 1024px;
  // height: 484px;
}

.beverage-container {
  width: 320px;
  background-color: #ffffff;
  border-radius: 8px;
  outline: 8px solid #b42816;
  outline-offset: -8px;
  .beverage-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 420px;
    padding: 24px;
    .beverage-detail {
      width: 100%;
      .beverage-detail-row {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        .beverage-detail-right {
          display: flex;
          .beverage-detail-price {
            width: 55px;
            text-align: right;
          }
        }
      }
    }
  }
}

.divider {
  border: 2px solid #b42816;
  margin-top: 16px;
  width: 100%;
}

.title {
  margin-top: 24px;
  font-family: "IBM Plex Sans Thai";
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
}

.description {
  margin-top: 8px;
  font-family: "IBM Plex Sans Thai";
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 24px;
}

.beverage-category-container {
  margin-left: 32px;
  width: 608px;
  // height: 100%;
  background-color: #222222;
  border-radius: 8px;
  padding: 32px;
}

.beverage-category {
  font-family: "IBM Plex Sans Thai";
  font-weight: 700;
  font-size: 24px;
  line-height: 33.6px;
  color: #ffffff;
}

.beverage-type-section {
  display: flex;
  margin-top: 16px;
}

.beverage-type-button {
  width: 165.33px;
  height: 42px;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    margin-right: 16px;
  }
  .text {
    font-family: "IBM Plex Sans Thai";
    font-weight: 400;
    font-size: 18px;
    line-height: 33.6px;
    color: #ffffff;
  }
}

.beverage-type-button.active {
  background-color: #b42816;
}

.beverage-type-button:not(:first-child) {
  margin-left: 32px;
}

.beverage-no-data-section {
  border-radius: 6px;
  border: 1px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 16px;
  width: 544px;
  min-height: 248px;
}

.beverage-attr-section {
  border-radius: 6px;
  border: 1px solid #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  width: 544px;
  min-height: 248px;
  .beverage-attr-row {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text {
      font-family: "IBM Plex Sans Thai";
      font-weight: 400;
      font-size: 18px;
      color: #ffffff;
    }
    .beverage-type-button-group {
      display: flex;
      width: 392px;
      .beverage-type-button {
        width: 120px;
      }
      .beverage-type-button:not(:first-child) {
        margin-left: 16px;
      }
    }
  }
  .beverage-attr-row:not(:first-child) {
    margin-top: 16px;
  }
}

.beverage-no-data-text {
  margin-top: 8px;
  font-family: "IBM Plex Sans Thai";
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  color: #ffffff;
}

.beverage-footer-section {
  margin-top: 16px;
  display: flex;
  height: 42px;
  .button-cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #f5aca3;
    border: 2px solid #f5aca3;
    border-radius: 6px;
    color: #111111;
    font-family: "IBM Plex Sans Thai";
    font-weight: 700;
    font-size: 18px;
  }
  .button-confirm {
    margin-left: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #0fd678;
    border: 2px solid #0fd678;
    border-radius: 6px;
    color: #111111;
    font-family: "IBM Plex Sans Thai";
    font-weight: 700;
    font-size: 18px;
    &.disabled {
      background: #dddddd;
      color: #bbbbbb;
      border: 2px solid #bbbbbb;
    }
  }
}

.beverage-input-money {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.text18 {
  font-family: "IBM Plex Sans Thai";
  font-weight: 400;
  font-size: 18px;
  &.bold {
    font-weight: 700;
  }
  &.red {
    color: #b42816;
  }
}

.text24 {
  font-family: "IBM Plex Sans Thai";
  font-weight: 400;
  font-size: 24px;
  &.bold {
    font-weight: 700;
  }
  &.red {
    color: #b42816;
  }
  &.white {
    color: #ffffff;
  }
}
</style>
