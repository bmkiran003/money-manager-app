import {Component} from 'react'
import './index.css'

class MoneyDetails extends Component {
  getIncome = transactions => {
    return transactions
      .filter(item => item.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  getExpenses = transactions => {
    return transactions
      .filter(item => item.type === 'EXPENSES')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  render() {
    const {transactions} = this.props
    const income = this.getIncome(transactions)
    const expenses = this.getExpenses(transactions)
    const balance = income - expenses

    return (
      <ul className="summary-container">
        <li className="card income">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="icon"
          />
          <div>
            <p className="card-label">Your Balance</p>
            <p className="card-amount" data-testid="balanceAmount">
              Rs {balance}
            </p>
          </div>
        </li>

        <li className="card income">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="icon"
          />
          <div>
            <p className="card-label">Your Income</p>
            <p className="card-amount" data-testid="incomeAmount">
              Rs {income}
            </p>
          </div>
        </li>

        <li className="card expenses">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="icon"
          />
          <div>
            <p className="card-label">Your Expenses</p>
            <p className="card-amount" data-testid="expensesAmount">
              Rs {expenses}
            </p>
          </div>
        </li>
      </ul>
    )
  }
}

export default MoneyDetails
