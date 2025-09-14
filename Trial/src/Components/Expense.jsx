import React from 'react'
import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

const Expense = () => {
    const [items, setItems]= useState([])
    const [trackItems, setTrackItems] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unitPrice, setUnitPrice] = useState('')

    useEffect(()=>{
        try {
            const saved = localStorage.getItem('items')
            if(saved){
                setItems(JSON.parse(saved))
            }
        } catch {
            setItems([])
        }
    },[])

    const [editId, setEditId] = useState(null)

    const handleChange=(e)=>{
        setTrackItems(e.target.value)
    }

    const handleQuantity=(e)=>{
        setQuantity(e.target.value)
    }

    const handleUnitPrice=(e)=>{
        setUnitPrice(e.target.value)
    }

    const handleClick=(e)=>{
        e.preventDefault()
        if(!trackItems || !quantity || !unitPrice){
            alert('input field cannot be empty')
            return;
        }
        if(editId !== null){
            const updateValue = items.map(i=>i.id === editId ? {...i, name:trackItems, quantity: Number(quantity), unitPrice: Number(unitPrice)} : i)
            setItems(updateValue)
            setQuantity('')
            setTrackItems('')
            setUnitPrice('')
            setEditId(null)
        }
        else{
            const newItems = {
                name: trackItems,
                quantity: Number(quantity),
                unitPrice:Number(unitPrice),
                id:Date.now()
            }
            setItems(prev=>[...prev,newItems])
            setQuantity('')
            setTrackItems('')
            setUnitPrice('')
        }
       
    }

    const handleEdit=(edit)=>{
        setTrackItems(edit.name)
        setQuantity(edit.quantity)
        setUnitPrice(edit.unitPrice)
        setEditId(edit.id)
    }

    const handleDelete=(d)=>{
    const removeItem = items.filter(i=>i.id !== d)
    setItems(removeItem)
    }

    useEffect(()=>{
        console.log('Saving to local storage', items)
        localStorage.setItem('items',JSON.stringify(items))
    },[items]

    )


  return (
    <div>
        <h1>Expense Calculator</h1>

       <ExpenseForm
       handleChange={handleChange}handleClick={handleClick}
       handleQuantity={handleQuantity}
       handleUnitPrice={handleUnitPrice}
       trackItems={trackItems}
       quantity={quantity}
       unitPrice={unitPrice}
       editId={editId}
       />

       <ul>
       {items.map(i=>(
            <ExpenseList
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            key={i.id}
            i={i}
            />
        ))}
       </ul>
    </div>
  )
}

export default Expense
