<template>
  <div class="task-panel">
    <a-input
      @change="handleInputChange"
      :value="inputValue"
      placeholder="请输入任务"
      style="width:400px;margin-right:20px"
    />
    <a-button type="primary" @click="addItemToList" >添加事项</a-button>
    <a-list item-layout="horizontal" :data-source="changeList" bordered class="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <div class="list-item">
          <a-checkbox :checked="item.done" @change="(e ) => { cbStatusChanged(e, item.id) }">{{ item.info }}</a-checkbox>
          <a slot="actions" @click="delItemToList(item.id)">删除</a>
        </div>
      </a-list-item>
      <div class="footer">
        <span>{{incompleteLenth}}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey === 'all' ?'primary' : 'default'" @click="changeBtnList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ?'primary' : 'default'" @click="changeBtnList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeBtnList('done')">已完成</a-button>
        </a-button-group>
        <a @click="cleanAllDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      checked: ''
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  components: {},
  methods: {
    handleInputChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    addItemToList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('输入内容不能为空哦~~~')
      } else {
        this.$store.commit('addItem')
      }
    },
    delItemToList (id) {
      const that = this
      this.$confirm({
        title: '小主，确定要删除吗?',
        onOk () {
          that.$store.commit('delItem', id)
        }
      })
    },
    cbStatusChanged (e, id) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    changeBtnList (key) {
      this.$store.commit('changeViewKey', key)
    },
    cleanAllDone () {
      this.$store.commit('cleanAllDone')
    }
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['incompleteLenth', 'changeList'])
  }
}
</script>
<style  scoped>
.task-panel {
  padding: 50px;
}
.list {
  margin: 20px 0;
}
.list-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.footer span,
a {
  margin: 0 40px;
}
</style>
