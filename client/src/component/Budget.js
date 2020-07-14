import React, {useState , useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, } from 'reactstrap';

const Budget = props => {






    const userDelete = (budget) =>{
    
        axios.delete(`http://localhost:5050/api/account/${budget.id}`)
        .then(res => {
            userDelete(budget)
            
            props.updateBudget()
            // setUser(props)
        //    push('/app')
        //     history.go()
            
            
        })
        .catch(error =>{
            console.log(error)
          })
        }
        
        
            return (
                <div>
        
                    {props.budget.map(budget =>{
        
                        return(
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardHeader>{budget.name}</CardHeader>
                                <CardTitle>Nickname: {budget.budget}</CardTitle>
                                
                                <Button onClick={e => {
                            e.preventDefault();
                            userDelete(budget)
                          }
                        }
                        >delete</Button>
                            </Card>
                        )
                    })}
                    
                </div>
            )
        }
export default Budget
