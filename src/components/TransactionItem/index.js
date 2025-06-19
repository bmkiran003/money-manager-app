import {Component} from 'react'
import './index.css'

class TransactionItem extends Component {
  onDelete = () => {
    const {transaction, deleteTransaction} = this.props
    deleteTransaction(transaction.id)
  }

  render() {
    const {transaction} = this.props
    const {title, amount, type} = transaction

    return (
      <li className="transaction-row">
        <p className="history-col">{title}</p>
        <p className="history-col">Rs {amount}</p>
        <p className="history-col">{type === 'INCOME' ? 'Income' : 'Expenses'}</p>
        <button
          type="button"
          className="delete-btn"
          onClick={this.onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </li>
    )
  }
}

export default TransactionItem
