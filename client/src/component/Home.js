import React, {useState , useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Budget from './Budget'

const Home = props => {
    const [budget, setBudget] = useState([])
    const getBudget = () =>{       
        axios.get('http://localhost:5050/api/account')
        .then(res=>{
            
            setBudget(res.data.data)
            
        })
   } 

    
        useEffect(()=>{
       getBudget()
        },[])
    
    return (
        <div>
            <Budget key ={budget.id} budget={budget} updateBudget ={getBudget} />
            
        </div>
    )
}

export default Home
