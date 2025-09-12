import React from 'react'

const ExpenseForm = ({handleChange,handleClick,handleQuantity,handleUnitPrice,quantity,trackItems,unitPrice,editId}) => {
  return (
    <div>
         <form>
            <input type="text" placeholder='enter items' onChange={handleChange} value={trackItems} />

            <input type="number" placeholder='enter quantity' onChange={handleQuantity} value={quantity} />

            <input type="number" placeholder='enter unit price' onChange={handleUnitPrice} value={unitPrice} />

            <button onClick={handleClick}>{editId ? "update item" : "Add items"}</button>
        </form>
    </div>
  )
}

export default ExpenseForm