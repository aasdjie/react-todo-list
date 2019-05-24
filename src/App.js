import React from 'react'
import { Button, Input, List, Checkbox, Typography, Tag } from 'antd'
import './App.css'

const { Text } = Typography
const { Group } = Button
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [
        {
          tid: new Date().valueOf(),
          content: ' react',
          finished: true,
          delete: false,
        },
        {
          tid: new Date().valueOf() + 1,
          content: 'ant design',
          finished: false,
          delete: true,
        },
        {
          tid: new Date().valueOf() + 2,
          content: 'node js',
          finished: false,
          delete: false,
        },
      ],
      status: ['未完成', ' 已完成'],
      newTodo: '',
      count: {
        type: 0, //统计类型 0 -完成 ，1 - 待办， 2-  删除
        todo: 0,
        finished: 0,
        deleted: 0,
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleFinishTodo = this.handleFinishTodo.bind(this)
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
  }

  /**
   *  生命周期函数
   *
   */
  componentWillMount() {}

  /**
   *  生命周期函数
   *
   */
  componentDidMount() {
    // this.handleCount()
  }

  /**
   * 获取用户输入并创建新的 todo
   * @param {Object} e 事件源
   */
  handleAddItem(e) {
    if (e.nativeEvent.keyCode === 13) {
      const content = e.target.value
      const tid = new Date().valueOf()
      const status = 0
      const newTodo = { content, tid, status }

      this.setState({ newTodo: '' })
      this.state.todoList.push(newTodo)
      console.log('newTodo, ', newTodo)
      this.handleCount()
    }
  }

  /**
   *  更新用户输入的文本
   * @param {Object} e  事件源
   */
  handleChange(e) {
    const newTodo = e.target.value
    this.setState({ newTodo })
    console.log('newTodo,', newTodo)
  }

  /**
   * 删除事项
   * @param {String} id  要删除的事项 ID
   */
  handleRemoveTodo(id) {
    const newList = this.state.todoList.map(todo => {
      if (todo.tid === id) {
        todo.delete = !todo.delete
      }
      return todo
    })
    this.setState({ todoList: newList })
    this.handleCount()
  }

  /**
   *
   * @param {String} id  要 完成的事项 ID
   */
  handleFinishTodo(id) {
    const newList = this.state.todoList.map(todo => {
      if (todo.tid === id) {
        todo.finished = !todo.finished
      }
      return todo
    })
    this.setState({ todoList: newList })
    this.handleCount()
  }

  /**
   *  统计三项数据
   */
  handleCount() {
    const { todoList, count } = this.state
    const finished = todoList.filter(todo => todo.finished)
    const todo = todoList.filter(todo => !todo.finished)
    const deleted = todoList.filter(todo => todo.delete)
    count.finished = finished.length
    count.todo = todo.length
    count.deleted = deleted.length
    this.setState({ count })
  }

  render() {
    const { todoList, newTodo, count } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <section>
            <div className="todo-form">
              <Input
                type="text"
                value={newTodo}
                placeholder="请输入新的待办事项, 并按回车确认"
                onChange={this.handleChange}
                onKeyPress={this.handleAddItem}
              />
            </div>
            <div className="todo-list">
              <List
                bordered
                footer={
                  <div>
                    <Tag
                      color="green"
                      checked={count.type == 0}
                      onChange={() => {
                        this.handleSelect(0)
                      }}
                    >
                      完成 - {count.finished}
                    </Tag>
                    <Tag
                      checked={count.type == 1}
                      color="geekblue"
                      onChange={() => {
                        this.handleSelect(0)
                      }}
                    >
                      待办 - {count.todo}
                    </Tag>
                    <Tag
                      checked={count.type == 2}
                      onChange={() => {
                        this.handleSelect(0)
                      }}
                    >
                      删除 - {count.deleted}
                    </Tag>
                  </div>
                }
                dataSource={todoList}
                renderItem={todo => (
                  <List.Item key={todo.tid}>
                    <List.Item.Meta
                      title={
                        <Checkbox
                          onChange={() => {
                            this.handleFinishTodo(todo.tid)
                          }}
                          checked={todo.finished}
                          disabled={todo.delete}
                        >
                          <Text delete={todo.finished}>{todo.content}</Text>
                        </Checkbox>
                      }
                    />
                    <div>
                      <Group>
                        <Button
                          onClick={() => {
                            this.handleRemoveTodo(todo.tid)
                          }}
                          icon={!todo.delete ? 'delete' : 'redo'}
                        />
                      </Group>
                    </div>
                  </List.Item>
                )}
              />
              {/* <ul className="todo-list">
                {todoList.map(todo => (
                  <li className="todo-item" key={todo.tid}>
                    <div className="todo-info">
                      <div className="todo-title">
                        <Checkbox
                          onChange={() => {
                            this.handleFinishTodo(todo.tid)
                          }}
                          disabled={todo.delete}
                          style={{ marginRight: 10 }}
                        />
                        {todo.content} -{todo.finished ? '完成' : ' 待办'}
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            this.handleRemoveTodo(todo.tid)
                          }}
                        >
                          {!todo.delete ? '删除' : '撤销'}
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul> */}
            </div>
          </section>
        </div>
      </div>
    )
  }
}
App.propTypes = {}
export default App
