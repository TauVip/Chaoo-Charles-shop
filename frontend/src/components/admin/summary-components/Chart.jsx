import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import styled from 'styled-components'
import { setHeaders, url } from '../../../slices/api'

const Chart = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)

  const compare = (a, b) => (a._id < b._id ? 1 : a._id > b._id ? -1 : 0)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      try {
        const { data } = await axios.get(
          `${url}/orders/week-sales`,
          setHeaders()
        )
        data.sort(compare)

        const newData = data.map(item => {
          const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

          return {
            day: DAYS[item._id - 1],
            amount: item.total / 100
          }
        })
        setSales(newData)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <Loader>Loader Chart...</Loader>
      ) : (
        <StyledChart>
          <h3>Last 7 Days Earnings(US $)</h3>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='day' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='amount'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </StyledChart>
      )}
    </>
  )
}
export default Chart

const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  padding: 1rem;
  border: 2px solid rgba(48, 51, 78, 0.2);
  border-radius: 5px;
  h3 {
    margin-bottom: 1rem;
  }
`

const Loader = styled.p`
  margin-top: 2rem;
`
