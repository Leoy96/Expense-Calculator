import React, { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

const Expense = () => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('items');
        return saved ? JSON.parse(saved) : [];
    });
    const [trackItems, setTrackItems] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => setTrackItems(e.target.value);
    const handleQuantity = (e) => setQuantity(e.target.value);
    const handleUnitPrice = (e) => setUnitPrice(e.target.value);

    const handleClick = (e) => {
        e.preventDefault();
        if(!trackItems || !quantity || !unitPrice){
            alert('input field cannot be empty');
            return;
        }

        if(editId){
            const updateValue = items.map(i =>
                i.id === editId ? {
                    ...i,
                    name: trackItems,
                    quantity: Number(quantity),
                    unitPrice: Number(unitPrice)
                } : i
            );
            setItems(updateValue);
            setEditId(null);
        } else {
            const newItems = {
                name: trackItems,
                quantity: Number(quantity),
                unitPrice: Number(unitPrice),
                id: Date.now()
            };
            setItems(prev => [...prev, newItems]);
        }

        setQuantity('');
        setTrackItems('');
        setUnitPrice('');
    }

    const handleEdit = (edit) => {
        setTrackItems(edit.name);
        setQuantity(edit.quantity);
        setUnitPrice(edit.unitPrice);
        setEditId(edit.id);
    }

    const handleDelete = (d) => {
        setItems(items.filter(i => i.id !== d));
    }

    useEffect(() => {
        console.log('Saving to local storage', items);
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]); //this is main problem and i fixed it, the main issue was that u were having 2 use effects and when react reloads it already run the second use effect that saves the array into the localStorage before the first use efct even get chance to read the saved data, is just as if the second use effect is overriding the first one so i remove the second one and keep this only...,

    return (
        <div>
            <h1>Expense Calculator</h1>

            <ExpenseForm
                handleChange={handleChange}
                handleClick={handleClick}
                handleQuantity={handleQuantity}
                handleUnitPrice={handleUnitPrice}
                trackItems={trackItems}
                quantity={quantity}
                unitPrice={unitPrice}
                editId={editId}
            />

            <ul>
                {items.map(i => (
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
