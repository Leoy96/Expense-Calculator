import React from 'react'

const ExpenseList = ({handleDelete,handleEdit,i}) => {
  return (
    <div>
        <li key={i.id}>{i.name} - Quantity: {i.quantity} - Unit Price: {i.unitPrice} NGN - Total : {i.quantity * i.unitPrice} NGN
            
            <button onClick={()=>handleEdit(i)}>edit</button>

            <button onClick={()=>handleDelete(i.id)}>delete</button>
            </li>
    </div>
  )
}

export default ExpenseList