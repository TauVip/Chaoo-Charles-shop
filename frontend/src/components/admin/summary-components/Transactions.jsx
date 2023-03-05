import axios from 'axios'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { setHeaders, url } from '../../../slices/api'

const Transactions = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        const { data } = await axios.get(
          `${url}/orders/?new=true`,
          setHeaders()
        )
        setOrders(data)
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <StyledTransactions>
      {isLoading ? (
        <p>Transactions loading...</p>
      ) : (
        <>
          <h3>Latest Transactions</h3>
          {orders?.map(order => (
            <Transaction key={order._id}>
              <p>{order.shipping.name}</p>
              <p>${(order.total / 100).toLocaleString()}</p>
              <p>{moment(order.createdAt).fromNow()}</p>
            </Transaction>
          ))}
        </>
      )}
    </StyledTransactions>
  )
}
export default Transactions

const StyledTransactions = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`

const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);

  p {
    flex: 1;
  }

  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`
