'use client'
import React, { useState, useEffect } from "react"
import { doc, collection, addDoc, onSnapshot, query, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";


export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  //ADD items to Database
  const addItem = async (e) => {
    e.preventDefault()
    if (newItem.name !== '' && newItem.price !== '') {
      await addDoc(collection(db, 'Items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: '', price: '' })
    }
  }

  //READ all the items from Database
  useEffect(() => {
    const q = query(collection(db, 'Items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Read total from itemsArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  //DELETE
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'Items', id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker App</h1>
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-3 border p-3 rounded-lg'
              type='text'
              placeholder='Enter Item'
            />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className='col-span-2 border p-3 rounded-lg mx-3'
              type='number'
              placeholder='Enter $'
            />
            <button
              onClick={addItem}
              className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl rounded-lg'
              type='submit'>
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id}
                className="my-4 flex bg-slate-950">
                <div className="p-4 w-full grid grid-cols-6 items-center">
                  <span className="p-4 capitalize col-span-3">{item.name}</span>
                  <span className="mx-4 p-4 cols-span-2">{item.price}</span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-4 border-1-2 border-slate-900 hover:bg-slate-900 text-xl">X</button>
                </div>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (''
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div >
      <div>
      </div>
    </main >
  )
}
