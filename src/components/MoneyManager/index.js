import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  // 🚀 Load data from localStorage when app starts
  componentDidMount() {
    const storedData = localStorage.getItem('transactionsData')
    if (storedData) {
      this.setState({transactionsList: JSON.parse(storedData)})
    }
  }

  // 💾 Save to localStorage every time transactions change
  componentDidUpdate(prevProps, prevState) {
    if (prevState.transactionsList !== this.state.transactionsList) {
      localStorage.setItem(
        'transactionsData',
        JSON.stringify(this.state.transactionsList),
      )
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const parsedAmount = parseInt(amount)

    // ✅ Validation
    if (title.trim() === '' || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid title and a positive numeric amount.')
      return
    }

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parsedAmount,
      type,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedList = transactionsList.filter(each => each.id !== id)
    this.setState({transactionsList: updatedList})
  }

  render() {
    const {title, amount, type, transactionsList} = this.state

    return (
      <div className="app-container">
        <div className="header">
          <h1 className="heading">Hi, ManiKiran</h1>
          <p className="desc">
            Welcome back to your <span className="highlight">Money Manager</span>
          </p>
        </div>

        <MoneyDetails transactions={transactionsList} />

        <div className="bottom-section">
          <form className="form-container" onSubmit={this.onAddTransaction}>
            <h1 className="form-heading">Add Transaction</h1>

            <label className="label" htmlFor="title">
              TITLE
            </label>
            <input
              id="title"
              className="input"
              placeholder="TITLE"
              value={title}
              onChange={this.onChangeTitle}
            />

            <label className="label" htmlFor="amount">
              AMOUNT
            </label>
            <input
              id="amount"
              type="number"
              className="input"
              placeholder="AMOUNT"
              value={amount}
              onChange={this.onChangeAmount}
            />

            <label className="label" htmlFor="type">
              TYPE
            </label>
            <select
              id="type"
              className="input"
              value={type}
              onChange={this.onChangeType}
            >
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <div className="history-container">
            <h1 className="form-heading">History</h1>
            <ul className="history-list">
              <li className="history-header">
                <p className="history-col">Title</p>
                <p className="history-col">Amount</p>
                <p className="history-col">Type</p>
              </li>

              {transactionsList.map(each => (
                <TransactionItem
                  key={each.id}
                  transaction={each}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
