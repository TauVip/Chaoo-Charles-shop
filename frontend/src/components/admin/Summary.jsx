import styled from 'styled-components'
import { FaChartBar, FaClipboard, FaUsers } from 'react-icons/fa'
import Widget from './summary-components/Widget'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setHeaders, url } from '../../slices/api'

const Summary = () => {
  const [users, setUsers] = useState([])
  const [usersPerc, setUsersPerc] = useState(0)
  const [orders, setOrders] = useState([])
  const [ordersPerc, setOrdersPerc] = useState(0)
  const [income, setIncome] = useState([])
  const [incomePerc, setIncomePerc] = useState(0)
  console.log(incomePerc)

  const compare = (a, b) => (a._id < b._id ? 1 : a._id > b._id ? -1 : 0)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${url}/users/stats`, setHeaders())
        data.sort(compare)
        setUsers(data)
        setUsersPerc(((data[0]?.total - data[1]?.total) / data[1]?.total) * 100)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${url}/orders/stats`, setHeaders())
        data.sort(compare)
        setOrders(data)
        setOrdersPerc(
          ((data[0]?.total - data[1]?.total) / data[1]?.total) * 100
        )
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${url}/orders/income/stats`,
          setHeaders()
        )
        data.sort(compare)
        setIncome(data)
        setIncomePerc(
          data
          //((data[0]?.total - data[1]?.total) / data[1]?.total) * 100
        )
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: 'Users',
      color: 'rgb(102,108,255)',
      bgColor: 'rgb(102,108,255,0.12)',
      percentage: usersPerc
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: 'Orders',
      color: 'rgb(38,198,249)',
      bgColor: 'rgb(38,198,249,0.12)',
      percentage: ordersPerc
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total,
      isMoney: true,
      title: 'Earnings',
      color: 'rgb(253,181,40)',
      bgColor: 'rgb(253,181,40,0.12)',
      percentage: incomePerc
    }
  ]

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overviews</h2>
            <p>How your shop is performing compared to the previous month.</p>
          </Title>
          <WidgetWrapper>
            {data.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
      </MainStats>
      <SideStats></SideStats>
    </StyledSummary>
  )
}
export default Summary

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`

const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`
